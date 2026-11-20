import client from "../../config/data_base.js"
const baseDatos = "productosDB"
const coleccion = client.db(baseDatos).collection("categorias")
export async function registrarCategoria(nombre) {
    if(typeof nombre == "string" && nombre.trim()!=""){
        const buscarCategoria = await coleccion.findOne({nombre: nombre})
        if(buscarCategoria == null){
            let categoriaObj = {
                nombre: nombre.trim().toLowerCase(),
                createAt: new Date(),
                updateAt: new Date()
            }
            const insertarCategoria = await coleccion.insertOne(categoriaObj)
            if(insertarCategoria.acknowledged){
            return{
                success:true,
                message: `Categoria insertada con id: ${insertarCategoria.insertedId}`
            }
            }else{
                return{
                success: false,
                message: `Error al registrar la categoria`
            }
            }
           
        }else{
            return{
                success:false,
                message: "Ya existe una categoria con ese nombre"
            }
        }
    }else{
        return{
                success:false,
                message: "Ingrese un nombre valido"
            } 
    }
}
export async function consultarCategoria(nombre) {
    if(nombre == undefined){
    const respuesta = await coleccion.find({})
    let respuestaArr = await respuesta.toArray()
    if(respuestaArr.length > 0){
        return{
            success: true,
            message: "Categorias consultadas correctamente",
            categorias: respuestaArr
        }
    }
    else{
       return{
            success: false,
            message: "No se encontraron categorias",
            categorias: respuestaArr
        } 
    }
    }else{
        if(typeof nombre == "string" && nombre.trim()!=""){
            nombre = nombre.trim().toLowerCase()
       const categoria = await coleccion.findOne({nombre: nombre})
       if(categoria != null){
        return{
            success: true,
            message: "Categoria consultada correctamente",
            categoria: categoria
        }
       }else{
        return{
            success: false,
            message: "No se encontro la categoria",
        }
       }

        }else{
            return{
                success: false,
                message: "Ingrese un nombre valido"
            }
        }

    }
    
}