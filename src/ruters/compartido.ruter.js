const express = require('express');
const archivo = require('../Modelos/archivo');
const compartido = require('../Modelos/compartido');
const controladorCompartir = require('../Controladores/controladorCompartido');
const ruter = express.Router();

//Compartir
ruter.post('/compartir',controladorCompartir.insertarCompartido);
ruter.get('/consultaCompartido',controladorCompartir.consultaCompartido);
ruter.delete('/eliminarCompartido',controladorCompartir.eliminarPorID);
module.exports = ruter;