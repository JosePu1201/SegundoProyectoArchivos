const express = require('express');
const usuario = require('../Modelos/usuario')

const ruter = express.Router();

ruter.post('/agregarUsuario',async (req,res) =>{
    const insertarUsuario = new usuario({
        usuario: req.body.usuario,
        Contra: req.body.Contra,
        rol: req.body.rol
    });
    const confirmacion = await insertarUsuario.save();
    res.json(confirmacion)
});


module.exports = ruter;