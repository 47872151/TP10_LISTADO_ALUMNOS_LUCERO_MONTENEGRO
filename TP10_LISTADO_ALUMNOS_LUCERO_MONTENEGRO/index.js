
import AlumnoRouter from './src/controllers/alumno-controller.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
const app = express();
const port = 3000;

// Middlewares
app.use(cors());        
app.use(express.json());

// Servir imágenes estáticas de alumnos
app.use('/static/alumnos', express.static(path.join(process.cwd(), 'uploads', 'alumnos')));

// Rutas
app.use(AlumnoRouter);

// Inicio el server
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
