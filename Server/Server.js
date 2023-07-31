// Require express
const express = require('express');
// Require body parser
const bodyParser = require('body-parser');
// Require pg
const pg = require('pg'); 
// <-- add once database is running
// 
// 
const app = express();
const PORT = 5000;
const pool = new pg.Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
}); 
// <---- add once database is running

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
//------------------------------------------
// Section for Ajax logic/paths

// GET request
app.get('/to-do-list', (req, res) => {
    let queryText = 
    `SELECT * FROM "toDoTable" 
    ORDER BY "complete" ASC;`;

    pool.query(queryText)
    .then((result) => {
        // console.log(result.rows);
        res.send(result.rows)
    }).catch((error) => {
        console.log(`Error on GET query ${queryText}`, error);
        res.sendStatus(500);
    })
})

//GET request for single task id 
app.get('to-do-list/onetask/:id', (req, res) => {
    const idToGet = [req.params.id]
    const queryText = `
    SELECT * FROM "toDoTable" WHERE "id" = $1;`

    pool.query(queryText, idToGet).then((result) => {
        console.log("Yay, retrieved task!")
        res.send(result.rows)
    }).catch((error) => {
        alert("Failed to retrieve onesong: id =", idToGet[0])
        console.log("error at /onesong/:id", error)
        res.sendStatus(500)
    })
})

// POST request
app.post('/to-do-list', (req, res) => {
    console.log("req.body:", req.body)
    const task = req.body.task
    const complete = req.body.complete

    const queryParams = [task, complete]
    const queryText = `INSERT INTO "toDoTable"("task", "complete") VALUES ($1, $2);`
    pool.query(queryText, queryParams).then(function (result) {
        console.log("Pool query worked!")
        res.sendStatus(201)
    }).catch((error) => {
        console.log("Error on POST 'to-do-list'", error)
        res.sendStatus(500)
    })
})


//DELETE request
app.delete('/deletetask/:id', (req, res) => {
    let taskToDeleteID = req.params.id
    let queryText = 'DELETE FROM "toDoTable" WHERE "id" = $1;'

    pool.query(queryText, [taskToDeleteID]).then((result) => {
        console.log("task Deleted, id:", taskToDeleteID)
        res.sendStatus(200)
    }).catch((error) => {
        console.log('Error making database query:', queryText)
        console.log('Error Message:', error)
        res.sendStatus(500)
    })
})


// PUT request
app.put('/completetask/:id', (req, res) => {
    let taskId = req.params.id
    let completeStatus = 'true';
    let queryParams = [completeStatus, taskId]

    let queryText = `UPDATE "toDoTable" SET "complete" = $1 WHERE "id" = $2;`
    console.log(`Success connecting to /updatetask. taskId = ${taskId}, completeStatus = ${completeStatus}`)

    pool.query(queryText, queryParams)
    .then((response) => {
        res.sendStatus(200)
    }).catch((error) => {
        console.log(error)
        res.sendStatus(500)
    })
})


//----------Server Code Set Up--------------
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});