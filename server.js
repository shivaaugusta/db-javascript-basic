const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const BodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'school',
  password: '',
});

db.connect((err) => {
  if (err) throw err;
  console.log('database connected..');

  app.get('/', (req, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render('index', { users: users, title: 'Table Mahasiswa' });
    });
  });

  app.post('/add', (req, res) => {
    const insertSql = `INSERT INTO user (nama,kelas) VALUES ('${req.body.nama}', '${req.body.kelas}');`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

app.listen(9000, () => {
  console.log('server ready!!!!!!!!!!!!');
});
