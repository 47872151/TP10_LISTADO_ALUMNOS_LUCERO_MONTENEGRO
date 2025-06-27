import AlumnoRepository from '../repositories/alumno-repository';
export default class AlumnoService{
    getAllAsync = async () => {
        const repo = new AlumnoRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }
}