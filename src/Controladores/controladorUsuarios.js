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
const obtenerUsuario = async (req, res) => {
    const user = req.query.usuario;
    const pass = req.query.contra;
    console.log(user);
    console.log(pass);
    const usuarioEncontrado = await usuario.findOne({ 'usuario': user, 'Contra': pass });

    if (usuarioEncontrado) {
        res.json(usuarioEncontrado);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado xDs' });
    }
}


const actualizarUsaurio = async (req, res) => {
    try {
        const filter = { usuario: req.body.nombre }; // Filtro para encontrar el usuario
        const update = { Contra: req.body.nuevaContra }; // Datos a actualizar

        const resultado = await usuario.updateOne(filter, update);

        if (resultado.nModified === 0) {
            console.log('El usuario no fue encontrado o la contraseña ya está actualizada');
            res.json(resultado);
        } else {
            console.log('Contraseña actualizada con éxito');
            res.json(resultado);
        }
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({ message: 'Error al actualizar la contraseña' });
    }
};

module.exports = {
    agregarUsuario,
    obtenerUsuario,
    actualizarUsaurio
}