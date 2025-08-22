import pool from '../configs/db-configs.js';
import { validarID, validarText } from '../helpers/validaciones-helper.js';

export default class CursosRepository {

    getAllAsync = async () => {
        try {
                const result = await pool.query('SELECT * FROM cursos');
                return result.rows;
        } catch (error) {
           console.error(error);
            throw new Error('Error al obtener cursos');
        }
    }

    getByIdAsync = async (id) => {
       if (!validarID(id)) throw new Error('ID inválido');
        try {
            const result = await pool.query('SELECT * FROM cursos WHERE id = $1', [id]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
        console.error(error);
        throw new Error('Error al obtener curso por ID');
    }
    
    }
    
}