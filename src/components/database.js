require('dotenv').config();
const { Pool } = require('pg');

const query = (data) => new Promise (async (resolve, reject) => {
    var pool = new Pool ({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: process.env.PG_DATABASE,
        user: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD
    });

    try {
        var result = await pool.query(data);
        resolve({
            status: "success",
            message: "",
            data: result.rows
        })
    } catch (err) {
        resolve({
            status: "error",
            message: err,
            data: []
        })
    }
})

const manipulate = (data) => new Promise (async (resolve, reject) => {
    var pool = new Pool ({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: process.env.PG_DATABASE,
        user: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD
    });

    try {
        var result = await pool.query(data);
        resolve({
            status: "success",
            message: ""
        })
    } catch (err) {
        resolve({
            status: "error",
            message: err
        })
    } 
});

module.exports = {
    manipulate,
    query
}