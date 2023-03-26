require('dotenv').config();
const database = require('./database.js');
const tools = require('./tools.js');


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

const getDataJob = (params) => new Promise (async (resolve, reject) => {
    console.log(params)
    try {
        switch (params) {
            case "all":
                var job = await tools.apiReader(process.env.JOBCLASS_HOST + "/service-master/api/job-class");
                var result = await database.query("SELECT salary_id, jobclass_id, value FROM salary a, salary_details b where a.id = b.salary_id");
                
                job = job.data.data;
                result = result.data;

                var data = [];
                for (let i = 0; i < result.length; i++) {
                    let idx = job.findIndex((jobClass) => jobClass.id == result[i].jobclass_id);
                    if (idx > -1) {
                        data.push({
                            jobclass: job[idx].code,
                            description: job[idx].description,
                            salary: result[i].value
                        });
                    } 
                }

                resolve({
                    status: "success",
                    message: "",
                    data: data
                })

                break;
            default:
                if (isNaN(params) == false) {
                    throw "Invalid Parameters";
                }

                var job = await tools.apiReader(process.env.JOBCLASS_HOST + "/service-master/api/job-class");
                var result = await database.query("SELECT salary_id, jobclass_id, value FROM salary a, salary_details b where a.id = b.salary_id");

                job = job.data.data;
                result = result.data;

                var data = [];
                var jobIdx = job.findIndex((jobClass) => jobClass.code == params.toUpperCase());
                var salaryIdx = result.findIndex((salaryDetail) => salaryDetail.jobclass_id == job[jobIdx].id);
                
                if (salaryIdx > -1 && jobIdx > -1) {
                    data.push({
                        jobclass: job[jobIdx].code,
                        description: job[jobIdx].description,
                        salary: result[salaryIdx].value
                    })
                }

                resolve({
                    status: "success",
                    message: "",
                    data: data
                })
        }
    } catch (err) {
        resolve({
            status: "error",
            message: err,
            data: []
        })
    }
});

/**
 * Data Manipulate
*/
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

const updateJobDetail = (data) => new Promise (async (resolve, reject) => {
    console.log(data)
    try {
        if (isNaN(data.salary_id) == true || isNaN(data.jobclass_id) == true) {
            throw "Invalid Parameters"
        }

        var currentDate = new Date();
        currentDate = currentDate.getFullYear() + "-" + String(currentDate.getMonth()+1).padStart(2, '0') + "-" + String(currentDate.getDate()).padStart(2, '0');

        var checkData = await database.query("SELECT id FROM salary_details WHERE jobclass_id = "+ parseInt(data.jobclass_id) +"");
        if (checkData.data.length > 0) {
            var results = await database.manipulate("UPDATE salary_details SET salary_id = "+ parseInt(data.salary_id) +", created_at = TO_DATE('"+ currentDate +"', 'YYYY-MM-DD') WHERE jobclass_id = "+ parseInt(data.jobclass_id) +"");
            resolve(results)
        } else {
            var results = await database.manipulate("INSERT INTO salary_details (salary_id, jobclass_id, created_at) VALUES ("+ parseInt(data.salary_id) +", "+ parseInt(data.jobclass_id) +", TO_DATE('"+ currentDate +"', 'YYYY-MM-DD'))");
            resolve(results)
        }
    } catch (err) {
        resolve({
            status: "error",
            message: err
        })
    }
});

const deleteJobDetail = (data) => new Promise (async (resolve, reject) => {
    try {
        if (isNaN(data.salary_id) == true || isNaN(data.jobclass_id) == true) {
            throw "Invalid Parameters"
        }

        var result = await database.manipulate("DELETE FROM salary_details WHERE salary_id = "+ parseInt(data.salary_id) +" AND jobclass_id = "+ parseInt(data.jobclass_id) +"");
        resolve(result)
    } catch (err) {
        resolve({
            status: "error",
            message: err
        })
    }
});

module.exports = {
    getData,
    getDataJob,
    insertData,
    updateData,
    deleteData,
    updateJobDetail,
    deleteJobDetail
}