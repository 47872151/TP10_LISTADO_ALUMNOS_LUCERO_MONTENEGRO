import express from 'express'; // npm i express
import cors from 'cors';       // npm i cors
import config from './src/configs/db-configs.js';
import pkg from 'pg';          // npm i pg
import AlumnoRouter from './src/controllers/alumno-controller.js'; //

const { Pool } = pkg;
const app = express();
const port = 3000;

// Middlewares
app.use(cors());        
app.use(express.json());

// Rutas
app.use(AlumnoRouter);   

const pool = new Pool(config);
pool.connect();

// Inicio el server
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
