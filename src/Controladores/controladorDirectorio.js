const directorio = require('../Modelos/directorio');

const agregarDirectorio = async (req, res) => {
    const existeUno = await directorio.findOne({
        nombre: req.body.nombre,
        path: req.body.path,
        enPapelera: false
    });
    if(existeUno){
        res.status(400).json({message: "La carpeta ya"});
    }else{
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
    }

};

const obtenerDirectorio = async (req, res) => {
    res.json();
}
const obtenerDirectorioPorPathAutor = async (req, res) => {
    console.log("------------------------------------");
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

        await res.json(directorioEncontrados);
        console.log(directorioEncontrados);
    } catch (error) {
        console.error('Error al buscar la carpeta:', error);
        res.status(500).json({ message: 'Error al buscar la carpeta' });
    }
};
const obtenerPathPorNombre = async (req, res) => {
    const nombreCarpeta = req.query.nombreCarpeta;
    const autor = req.query.autor;
    const pathPadre = req.query.path;
    console.log('entra a primera peticion');
    try {
        let directorioEncontrados;
        if(pathPadre === 'null'){
            directorioEncontrados = await directorio.findOne({
                pathPadre: { $in: [null, ''] },
                nombre: nombreCarpeta,
                autor: autor,
                enPapelera: false
            });
        }else{
            directorioEncontrados = await directorio.findOne({
            pathPadre: pathPadre,
            nombre: nombreCarpeta,
            autor: autor,
            enPapelera: false
        });
        }
        console.log(res.path);
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