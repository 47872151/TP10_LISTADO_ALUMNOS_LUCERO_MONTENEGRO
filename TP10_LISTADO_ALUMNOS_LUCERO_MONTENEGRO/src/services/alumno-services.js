import AlumnoRepository from '../repositories/alumno-repository.js';

export default class AlumnoService {
  getAllAsync = async () => {
    const repo = new AlumnoRepository();
    return await repo.getAllAsync();
  };

  getByIDAsync = async (id) => {
    const repo = new AlumnoRepository();
    return await repo.getByIDAsync(id);
  };

  createAsync = async (entity) => {
    const repo = new AlumnoRepository();
    return await repo.createAsync(entity);
  };

  updateAsync = async (entity) => {
    const repo = new AlumnoRepository();
    return await repo.updateAsync(entity);
  };

  deleteByIDAsync = async (id) => {
    const repo = new AlumnoRepository();
    return await repo.deleteByIDAsync(id);
  };
}
