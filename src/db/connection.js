const mysql = require('mysql');
const { promisify } = require('util');

let pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodejs"
    // connectionLimit: 15
});

pool.getConnection((err, conn) => {
    if (err) throw err;
    if (conn) conn.release();
    console.log("Succes db conection");
    return;
})

pool.query = promisify(pool.query);

module.exports = pool;



// let userTable = "CREATE TABLE user (id int NOT NULL AUTO_INCREMENT, name varchar(30) NOT NULL, lastname varchar(50) NOT NULL, password varchar(255) NOT NULL, username varchar(30) NOT NULL, PRIMARY KEY (id));";
// let query = "INSERT INTO user (name, lastname, password, username) VALUES ('Ignacio', 'Miguez', '123', 'nano');";

// conn.connect((err) => {
//     if (err) throw err;
//     conn.query("USE nodejs;", (err) => {
//         if (err) throw err;
//         console.log("Joined to the db.");
//         conn.query(query, (err) => {
//             if (err) throw err;
//             console.log("User added.");
//             conn.query("SELECT * FROM user;", (err, response) => {
//                 if (err) throw err;
//                 console.log("User added: "+response);
//             })
//         })
//     })
// });