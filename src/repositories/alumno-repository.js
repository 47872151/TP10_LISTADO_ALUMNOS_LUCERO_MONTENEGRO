import pool from '../configs/db-configs.js';
import { validarID, validarText } from '../helpers/validaciones.js';

export default class AlumnoRepository {
  async getAllAsync() {
    try {
      const result = await pool.query('SELECT * FROM alumnos');
      return result.rows;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener alumnos');
    }
  }

  async getByIDAsync(id) {
    if (!validarID(id)) throw new Error('ID inválido');

    try {
      const result = await pool.query('SELECT * FROM alumnos WHERE id = $1', [id]);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener alumno por ID');
    }
  }

  async createAsync(entity) {
    const { nombre, apellido, id_curso, fecha_nacimiento, hace_deportes } = entity;

    if (!validarText(nombre)) throw new Error('Nombre inválido');
    if (!validarText(apellido)) throw new Error('Apellido inválido');

    try {
      const result = await pool.query(
        `INSERT INTO alumnos (nombre, apellido, id_curso, fecha_nacimiento, hace_deportes)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nombre, apellido, id_curso, fecha_nacimiento, hace_deportes]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear alumno');
    }
  }

  async updateAsync(entity) {
    const { id, nombre, apellido, id_curso, fecha_nacimiento, hace_deportes } = entity;

    if (!validarID(id)) throw new Error('ID inválido');
    if (!validarText(nombre)) throw new Error('Nombre inválido');
    if (!validarText(apellido)) throw new Error('Apellido inválido');

    try {
      const existe = await pool.query('SELECT * FROM alumnos WHERE id = $1', [id]);
      if (existe.rows.length === 0) return null;

      const result = await pool.query(
        `UPDATE alumnos SET nombre = $1, apellido = $2, id_curso = $3,
         fecha_nacimiento = $4, hace_deportes = $5 WHERE id = $6 RETURNING *`,
        [nombre, apellido, id_curso, fecha_nacimiento, hace_deportes, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar alumno');
    }
  }

  async deleteByIDAsync(id) {
    if (!validarID(id)) throw new Error('ID inválido');

    try {
      const existe = await pool.query('SELECT * FROM alumnos WHERE id = $1', [id]);
      if (existe.rows.length === 0) return null;

      await pool.query('DELETE FROM alumnos WHERE id = $1', [id]);
      return true;
    } catch (error) {
      console.error(error);
      throw new Error('Error al eliminar alumno');
    }
  }
}
