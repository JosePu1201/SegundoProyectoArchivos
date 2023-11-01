const usuario = require('../Modelos/usuario');

//Agrega un nuvo usuario
const agregarUsuario = async (req, res) => {
    const existeUser = await usuario.findOne({ 'usuario': req.body.usuario });

    if (existeUser) {
        console.log("El usuario ya existe");
        res.status(400).json({ message: 'El usuario ya existe' });
    } else {
        const insertarUsuario = new usuario({
            usuario: req.body.usuario,
            Contra: req.body.Contra,
            rol: req.body.rol
        });
            if(req.body.Contra === "" && req.body.usuario === ""){

            }
        const confirmacion = await insertarUsuario.save();
        res.json(confirmacion);
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

const actualizarUsaurio = async (req,res) => {
    try {
        const filter = { usuario: req.body.nombre}; // Filtro para encontrar el usuario
        const update = { Contra: req.body.nuevaContra }; // Datos a actualizar

        const resultado = await usuario.updateOne(filter, update);

        if (resultado.nModified > 0) {
            console.log('Contraseña actualizada con éxito');
            res.json(resultado);
        } else {
            console.log('El usuario "usuario1" no fue encontrado o la contraseña ya está actualizada');
            res.json(resultado);
        }
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.json();
    }
};

module.exports = {
    agregarUsuario,
    obtenerUsuario,
    actualizarUsaurio
}