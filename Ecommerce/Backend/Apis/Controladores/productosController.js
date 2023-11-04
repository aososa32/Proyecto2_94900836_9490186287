
var productosModel = require(__dirname + '/../Modelos/productosModel.js').productos
var productosController ={}

productosController.Guardar = function(request,response){
    var post = {
        nombre:request.body.nombre,
        codigo:request.body.codigo,
        precio:request.body.precio,
        fecha_ven:request.body.fecha_ven,
        cantidad:request.body.cantidad
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false,mensaje:"el campo nombre es obligatorio"})
        return false
    }
    
    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false,mensaje:"el campo codigo es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false,mensaje:"el campo precio es obligatorio"})
        return false
    }
    if(post.fecha_ven == undefined || post.fecha_ven == null || post.fecha_ven == ""){
        response.json({state:false,mensaje:"el campo Fecha Vencimiento es obligatorio"})
        return false
    }
    if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false,mensaje:"el campo cantidad es obligatorio"})
        return false
    }
    productosModel.Guardar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Producto creado correctamente"})
        }
        else{
            response.json({state:false,mensaje:"Error al almacenar",error:respuesta.error})
        }
    })

}
productosController.CargarTodas = function(request,response){
    productosModel.CargarTodas(null,function (respuesta) {
        response.json(respuesta)
    })

}


productosController.Actualizar = function(request,response){
    var post = {
        id:request.body.id,
        nombre:request.body.nombre,
        codigo:request.body.codigo,
        precio:request.body.precio,
        fecha_ven:request.body.fecha_ven,
        cantidad:request.body.cantidad
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false,mensaje:"el campo id es obligatorio"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false,mensaje:"el campo nombre es obligatorio"})
        return false
    }
    
    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false,mensaje:"el campo codigo es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false,mensaje:"el campo precio es obligatorio"})
        return false
    } 
    if(post.fecha_ven == undefined || post.fecha_ven == null || post.fecha_ven == ""){
        response.json({state:false,mensaje:"el campo Fecha vencimiento es obligatorio"})
        return false
    }
    if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false,mensaje:"el campo Cantidad es obligatorio"})
        return false
    }// si queremos actualizar otros datos debemos descomentar aca

    productosModel.Actualizar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Producto Actualizado correctamente"})
        }
        else{
            response.json({state:false,mensaje:"Error al Actualizar",error:respuesta.error})
        }
    })

}

productosController.Eliminar = function(request,response){
    var post = {
        id:request.body.id
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false,mensaje:"el campo id es obligatorio"})
        return false
    }
   
    

    productosModel.Eliminar(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Producto Eliminado correctamente"})
        }
        else{
            response.json({state:false,mensaje:"Error al Eliminar",error:respuesta.error})
        }
    })
}

module.exports.productos = productosController

