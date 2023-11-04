
var usuariosModel = {}

// implementamos mongo, aca llamamos al esquema
/*const { mongo } = require('mongoose')
const Schema = mongo.Schema;*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var UsuariosSchema = new Schema({
    email:String,
    nombre:String,
    password:String,
    rol:Number,
    nit:String,
    dpi:Number

})
// si aca usamos mongoose tambien lo debemos usar en la app para la conexion si no da error al callback
const MyModel = mongoose.model("Usuarios",UsuariosSchema)

usuariosModel.Guardar = function(post,callback){
    const instancia = new MyModel
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.password = post.password
    instancia.rol = 2 // 2 para cleinte 1 para dmin
    instancia.nit = post.nit
    instancia.dpi = post.dpi

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

usuariosModel.CargarTodas = function(post,callback){
   MyModel.find({},{password:0}) // aca se envio 0 al passoword para que no lo muestre en la consulta
    .then(documentos => {
        return callback({state:true, data: documentos});
    })
    .catch(error => {
        return callback({ state:false, error: error.message});
    });
};

usuariosModel.Actualizar = function(post,callback){
    MyModel.findByIdAndUpdate(post.id, {
        nombre:post.nombre // solo permitira modificar el nombre aca podemos agregar mas
    })
    .then((modificado) =>{
        return callback({state: true,modificaID: modificado});
    })
    .catch(error => {
        return callback({ state:false, error: error.message})
    });
}

usuariosModel.Consulta = function(post,callback){
    const query = {
        $or: [
          { email: post.email },
          { nit: post.nit },
          { dpi: post.dpi }
        ]
      };
    MyModel.find(query)
    .then(result => {
        if (result.length > 0) {
          return callback({ state: true, message: "Usuario encontrado", user: result[0] });
        } else {
          return callback({ state: false, message: "Usuario no encontrado" });
        }
      })
      .catch(error => {
        return callback({ state: false, error: error.message });
      });
  };


usuariosModel.Eliminar = function(post,callback){

    MyModel.findByIdAndDelete(post.id)
    .then((eliminado) =>{
        return callback({state: true,eliminaID: eliminado});
    })
    .catch(error => {
        return callback({ state:false, error: error.message})
    });
}
usuariosModel.Login = function(post,callback){
    MyModel.find({email:post.email,password:post.password},{password:0})
     .then(documentos => {
         return callback({state:true, data: documentos});
     })
     .catch(error => {
         return callback({ state:false,mensaje:"No se pudo iniciar sesion, veirifique sus credenciales"});
     });
 };


module.exports.usuarios = usuariosModel