const express = require('express');
const controladorDirectorio = require('../Controladores/controladorDirectorio');
const ruter = express.Router();

//Agregar nuevo directorio

ruter.post('/agregarDirectorio',controladorDirectorio.agregarDirectorio);

//consurltar directroio por path y autor

ruter.get('/consultaDirectorioPathAutor',controladorDirectorio.obtenerDirectorioPorPathAutor);
ruter.get('/consultanombreAutor',controladorDirectorio.obtenerPathPorNombre);
ruter.put('/moverDirectorio',controladorDirectorio.moverDirectorio);
module.exports = ruter;