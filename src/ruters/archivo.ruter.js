const express = require("express");
const archivo = require('../Modelos/archivo');
const controladorArchivo = require('../Controladores/controladorArchivo');
const ruter = express.Router();

//Agregar nuevo archivo

ruter.post('/agregarArchivo',controladorArchivo.agregarArchivo);

//Consultar archivos

ruter.get('/consultaArchivo',controladorArchivo.obtenerArchivo);

module.exports = ruter;