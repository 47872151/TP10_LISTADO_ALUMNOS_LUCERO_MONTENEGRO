import DBconfig from '../../configs/dbConfig.js';
import pkg from 'pg';
const { Client } = pkg;
import { validarID, validarNombre } from '../helpers/validaciones.js';

export default class ProvinceRepository {
  getAllAsync = async () => {
    let returnArray = null;
    const client = new Client(DBconfig);
    try {
      await client.connect();
      const sql = 'SELECT * FROM provinces';
      const result = await client.query(sql);
      await client.end();
      returnArray = result.rows;
    } catch (error) {
      console.log(error);
    }
    return returnArray;
  };

  getByIdAsync = async (id) => {
    let returnObj = null;
    if (!validarID(id)) throw new Error('ID inválido');
    const client = new Client(DBconfig);
    try {
      await client.connect();
      const sql = 'SELECT * FROM provinces WHERE id = $1';
      const result = await client.query(sql, [id]);
      await client.end();
      if (result.rows.length > 0) returnObj = result.rows[0];
    } catch (error) {
      console.log(error);
    }
    return returnObj;
  };

  createAsync = async (entity) => {
    let returnObj = null;
    const { nombre } = entity;
    if (!validarNombre(nombre)) throw new Error('Nombre inválido');
    const client = new Client(DBconfig);
    try {
      await client.connect();
      const sql = 'INSERT INTO provinces (nombre) VALUES ($1) RETURNING *';
      const result = await client.query(sql, [nombre]);
      await client.end();
      returnObj = result.rows[0];
    } catch (error) {
      console.log(error);
    }
    return returnObj;
  };

  updateAsync = async (entity) => {
    let returnObj = null;
    const { id, nombre } = entity;
    if (!validarID(id)) throw new Error('ID inválido');
    if (!validarNombre(nombre)) throw new Error('Nombre inválido');

    const client = new Client(DBconfig);
    try {
      await client.connect();
      const existe = await client.query('SELECT * FROM provinces WHERE id = $1', [id]);
      if (existe.rows.length === 0) return null;

      const sql = 'UPDATE provinces SET nombre = $1 WHERE id = $2 RETURNING *';
      const result = await client.query(sql, [nombre, id]);
      await client.end();
      returnObj = result.rows[0];
    } catch (error) {
      console.log(error);
    }
    return returnObj;
  };

  deleteByIdAsync = async (id) => {
    let deleted = false;
    if (!validarID(id)) throw new Error('ID inválido');
    const client = new Client(DBconfig);
    try {
      await client.connect();
      const existe = await client.query('SELECT * FROM provinces WHERE id = $1', [id]);
      if (existe.rows.length === 0) return null;

      await client.query('DELETE FROM provinces WHERE id = $1', [id]);
      await client.end();
      deleted = true;
    } catch (error) {
      console.log(error);
    }
    return deleted;
  };
}
