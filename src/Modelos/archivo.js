const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const schema = moongose.Schema;
const model = mongoose.model;

const archivoSchema = new mongoose.Schema({
    nombre: String,
    extension: String,
    contenido: String,
    enPapelera: Boolean,
    pathPadre: String,
    creacion: Date,
    modificacion: Date
},{
    versionKey : false
});

module.exports = model('Archivo',archivoSchema);