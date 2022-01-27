import express from 'express';
import cors from 'cors';
import knex from 'knex';
import { handleAddClass } from './controllers/classes/addClass.js';


// This is for local development. Connected to local db.
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'your_database_user',
      password : 'your_database_password',
      database : 'rihal'
    }
  });

// const db = knex({
//     client: 'pg',
//     connection: {
//       connectionString: process.env.DATABASE_URL,
//       ssl: { // NOT SECURE should be set to true but currently using free version of Heroku
//         rejectUnauthorized: false
//       }
//     }
// });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to root.'); 
});

app.post('/classes', (req, res) => { handleAddClass(req, res, db) })
app.delete('/classes/:id', (req, res) => { })
app.put('/classes/:id', (req, res) => { })

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});