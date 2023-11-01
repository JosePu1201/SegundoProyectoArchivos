const express = require('express');
const usuario = require('../Modelos/usuario');
const controladorUsuario = require('../Controladores/controladorUsuarios');
const ruter = express.Router();

//Agregar nuevo usuario 
ruter.post('/agregarUsuario',controladorUsuario.agregarUsuario);
//obtener un usuario
ruter.get('/obtenerUsurio', controladorUsuario.obtenerUsuario);

ruter.put('/actualizarContra',controladorUsuario.actualizarUsaurio);


module.exports = ruter;