const express = require('express');
const router = express.Router();
const mysql = require('mysql');



//connect database
const con = mysql.createConnection({
    user: "root",
    password: "root",
    port: "3306",
    host: "localhost",
    database: 'testdb'
}, (err, result) => {
    if (err)
        throw err;
    else
        console.log(result);
})


router.get('/', (req, res) => {

    res.json({ msg: 'api testing   ok' })
})



// api for add candidates
router.post('/addCandidate', (req, res) => {

    let name = req.body.name;
    let email = req.body.email;
    let address = req.body.address;

    let sql = "insert into candidates(name,email,address)values(?,?,?)";
    let values = [name, email, address];
    sql = mysql.format(sql, values)
    con.query(sql, (err, result) => {
        console.log(result);
        if (err)
            throw err
        else
            res.json({ msg: "candidate added.." })


    })


})


// api for add test details and marks for student
router.post('/addTestDetails', (req, res) => {

    let email = req.body.email;
    let fround = req.body.fround;
    let sround = req.body.sround;
    let tround = req.body.tround;

    let sql = "insert into test(first_round,second_round,third_round,email)values(?,?,?,?)";
    let values = [fround, sround, tround, email];
    sql = mysql.format(sql, values)
    con.query(sql, (err, result) => {
        console.log(result);
        if (err)
            throw err
        else
            res.json({ msg: "candidate test details added.." })


    })


})


///average of test marks of all candidates  of all rounds


router.get('/AVGofallroundsMarks', (req, res) => {


    let sql = "select AVG(first_round),AVG(second_round),AVG(third_round) from test ";
    con.query(sql, (err, result) => {
        console.log(result);
        if (err)
            throw err
        else
            res.json({ msg: "Average of marks of test of all candidates of all rounds", Averages: result })


    })


})



//highest scoring candidates of sum of all tree round test sum

router.get('/highestScoringCandidates', (req, res) => {


    let sql = "select name as Highest_scoring_candidates,MAX(first_round+second_round+third_round)as sumOF_three_Round_testmarks   from candidates inner join test on candidates.email=test.email;";
    con.query(sql, (err, result) => {
        console.log(result);
        if (err)
            throw err
        else
            res.json({ msg: "highest scoring candidate ", highestScoringCandidate: result })


    })


})



//view all candidates with all rounds marks

router.get('/viewAllCandidatesWithmarks', (req, res) => {


    let sql = "select * from candidates inner join test on candidates.email=test.email;";
    con.query(sql, (err, result) => {
        console.log(result);
        if (err)
            throw err
        else
            res.json({ msg: "view all candidates with all rounds marks", allCandidates: result })


    })


})



module.exports = router;