import AlumnoRepository from '../repositories/alumno-repository.js';
const repo = new AlumnoRepository();
export default class AlumnoService {
  getAllAsync = async () => {
    return await repo.getAllAsync();
  };

  getByIDAsync = async (id) => {
    return await repo.getByIDAsync(id);
  };

  createAsync = async (entity) => {
    return await repo.createAsync(entity);
  };

  updateAsync = async (entity) => {
    return await repo.updateAsync(entity);
  };

  deleteByIDAsync = async (id) => {
    return await repo.deleteByIDAsync(id);
  };
}
