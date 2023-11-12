const mongoose = require (`mongoose`);
//coneccion a base de datos en docker
const host = 'db';
const port = 27017;
const database = 'CloudArch';

async function start(){
    try {
        const db = await mongoose.connect(`mongodb://${host}:${port}/${database}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4
        });
        console.log(`conexion realizada con exito`);
    } catch (error) {
        console.log('algo salio mal');
    }
}
module.exports = {
    start
}