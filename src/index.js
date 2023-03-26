const database = require('./components/database.js')
const salary = require('./components/salary.js')

const fs = require('fs').promises;
const express = require('express');
const app = express();
const port = 1770;

app.use(express.json());

/**
 * Salary GET
 */
app.get('/api/salary/:id/get', async (request, response) => {
    var result = await salary.getData(request.params.id);
    response.send(result)
});

app.get('/api/salary/:job/job/get', async (request, response) => {
    var result = await salary.getDataJob(request.params.job);
    response.send(result)
});
// app.get('/api/salary/')
/* END Salary GET */

/**
 * Salary Manipulate
 */
app.post('/api/salary/insert', async (request, response) => {
    var result = await salary.insertData(request.body);
    response.send(result)
});

app.post('/api/salary/:id/update', async (request, response) => {
    var result = await salary.updateData({
        id: request.params.id,
        body: request.body
    });

    response.send(result)
});

app.get('/api/salary/:id/delete', async (request, response) => {
    var result = await salary.deleteData(request.params.id);
    response.send(result);
});

app.post('/api/salary/job/update-details', async (request, response) => {
    var result = await salary.updateJobDetail(request.body);    
    response.send(result);
});

app.post('/api/salary/job/delete-details', async (request, response) => {
    var result = await salary.deleteJobDetail(request.body);    
    response.send(result);
});
/* END Salary Manipulate */

app.listen(port, ()=> {
    console.log(`[#] Application Running On: ${ port }`)
})