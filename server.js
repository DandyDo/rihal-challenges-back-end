import express from 'express';
// import 'dotenv/config';
import cors from 'cors';
import knex from 'knex';
import typeParser from 'pg';
import { handleGetClasses } from './controllers/classes/getClasses.js';
import { handleGetCountries } from './controllers/countries/getCountries.js';
import { handleGetStudents } from './controllers/students/getStudents.js';
import { handleAddClass } from './controllers/classes/addClass.js';
import { handleUpdateClass } from './controllers/classes/updateClass.js';
import { handleDeleteClass } from './controllers/classes/deleteClass.js';
import { handleAddCountry } from './controllers/countries/addCountry.js';
import { handleUpdateCountry } from './controllers/countries/updateCountry.js';
import { handleDeleteCountry } from './controllers/countries/deleteCountry.js';
import { handleAddstudent } from './controllers/students/addStudent.js';
import { handleUpdateStudent } from './controllers/students/updateStudent.js';
import { handleDeleteStudent } from './controllers/students/deleteStudent.js';


const { types } = typeParser;
// override parsing date column to Date()
types.setTypeParser(1082, val => val)

// This is for local development. Connected to local db.
// const db = knex({
//     client: 'pg',
//     connection: {
//       host : '127.0.0.1',
//       port : process.env.LPORT,
//       user : process.env.USERNAME,
//       password : process.env.PASSWORD,
//       database : 'rihal',
//       dateStrings: true
//     }
//   });

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { // NOT SECURE should be set to true but currently using free version of Heroku
        rejectUnauthorized: false
      },
      dateStrings: true
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to root.'); 
});

// GETs
app.get('/classes', (req, res) => { handleGetClasses(res, db) });
app.get('/countries', (req, res) => { handleGetCountries(res, db) });
app.get('/students', (req, res) => { handleGetStudents(res, db) });

// Classes end-points
app.post('/classes', (req, res) => { handleAddClass(req, res, db) })
app.put('/classes/:id', (req, res) => { handleUpdateClass(req, res, db) })
app.delete('/classes/:id', (req, res) => { handleDeleteClass(req, res, db) })

// Countries end-points
app.post('/countries', (req, res) => { handleAddCountry(req, res, db) })
app.put('/countries/:id', (req, res) => { handleUpdateCountry(req, res, db) })
app.delete('/countries/:id', (req, res) => { handleDeleteCountry(req, res, db) })

// Students end-points
app.post('/students', (req, res) => { handleAddstudent(req, res, db) })
app.put('/students/:id', (req, res) => { handleUpdateStudent(req, res, db) })
app.delete('/students/:id', (req, res) => { handleDeleteStudent(req, res, db) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});