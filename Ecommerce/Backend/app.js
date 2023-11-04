var express = require('express')
const cors = require('cors')
global.app = express()
var bodyParse = require('body-parser')
//const { config } = require('./config')
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended:true}))
global.config = require(__dirname + '/config.js').config
const mongoose = require('mongoose');
const { config } = require('./config');
const { MongoClient, ServerApiVersion } = require('mongodb');

// Habilitar CORS para todas las rutas
app.use(cors());


// configuracion de la sesion
var session = require('express-session')({
    secret:config.claveoculta,
    resave:true,
    saveUninitialized:true,
    cookie:{path:'/',httpOnly:true,maxAge:config.tiempodesesion},
    name:"TiendaCokkie",
    rolling:true
})

app.use(session)

// importando el archivo de rutas
require(__dirname + '/routes.js')

//conectandonos a mongo

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(config.Uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  /*async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);*/
// aca usanos mongose porque en la de post tambien usamos el mongose no podemos usar mongodb y mogoose

// Reemplaza "<URL_de_conexión>" con la URL de conexión proporcionada por tu proveedor en la nube creamos una variable Uri
const dbURL = config.Uri;

// Opciones de configuración (opcional)
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(dbURL, options)
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((error) => {
    console.error('Error de conexión a la base de datos:', error);
  });

/*mongoose.set('strictQuery',false)
mongoose.connect('mongodb+srv://asosad:I8NDJni2L5hqZovX@asosaumg.ewgxfqc.mongodb.net/?retryWrites=true&w=majority/' + config.dbMongo, {useNewUrlParser:true,useUnifiedTopology:true},(error,respuesta)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("Conexion correcta a MongoDB")
    }
})*/



// levantando el servidor
app.listen(config.puerto,function(){
    console.log('servidor funcionando por el puerto ' + config.puerto)
})