
var carritoModel = {}

// implementamos mongo, aca llamamos al esquema
/*const { mongo } = require('mongoose')
const Schema = mongo.Schema;*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var carritoSchema = new Schema({
    usuario_id:{type: mongoose.Schema.Types.ObjectId,ref:'Usuarios'},
    producto_id:{type: mongoose.Schema.Types.ObjectId,ref:'productos'},
    cantidad:Number
    
})
// si aca usamos mongoose tambien lo debemos usar en la app para la conexion si no da error al callback
const MyModel = mongoose.model("carrito",carritoSchema)

carritoModel.AdicionarAlCarrito = function(post,callback){
    const instancia = new MyModel
    instancia.usuario_id = post.usuario_id
    instancia.producto_id = post.producto_id
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
}

carritoModel.CargarMiCarrito = function(post, callback){
    // hacer un enlace entre 2 elementos agregate
    return MyModel.aggregate([
        {$match:{usuario_id:new mongoose.Types.ObjectId(post.usuario_id)}}, //aca se filtran los productos solo de este usuario en el carrito
        {
            $lookup:{
                from:"productos", //enlazamos con productos
                localField:"producto_id",// campo local del modelo carrito
                foreignField:"_id", //campo con el que se une un producto
                as:"productos" // alias de la unio
            }
        },
        {$unwind:"$productos"}, // esto es para que no se muestre como array si no como objeto
        {
            $project:{
                _id:1,
                producto_id:1,
                cantidad:1,
                productos:
                {nombre:1,
                precio:1,
                codigo:1} // para mostrar los campos
            }
        }
    ])
    .then(documentos => {
        return callback({state:true, data: documentos});
    })
    .catch(error => {
        return callback({ state:false, error: error.message});
    });
}

carritoModel.ActualizarCantidad = function(post,callback){
    MyModel.findByIdAndUpdate(post.id, {
        cantidad:post.cantidad
    })
    .then((modificado) =>{
        return callback({state: true,modificaID: modificado});
    })
    .catch(error => {
        return callback({ state:false, error: error.message})
    });
}

carritoModel.EliminarItem = function(post,callback){

    MyModel.findByIdAndDelete(post.id)
    .then((eliminado) =>{
        return callback({state: true,eliminaID: eliminado});
    })
    .catch(error => {
        return callback({ state:false, error: error.message})
    });
}


module.exports.carrito = carritoModel