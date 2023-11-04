var config = {}
config.puerto = 3001;
config.claveoculta = "prueba123"
config.tiempodesesion = (60000 *60) //60 segundos por 60 es una hora
config.dbMongo = "Tienda"
config.Uri = 'mongodb+srv://asosad:I8NDJni2L5hqZovX@asosaumg.ewgxfqc.mongodb.net/Tienda?retryWrites=true&w=majority';
// para consultar o crear una DB especifica y no se inserte en TEST se debe colcoar el nombre de la DB luego de este parte
// mongodb.net/Tienda?re
module.exports.config = config