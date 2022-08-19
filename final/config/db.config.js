const mysql = require('mysql');


const connection = mysql.createPool({
    host: "127.0.0.1",
    user: "root", //southgir_ekhonikeno
    password: '',//@monir#hosen259672
    database:"ekhoni_keno", //southgir_ekhonikeno
    multipleStatements:true,
});


connection.getConnection((err) => {
   if(err){
    console.log(err)
   }else{
    console.log("database connected")
   }
});

module.exports = connection;