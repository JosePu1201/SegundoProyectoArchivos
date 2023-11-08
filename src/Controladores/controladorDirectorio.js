const directorio = require('../Modelos/directorio');

const agregarDirectorio = async (req, res) => {
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

const obtenerDirectorio = async (req, res) => {
    res.json();
}
const obtenerDirectorioPorPathAutor = async (req, res) => {
    const pathPadre = req.query.path;
    const autor = req.query.autor;
    console.log('entra aca', pathPadre);
    console.log('entra aca', autor);

    try {
        let directorioEncontrados;

        if (pathPadre === 'null') {
            directorioEncontrados = await directorio.find({
                pathPadre: { $in: [null, ''] },
                autor: autor,
                enPapelera: false
            });
        } else {
            directorioEncontrados = await directorio.find({
                pathPadre: pathPadre,
                autor: autor,
                enPapelera: false
            });
        }

        res.json(directorioEncontrados);
    } catch (error) {
        console.error('Error al buscar la carpeta:', error);
        res.status(500).json({ message: 'Error al buscar la carpeta' });
    }
};
const obtenerPathPorNombre = async (req, res) => {
    const nombreCarpeta = req.query.nombreCarpeta;
    const autor = req.query.autor;
   
    try {
        let directorioEncontrados;
        directorioEncontrados = await directorio.findOne({
            nombre: nombreCarpeta,
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
    obtenerDirectorioPorPathAutor,
    obtenerPathPorNombre
}