
var productosModel = {}

// implementamos mongo, aca llamamos al esquema
/*const { mongo } = require('mongoose')
const Schema = mongo.Schema;*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var productosSchema = new Schema({
    codigo:String,
    nombre:String,
    precio:String,
    fecha_ven:String,
    cantidad:Number
    
})
// si aca usamos mongoose tambien lo debemos usar en la app para la conexion si no da error al callback
const MyModel = mongoose.model("productos",productosSchema)

productosModel.Guardar = function(post,callback){
    const instancia = new MyModel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo
    instancia.precio = post.precio
    instancia.fecha_ven = post.fecha_ven
    instancia.cantidad = post.cantidad


    instancia.save()
    .then((Creado) => {
      // Operación de guardado exitosa
      return callback({ state: true, createdDocument: Creado });
    })
    .catch((error) => {
      // Error durante la operación de guardado
      return callback({ state: false, error: error.message });
    });
  
/*
    instancia.save((error,Creado) => {
        if(error){
            return callback({state:false,error:error})
        }
        else{
            return callback({state:true})
        }
    })*/

}

productosModel.CargarTodas = function(post,callback){
   MyModel.find({},{}) 
    .then(documentos => {
        return callback({state:true, data: documentos});
    })
    .catch(error => {
        return callback({ state:false, error: error.message});
    });
};

productosModel.Actualizar = function(post,callback){
    MyModel.findByIdAndUpdate(post.id, {
        nombre:post.nombre,
        codigo:post.codigo,
        precio:post.precio,
        fecha_ven:post.fecha_ven,
        cantidad:post.cantidad
    })
    .then((modificado) =>{
        return callback({state: true,modificaID: modificado});
    })
    .catch(error => {
        return callback({ state:false, error: error.message})
    });
}

productosModel.Eliminar = function(post,callback){

    MyModel.findByIdAndDelete(post.id)
    .then((eliminado) =>{
        return callback({state: true,eliminaID: eliminado});
    })
    .catch(error => {
        return callback({ state:false, error: error.message})
    });
}


module.exports.productos = productosModel