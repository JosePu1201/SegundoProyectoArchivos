const archivo = require('../Modelos/archivo');

const agregarArchivo = async (req, res) => {
    const insertarArchivo = new archivo({
        nombre: req.body.nombre,
        autor: req.body.autor,
        extension: req.body.extension,
        contenido: req.body.contenido,
        enPapelera: Boolean(req.body.enPapelera),
        pathPadre: req.body.pathPadre,
        creacion: Date(req.body.creacion),
        modificacion: Date(req.body.modificacion)
    });
    const confirmacion = await insertarArchivo.save();
    res.json(confirmacion);
};

const obtenerArchivo = async(req,res) => {
    const busqueda = await archivo.find();
    res.json(busqueda);
}
//obtiene todos los archivos que tienen el mismo path y autor ademas solo los que no estan
//en papelera
const obtenerArchivosPorPathYAutor = async (req, res) => {
    const pathPadre = req.query.path;
    const autor = req.query.autor;

    try {
        const archivosEncontrados = await archivo.find({
            pathPadre: pathPadre,
            autor: autor,
            enPapelera: false
        });

        res.json(archivosEncontrados);
    } catch (error) {
        console.error('Error al buscar archivos:', error);
        res.status(500).json({ message: 'Error al buscar archivos' });
    }
};


module.exports = {
    agregarArchivo,
    obtenerArchivo,
    obtenerArchivosPorPathYAutor
}