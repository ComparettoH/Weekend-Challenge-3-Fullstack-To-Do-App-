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

// First create GET request to confirm connectivity
app.get('/to-do-list', (req, res) => {
    let queryText = `SELECT * FROM "toDoTable";`;

    pool.query(queryText).then((result) => {
        console.log(result.rows);
        res.send(result.rows)
    }).catch((error) => {
        console.log(`Error on GET query ${queryText}`, error);
        res.sendStatus(500);
    })
})
// 
// 
// 
// 
// 
// 
// 
// 
// 
//----------Server Code Set Up--------------
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});