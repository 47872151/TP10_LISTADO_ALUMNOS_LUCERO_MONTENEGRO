import CursosRepository from '../repositories/cursos-repository.js';
const repo = new CursosRepository();
export default class CursosService {

    getAllAsync = async () => {
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        const returnEntity = await repo.getByIdAsync(id);
        return returnEntity;
    }

    createAsync = async (entity) => {
        const rowsAffected = await repo.createAsync(entity);
        return rowsAffected;
    }

    updateAsync = async (entity) => {
        const rowsAffected = await repo.updateAsync(entity);
        return rowsAffected;
    }
    
    deleteByIdAsync = async (id) => {
        const rowsAffected = await repo.deleteByIdAsync(id);
        return rowsAffected;
    }

  
}