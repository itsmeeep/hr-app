const database = require('./database.js');

/**
 * Main Function
 * @returns 
 */
const getData = (data) => new Promise (async (resolve, reject) => {
    try {
        switch (data) {
            case "all":
                var results = await database.query("SELECT * FROM salary ORDER BY id");
                resolve({
                    status: "success",
                    message: "",
                    data: results.data
                }); 

                break;
            default:
                if (isNaN(data) == true) {
                    throw "Invalid Parameters"
                }

                var id = parseInt(data)
                var results = await database.query("SELECT * FROM salary WHERE id = "+ id +"");
                resolve({
                    status: "success",
                    message: "",
                    data: results.data
                });
        }
    } catch (err) {
        resolve({
            status: "error",
            message: err,
            data: []
        });
    }
});

const insertData = (data) => new Promise (async (resolve, reject) => {
    try {
        if (isNaN(data.salary) == true) {
            throw "Invalid Parameters"
        }

        var value = parseInt(data.salary);
        var description = data.description;

        var results = await database.manipulate("INSERT INTO salary (value, description) VALUES ("+ value +", '"+ description +"')")
        resolve(results);
    } catch (err) {
        resolve({
            status: "error",
            message: err
        })
    }
});

const updateData = (data) => new Promise (async (resolve, reject) => {
    try {
        if (isNaN(data.id) == true || isNaN(data.body.id) == true || isNaN(data.body.salary) == true) {
            throw "Invalid Parameters";
        } else if (parseInt(data.id) != parseInt(data.body.id)) {
            throw "Invalid Parameters";
        }

        var id = parseInt(data.body.id);
        var value = parseInt(data.body.salary);
        var description = data.body.description;

        var currentDate = new Date();
        currentDate = currentDate.getFullYear() + "-" + String(currentDate.getMonth()+1).padStart(2, '0') + "-" + String(currentDate.getDate()).padStart(2, '0');

        var results = await database.manipulate("UPDATE salary SET value = "+ value +", description = '"+ description +"', updated_at = TO_DATE('"+ currentDate +"', 'YYYY-MM-DD') WHERE id = "+ id +"");
        resolve(results)
    } catch (err) {
        resolve({
            status: 'error',
            message: err
        })
    }
});

const deleteData = (data) => new Promise (async (resolve, reject) => {
    try {
        if (isNaN(data) == true) {
            throw "Invalid Parameters";
        }

        var id = parseInt(data);
        var currentDate = new Date();
        currentDate = currentDate.getFullYear() + "-" + String(currentDate.getMonth()+1).padStart(2, '0') + "-" + String(currentDate.getDate()).padStart(2, '0');

        var results = await database.manipulate("UPDATE salary SET deleted_at = TO_DATE('"+ currentDate +"', 'YYYY-MM-DD'), updated_at = TO_DATE('"+ currentDate +"', 'YYYY-MM-DD') WHERE id = "+ id +"");
        resolve(results)
    } catch (err) {
        resolve({
            status: "error",
            message: err
        })
    }
});

module.exports = {
    getData,
    insertData,
    updateData,
    deleteData
}