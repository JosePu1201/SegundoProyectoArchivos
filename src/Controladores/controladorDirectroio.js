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

module.exports = {
    agregarDirectorio,
    obtenerDirectorio
}