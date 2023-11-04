
const express = require('express');
const router = express.Router();


// para provar con el postman
app.post('/hola',function(request,response){
    console.log(request.body)
    response.json({state:'ok'})
})

// se hace el CRUD

var usuariosController = require(__dirname + "/Apis/Controladores/usuariosController.js").usuarios

app.post('/usuarios/Guardar',function(request,response){
    usuariosController.Guardar(request,response)

})

app.post('/usuarios/CargarTodas',function(request,response){
    usuariosController.CargarTodas(request,response)
    
})

app.post('/usuarios/Actualizar',function(request,response){
    usuariosController.Actualizar(request,response)
    
})

app.post('/usuarios/Login',function(request,response){
    usuariosController.Login(request,response)
    
})
app.post('/usuarios/Eliminar',function(request,response){
    usuariosController.Eliminar(request,response)
    
})
app.post('/usuarios/Consulta',function(request,response){
    usuariosController.Consulta(request,response)

})


// crud para productos
var productosController = require(__dirname + "/Apis/Controladores/productosController.js").productos

app.post('/productos/Guardar',function(request,response){
    productosController.Guardar(request,response)

})

app.post('/productos/CargarTodas',function(request,response){
    productosController.CargarTodas(request,response)
    
})

app.post('/productos/Actualizar',function(request,response){
    productosController.Actualizar(request,response)
    
})

app.post('/productos/Eliminar',function(request,response){
    productosController.Eliminar(request,response)
    
})

// crud para Carrito
var carritoController = require(__dirname + "/Apis/Controladores/carritoController.js").carrito

app.post('/carrito/AdicionarAlCarrito',function(request,response){
    carritoController.AdicionarAlCarrito(request,response)

})

app.post('/carrito/CargarMiCarrito',function(request,response){
    carritoController.CargarMiCarrito(request,response)
    
})

app.post('/carrito/ActualizarCantidad',function(request,response){
    carritoController.ActualizarCantidad(request,response)
    
})

app.post('/carrito/EliminarItem',function(request,response){
    carritoController.EliminarItem(request,response)
    
})
// Definir la ruta de inicio de sesión
router.post('/usuarios/Login', usuariosController.Login);
router.post('/usuarios/Guardar', usuariosController.Login);
router.post('/usuarios/Consulta', usuariosController.Login);



// Otras rutas de la API
// router.get('/api/otra-ruta', controlador.otraRuta);

module.exports = router;