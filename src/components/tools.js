const database = require('./database.js');
const fetch = require('node-fetch');

const apiReader = (url) => new Promise (async (resolve, reject) => {
    try {
        var result = await fetch(url);
        result = result.json();

        resolve({
            status: "success",
            message: "",
            data: result
        })
    } catch (err) {
        resolve({
            status: "error",
            message: err,
            data: null
        })
    }
});

module.exports = {
    apiReader
}

// (async() => {
//     var hehe = await apiReader("http://103.183.75.43:8090/service-master/api/employee/1");
//     console.log(hehe)
// })();