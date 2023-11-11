const archivo = require('../Modelos/archivo');

const agregarArchivo = async (req, res) => {
    console.log('nombreCrearArchivo', req.body.nombre);
    console.log('nombreCrearArchivo', req.body.pathPadre);
    const existeUno = await archivo.findOne({
        nombre: req.body.nombre,
        pathPadre: req.body.pathPadre,
        autor: req.body.autor,
        enPapelera: false
    });

    if (existeUno) {
        res.status(400).json({ message: 'Ya existe el archivo' });
    }
    else {
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
        console.log(confirmacion);
    }
};

const obtenerArchivo = async (req, res) => {
    const busqueda = await archivo.find();
    res.json(busqueda);
}
//obtiene todos los archivos que tienen el mismo path y autor ademas solo los que no estan
//en papelera
const obtenerArchivosPorPathYAutor = async (req, res) => {
    const pathPadre = req.query.path;
    const autor = req.query.autor;
    console.log('entra hasta aca');
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
//obtener archivo para mostrar contenido 
const obtenerArchivoPorPathAutorNombre = async (req, res) => {
    const path = req.query.path;
    const autor = req.query.autor;
    const nombre = req.query.nombre;
    try {
        const existeArchivo = await archivo.findOne({
            pathPadre: path,
            autor: autor,
            nombre: nombre
        });
        res.json(existeArchivo);
    } catch (error) {
        res.status(500).json({ message: "Archivo no encontrado" });
    }
};
const moverAPapelera = async (req, res) => {
    const path = req.body.path;
    const autor = req.body.autor;
    const nombre = req.body.nombre;
    try {
        const archivoMovido = await archivo.updateOne(
            {
                pathPadre: path,
                autor: autor,
                nombre: nombre
            },
            {
                $set: {
                    pathPadre: '/papelera',
                    enPapelera: true
                }
            });
        res.json(archivoMovido);
        console.log(archivoMovido);
    } catch (error) {
        res.status(500).body({ mensaje: 'error al eliminar' });
    }

};
const cambiarContenido = async (req, res) => {
    const path = req.body.path;
    const nombre = req.body.nombre;
    const autor = req.body.autor;
    const nuevoContenido = req.body.contenido;
    const fechaNueva = new Date();
    try {
        const contenidnuevo = await archivo.updateOne({
            pathPadre: path,
            nombre: nombre,
            autor: autor
        }, {
            $set: {
                contenido: nuevoContenido,
                modificacion: fechaNueva
            }
        });

        res.json(cambiarContenido);
    } catch (errro) {
        res.status(500).body({ mensaje: 'error al actualizar el contenido' });
    }
};
const obtenerArchivosEnPapelera = async (req,res) =>{
    const archivosEncontrados = await archivo.find({
        pathPadre: "/papelera",
        enPapelera: true
    });
    res.json(archivosEncontrados);
};
module.exports = {
    agregarArchivo,
    obtenerArchivo,
    obtenerArchivosPorPathYAutor,
    moverAPapelera,
    obtenerArchivoPorPathAutorNombre,
    cambiarContenido,
    obtenerArchivosEnPapelera
}