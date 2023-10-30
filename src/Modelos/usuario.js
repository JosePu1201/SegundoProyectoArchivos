const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const schema = mongoose.Schema;
const model = mongoose.model;

const usuarioSchema = new moongose.Schema({
    usuario: String,
    Contra: String,
    rol: String
},{
    versionKey: false
});

module.exports = model('Usuario',usuarioSchema);