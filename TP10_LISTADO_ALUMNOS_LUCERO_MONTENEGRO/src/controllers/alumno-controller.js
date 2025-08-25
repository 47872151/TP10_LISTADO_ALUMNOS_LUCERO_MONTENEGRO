import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import AlumnoService from '../services/alumno-services.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = Router();
const svc = new AlumnoService();

// GET ALL
router.get('/api/alumnos', async (req, res) => {
  try {
    const alumnos = await svc.getAllAsync();
    res.status(StatusCodes.OK).json(alumnos);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  const multer = require('multer');
  const upload = multer({ dest: 'uploads/' });
  }
});

// GET BY ID
router.get('/api/alumnos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const alumno = await svc.getByIDAsync(id);
    if (!alumno) return res.status(StatusCodes.NOT_FOUND).json({ error: 'Alumno no encontrado' });
    res.status(StatusCodes.OK).json(alumno);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
});

// CREATE
router.post('/api/alumnos', async (req, res) => {
  try {
    const nuevoAlumno = await svc.createAsync(req.body);
    res.status(StatusCodes.CREATED).json(nuevoAlumno);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
});

// UPDATE
router.put('/api/alumnos', async (req, res) => {
  try {
    const actualizado = await svc.updateAsync(req.body);
    if (!actualizado) return res.status(StatusCodes.NOT_FOUND).json({ error: 'Alumno no encontrado' });
    res.status(StatusCodes.OK).json(actualizado);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
});

// DELETE
router.delete('/api/alumnos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const eliminado = await svc.deleteByIDAsync(id);
    if (!eliminado) return res.status(StatusCodes.NOT_FOUND).json({ error: 'Alumno no encontrado' });
    res.status(StatusCodes.OK).json({ message: 'Alumno eliminado correctamente' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
});

// BEGIN ---------- multer config ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const id  = req.params.id;
    const dir = path.join(process.cwd(), 'uploads', 'alumnos', id);
    // Crear carpeta si no existe
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // conservar extensión original si viene (jpg, png, etc)
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'photo' + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    console.log('Tipo MIME recibido:', file.mimetype, 'Nombre original:', file.originalname);

    // Validar por extensión, no solo por mimetype
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExt = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

    if (!allowedExt.includes(ext)) {
      console.log('❌ Archivo rechazado por extensión:', ext);
      return cb(new Error('Solo se permiten archivos de imagen'), false);
    }

    cb(null, true);
  }
});
// END ---------- multer config ----------

// ---------- NUEVA RUTA: subir foto ----------
router.post('/api/alumnos/:id/photo', upload.single('image'), async (req, res) => {
  try {
    const id = req.params.id;

    // Verificar que el alumno exista
    const alumno = await svc.getByIDAsync(parseInt(id));
    if (!alumno) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(`No se encontró el alumno (id:${id}).`);
    }

    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST)
        .send('No se recibió el archivo. Usa el campo "image".');
    }

    // Ruta relativa y URL pública
    const relativePath = path.join('uploads', 'alumnos', id, req.file.filename);
    const publicUrl = `/static/alumnos/${id}/${req.file.filename}`;

    // Actualizo el Registro
    alumno.imagen = publicUrl;
    const actualizado = await svc.updateAsync(alumno);
    if (actualizado){
        res.status(StatusCodes.CREATED).json(alumno);
    } else {
        res.status(StatusCodes.NOT_FOUND).send(`No se encontró la entidad (id:${id}).`);
    }
  } catch (err) {
    console.error('Error real:', err); // <-- Esto mostrará el error real en consola
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error al subir la imagen.');
  }
});


export default router;
