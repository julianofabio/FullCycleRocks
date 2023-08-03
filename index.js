
const express = require('express')
const app = express()
const port = 3000
let rows = '';

app.listen(port, ()=>{
    console.log('Running on port: '+ port)
});

///Connection mysql db
let mysql = require('mysql2');

let con = mysql.createConnection({
    host: 'db', 
    user: 'root', 
    password: 'root', 
    database: 'nodedb'
});

con.connect(function(err) {
    if (err) {
        return console.log('Erro connecting to database...', err);
    }else{
        console.log('Connection established!');
    }

    //Get Ip Address
    let os = require('os')
    let net_int = os.networkInterfaces();
    let ipAddress = net_int.eth0[0].address;
    console.log(ipAddress);

    //Get Login name
    let username = os.userInfo().username;
    console.log(username);

    //Insert username, ip address and created date
    let insertPeople = 'INSERT INTO nodedb.people (USERNAME,IP_ADDRESS) VALUES(?, ?);';
    con.query(insertPeople,[username,ipAddress],
        function (err, results, fields) {
            if (err) throw err;
            else {
                console.log('Inserted ' + results.affectedRows + ' row(s).');
                app.get('/',(req,res) =>{
                  res.send('<h1>Teste</h1>')
                });
            }
        });

    let selectPeople = 'SELECT * FROM nodedb.people ';
    con.query(selectPeople, 
    function (err, results, fields) {
        if (err) throw err;
        else console.log('Selected ' + results.length + ' row(s).');

        rows = '<h1>Full Cycle Rocks!</h1>';
        rows = rows + '<table border="1">';
        rows = rows + '<tr>';
        rows = rows + '<th>Id</th>';
        rows = rows + '<th>User Name</th>';
        rows = rows + '<th>IP</th>';
        rows = rows + '<th>Created</th>';
        rows = rows + '</tr>';

        for (i = 0; i < results.length; i++) {
            let objJSON = JSON.stringify(results[i]);
            let obj = JSON.parse(objJSON);

            console.log('Id: ' +obj.id);
            console.log('User Name: ' + obj.USERNAME);
            console.log('IP: ' + obj.IP_ADDRESS);
            console.log('CREATED:' + obj.CREATED);

            rows = rows + '<tr>';
            rows = rows + '<td>' + obj.id + '</td>';
            rows = rows + '<td>' + obj.USERNAME + '</td>';
            rows = rows + '<td>' + obj.IP_ADDRESS + '</td>';
            rows = rows + '<td>' + obj.CREATED + '</td>';
            rows = rows + '</tr>';
        }

        rows = rows + '</table>';
        console.log('Done.');
    });

    con.end(function(err) {
        if (err) {
          return console.log(err.message);
        }
    });
});

app.get('/',(req,res) =>{
    res.send(rows)
})