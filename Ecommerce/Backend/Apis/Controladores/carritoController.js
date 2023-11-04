
var carritoModel = require(__dirname + '/../Modelos/carritoModel.js').carrito
var carritoController ={}

carritoController.AdicionarAlCarrito = function(request,response){
    var post = {
        usuario_id:request.session.usuario_id, // aca se debe enviar la sesion o el id del usuario
        producto_id:request.body.producto_id,
        cantidad:request.body.cantidad,
        
    }

    if(post.usuario_id == undefined || post.usuario_id == null || post.usuario_id == ""){
        response.json({state:false,mensaje:"el campo usuario_id es obligatorio"})
        return false
    }
    
    if(post.producto_id == undefined || post.producto_id == null || post.producto_id == ""){
        response.json({state:false,mensaje:"el campo producto_id es obligatorio"})
        return false
    }

    if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false,mensaje:"el campo cantidad es obligatorio"})
        return false
    }
    
    carritoModel.AdicionarAlCarrito(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Producto agregado al carrito correctamente"})
        }
        else{
            response.json({state:false,mensaje:"Error al agregar",error:respuesta.error})
        }
    })

}
carritoController.CargarMiCarrito = function(request,response){

    var post = {
        usuario_id:request.session.usuario_id, // aca se debe enviar la sesion o el id del usuario
       
        
    }

    if(post.usuario_id == undefined || post.usuario_id == null || post.usuario_id == ""){
        response.json({state:false,mensaje:"el campo usuario_id es obligatorio"})
        return false
    }
    carritoModel.CargarMiCarrito(post,function (respuesta) {
        response.json(respuesta)
    })

}


carritoController.ActualizarCantidad = function(request,response){
    var post = {
        id:request.body.id,
        cantidad:request.body.cantidad,
        
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false,mensaje:"el campo id es obligatorio"})
        return false
    }
    if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false,mensaje:"el campo cantidad es obligatorio"})
        return false
    }
    
   // si queremos actualizar otros datos debemos descomentar aca

    carritoModel.ActualizarCantidad(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Producto del carrito Actualizado correctamente"})
        }
        else{
            response.json({state:false,mensaje:"Error al Actualizar",error:respuesta.error})
        }
    })

}

carritoController.EliminarItem = function(request,response){
    var post = {
        id:request.body.id
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false,mensaje:"el campo id es obligatorio"})
        return false
    }
   
    

    carritoModel.EliminarItem(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Producto Eliminado del carrito correctamente"})
        }
        else{
            response.json({state:false,mensaje:"Error al Eliminar",error:respuesta.error})
        }
    })
}

module.exports.carrito = carritoController

