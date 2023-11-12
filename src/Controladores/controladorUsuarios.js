const usuario = require('../Modelos/usuario');
const directorio = require('../Modelos/directorio');
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
        const confirmacion = await insertarUsuario.save();
        if(confirmacion){
            const insertarRaiz = new directorio({
                nombre: "raiz",
                path: "/raiz",
                pathPadre: null,
                enPapelera: false,
                autor: req.body.usuario,
                FechaDeCreacion: new Date()
            });
            const confirmacionRaiz = await insertarRaiz.save();

            const insertarCompartir = new directorio({
                nombre: "compartido",
                path: "/compartido",
                pathPadre: null,
                enPapelera: false,
                autor: req.body.usuario,
                FechaDeCreacion: new Date()
            });
            const confirmacionCompartir = await insertarCompartir.save();
            res.json({message: "Usuario insertado con exito\nCarpetas raiz y compartido asociados al usuario"});
        }else{
            res.json({message: "Ocurrio un error en el servidor"})
        }
        
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

const obtenerUsuarioID = async (req, res) => {
    try {
        const id = req.query.id;
        const buscar = await usuario.findById({
            _id: id
        });

        // Manejar el caso cuando el usuario no se encuentra
        if (!buscar) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Si se encuentra el usuario, puedes enviar los datos del usuario como respuesta
        res.json(buscar);
    } catch (error) {
        // Manejar otros posibles errores, por ejemplo, problemas de conexión a la base de datos
        console.error(error);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
};

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
    actualizarUsaurio,
    obtenerUsuarioID
}