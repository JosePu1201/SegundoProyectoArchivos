const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const schema = moongose.Schema;
const model = mongoose.model;

const compartidoSchema = new mongoose.Schema({
    nombre: String,
    autor: String,
    extension: String,
    contenido: String,
    propietario: String,
    pathPadre: String,
    creacion: Date
},{
    versionKey : false
});

module.exports = model('compartido',compartidoSchema);