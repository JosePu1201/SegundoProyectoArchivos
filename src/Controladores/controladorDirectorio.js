const directorio = require('../Modelos/directorio');

const agregarDirectorio = async(req,res) => {
    const insertarDirectorio = new directorio({
        nombre: req.body.nombre,
        path: req.body.path,
        pathPadre: req.body.pathPadre,
        enPapelera: Boolean(req.body.enPapelera),
        autor: req.body.autor,
        FechaDeCreacion: Date(req.body.FechaDeCreacion)
    });
    const confirmacion = await insertarDirectorio.save();
    res.json(confirmacion);
};

const obtenerDirectorio = async(req,res) => {
    res.json();
}
const obtenerDirectorioPorPathAutor = async (req, res) => {
    const { pathPadre, autor } = req.body;

    try {
        const directorioEncontrados = await directorio.find({
            pathPadre: pathPadre,
            autor: autor,
            enPapelera: false
        });

        res.json(directorioEncontrados);
    } catch (error) {
        console.error('Error al buscar la carpeta:', error);
        res.status(500).json({ message: 'Error al buscar la carpeta' });
    }
};

module.exports = {
    agregarDirectorio,
    obtenerDirectorio,
    obtenerDirectorioPorPathAutor
}