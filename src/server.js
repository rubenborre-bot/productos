import app from "./app.js"
import { conectar } from "./config/data_base.js"

async function main(){
    try {
        await conectar()
        app.listen(process.env.PORT, ()=>{
            console.log(`Servidor escuchando en el puerto:${process.env.PORT}`)
        })
    } catch (error) {
        console.error(`Error conectandose a la base de datos ${error}`)
    }
};

main();