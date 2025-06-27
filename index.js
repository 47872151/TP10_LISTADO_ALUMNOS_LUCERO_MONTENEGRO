import express  from "express"; // hacer npm i express
import cors     from "cors";    // hacer npm i cors
import config from './src/configs/db-configs.js'
import pkg from 'pg';
//hacer npm nodemon para que se recargue solo
// import AlumnoRouter from "./src/controllers/alumno-controller.js"

const { Pool }  = pkg;
const app  = express();
const port = 3000;

// Agrego los Middlewares

app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON




// Inicio el Server y lo pongo a escuchar.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});