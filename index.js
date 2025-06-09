import express  from "express"; // hacer npm i express
import cors     from "cors";    // hacer npm i cors
import config from './src/configs/db-configs.js'
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

app.get('/api/alumnos/', async (req, res) => {
  const client = new Client(config);
  try {
    await client.connect();
    const sql = 'SELECT * FROM alumnos';
    const result = await client.query(sql);
    res.status(200).send(result.rows);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
  await client.end();
});

app.get('/api/alumnos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send('id inválido');
  }
  const client = new Client(config);
  try {
    await client.connect();
    const sql = 'SELECT * FROM alumnos WHERE id = $1';
    const result = await client.query(sql, [id]);
    if (result.rows.length === 0){
      res.status(404).send('Alumno no encontrado');
    } 
    res.status(200).send(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
  await client.end();
});

app.post('/api/alumnos/', async (req, res) => {
  const { nombre, apellido, id_curso, fecha_nacimiento, hace_deportes } = req.body;
  if (!nombre || nombre.length < 3){
    res.status(400).send('Nombre inválido');
  }
  if (!apellido || apellido.length < 3) {
    res.status(400).send('Apellido inválido');
  }
  const client = new Client(config);
  try {
    await client.connect();
    const sql = `INSERT INTO alumnos (nombre, apellido, id_curso, fecha_nacimiento, hace_deportes) VALUES ($1, $2, $3, $4, $5)`;
    await client.query(sql, [nombre, apellido, id_curso, fecha_nacimiento, hace_deportes]);
    res.status(201).send('Alumno creado correctamente');
  } catch (error) {
    res.status(500).send(error.message);
  }
  await client.end();
});

app.put('/api/alumnos/', async (req, res) => {});
app.delete('/api/alumnos/:id', async (req, res) => {});

//

// Inicio el Server y lo pongo a escuchar.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});