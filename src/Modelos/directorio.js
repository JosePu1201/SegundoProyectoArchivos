const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const schema = moongose.Schema;
const model = mongoose.model;

const directorioSchema = new mongoose.Schema({
    nombre: String,
    path: String,
    pathPadre: String,
    enPapelera: Boolean,
    autor: String,
    FechaDeCreacion: Date
},{
    versionKey: false
});

module.exports = model ("Directorio",directorioSchema);