import DBconfig from "../configs/db-configs";
import pkg from 'pg'
const {Client, Pool} = pkg;

export default class AlumnoRepository {
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client(DBconfig);
        try{
            await client.connect();
            await client.connect();
            const sql = 'SELECT * FROM alumnos';
            const result = await client.query(sql);
            returnArray = result.rows;
        }
        catch (error){
            console.error(error);
            res.status(500).send('Error');
        }
        await client.end();
        return returnArray;
    }
}