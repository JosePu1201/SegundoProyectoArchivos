const usuario = require('../Modelos/usuario');

//Agrega un nuvo usuario
const agregarUsuario = async (req,res) =>{
    const insertarUsuario = new usuario({
        usuario: req.body.usuario,
        Contra: req.body.Contra,
        rol: req.body.rol
    });
    const confirmacion = await insertarUsuario.save();
    res.json(confirmacion)
};

//obtiene a un usuario
const obtenerUsuario = async(req,res) =>{
    res.json();
}

module.exports={
    agregarUsuario,
    obtenerUsuario
}