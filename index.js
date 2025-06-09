import express  from "express"; // hacer npm i express
import cors     from "cors";    // hacer npm i cors
import config from './configs/db-config.js'
import pkg from 'pg'


const { Client }  = pkg;


const app  = express();
const port = 3000;


// Agrego los Middlewares

app.use(cors());         // Middleware de CORS

app.use(express.json()); // Middleware para parsear y comprender JSON


//

// Acá abajo poner todos los EndPoints

// (por ejemplo)

//

app.get('/api/alumnos/', async (req, res) => {

    try {
        const client = new Client(config);
        await client.connect();
        let sql = 'SELECT * FROM alumos';
        let result = await client.query(sql);
        res.status(200).send;
        console.log(result.rows)
      } catch (error) {
        console.error(error);
        res.status(500).send;
      }
      await client.end();
      
},

// app.get('/api/alumnos/:id', async (req, res) => {...}

// app.post('/api/alumnos/', async (req, res) => {...}

// app.put('/api/alumnos/', async (req, res) => {...}

// app.delete('/api/alumnos/:id', async (req, res) => {...}


//

// Inicio el Server y lo pongo a escuchar.

//

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)

})
)
