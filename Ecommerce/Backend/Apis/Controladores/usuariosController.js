
var usuariosModel = require(__dirname + '/../Modelos/usuariosModel.js').usuarios
var usuariosController ={}

usuariosController.Guardar = function(request,response){
    var post = {
        nombre:request.body.nombre,
        email:request.body.email,
        password:request.body.password
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false,mensaje:"el campo nombre es obligatorio"})
        return false
    }
    
    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false,mensaje:"el campo email es obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false,mensaje:"el campo password es obligatorio"})
        return false
    }
    usuariosModel.Guardar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"usuario creado correctamente"})
        }
        else{
            response.json({state:false,mensaje:"Error al almacenar",error:respuesta.error})
        }
    })

}
usuariosController.CargarTodas = function(request,response){
    usuariosModel.CargarTodas(null,function (respuesta) {
        response.json(respuesta)
    })

}


usuariosController.Actualizar = function(request,response){
    var post = {
        id:request.body.id,
        nombre:request.body.nombre,
        email:request.body.email,
        password:request.body.password
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false,mensaje:"el campo id es obligatorio"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false,mensaje:"el campo nombre es obligatorio"})
        return false
    }
    
   /* if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false,mensaje:"el campo email es obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false,mensaje:"el campo password es obligatorio"})
        return false
    }*/  // si queremos actualizar otros datos debemos descomentar aca

    usuariosModel.Actualizar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"usuario Actualizado correctamente"})
        }
        else{
            response.json({state:false,mensaje:"Error al Actualizar",error:respuesta.error})
        }
    })

}

usuariosController.Eliminar = function(request,response){
    var post = {
        id:request.body.id
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false,mensaje:"el campo id es obligatorio"})
        return false
    }
   
    

    usuariosModel.Eliminar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"usuario Eliminado correctamente"})
        }
        else{
            response.json({state:false,mensaje:"Error al Eliminar",error:respuesta.error})
        }
    })
}

//mejora implementada con try catch
usuariosController.Login = function (request, response) {
    try {
      var post = {
        email: request.body.email,
        password: request.body.password,
      };
  
      if (!post.email) {
        return response.status(400).json({ state: false, mensaje: "El campo email es obligatorio" });
      }
      if (!post.password) {
        return response.status(400).json({ state: false, mensaje: "El campo password es obligatorio" });
      }
  
      usuariosModel.Login(post, function (respuesta) {
        if (respuesta.state) {
          console.log("Inicio de sesión exitoso para el usuario con ID: " + respuesta.data[0]._id);
          response.status(200).json({ state: true, mensaje: "Bienvenido" });
        } else {
          console.error("Error al iniciar sesión:", respuesta.error);
          response.status(401).json({ state: false, mensaje: "Error al iniciar sesión", error: respuesta.error });
        }
      });
    } catch (error) {
      console.error("Error en el controlador de inicio de sesión:", error);
      response.status(500).json({ state: false, mensaje: "Error interno del servidor" });
    }
  };
  

module.exports.usuarios = usuariosController

