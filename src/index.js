const database = require('./components/database.js')

const fs = require('fs').promises;
const express = require('express');
const app = express();
const port = 1770;

app.use(express.json());

/**
 * SALARY
 */
app.get('/salary', async (request, response) => {
    //console.log(request.originalUrl)

    response.send({
        hehe: "hehe"
    })
});

/**
 * 
*/

app.listen(port, ()=> {
    console.log(`[#] Application Running On: ${ port }`)
})