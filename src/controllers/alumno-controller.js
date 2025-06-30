import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import AlumnoService from '../services/alumno-services.js';

const router = Router();
const svc = new AlumnoService();

// GET ALL
router.get('/api/alumnos', async (req, res) => {
  try {
    const alumnos = await svc.getAllAsync();
    res.status(StatusCodes.OK).json(alumnos);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
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

export default router;
