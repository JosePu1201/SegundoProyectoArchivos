const usuario = require('../Modelos/usuario');

//Agrega un nuvo usuario
const agregarUsuario = async (req, res) => {
    const insertarUsuario = new usuario({
        usuario: req.body.usuario,
        Contra: req.body.Contra,
        rol: req.body.rol
    });
    const existeUser = await usuario.findOne({'usuario': req.body.usuario});
    if(existeUser){
        console.log("El usaurio ya existe");
        res.json();
    }else{
        const confirmacion = await insertarUsuario.save();
        res.json(confirmacion)
    }    
};

//obtiene a un usuario
let nombre = "usuario1";
const obtenerUsuario = async (req, res) => {
    const usaurioEncontrado = await usuario.findOne({ 'usuario': req.body.usuario });
    if (usaurioEncontrado) {
        res.json(usaurioEncontrado);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }

}

const actualizarUsuario = async (req, res) => {
    const uppadte = await usuario.updateOne();
};

module.exports = {
    agregarUsuario,
    obtenerUsuario
}