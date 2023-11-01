const archivo = require('../Modelos/archivo');

const agregarArchivo = async (req, res) => {
    const insertarArchivo = new archivo({
        nombre: req.body.nombre,
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

module.exports = {
    agregarArchivo,
    obtenerArchivo
}