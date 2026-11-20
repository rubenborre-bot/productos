import { MongoClient } from "mongodb";
import 'dotenv/config';
const client = new MongoClient(process.env.MONGO_URI)
export async function conectar() {
    try{
    await client.connect()
    console.log("Conectado a la base de datos productos")
    }catch(error){
      throw error
    }
}
export default client