const directorio = require('../Modelos/directorio');
const archivo = require('../Modelos/archivo');

const agregarDirectorio = async (req, res) => {
    const existeUno = await directorio.findOne({
        nombre: req.body.nombre,
        path: req.body.path,
        autor: req.body.autor,
        enPapelera: false
    });
    if (existeUno) {
        res.status(400).json({ message: "La carpeta ya existe en el directorio" });
    } else {
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

    const pathPadre = req.query.path;
    const autor = req.query.autor;

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
        if (pathPadre === 'null') {
            directorioEncontrados = await directorio.findOne({
                pathPadre: { $in: [null, ''] },
                nombre: nombreCarpeta,
                autor: autor,
                enPapelera: false
            });
        } else {
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

/**
 * pruebas para mover
 */
const moverDirectorio = async (req, res) => {
    try {
        const antiguoPadre = req.body.antiguoPadre;
        const nuevoPadre = req.body.nuevoPadre;
        const nombreDirectorio = req.body.nombreDirectorio;
        const autor = req.body.autor;
        const buscarRepitencia = await directorio.findOne({
            pathPadre: nuevoPadre,
            nombre: nombreDirectorio,
            autor: autor
        });
        //const respuesta = await buscarRepitencia
        if (buscarRepitencia !== null) {
            res.json({ message: "Existe un archivo con el mismo nombre en la carpeta destino" })
        } else {
            const directoriosEncontrados = await buscarDirectorio(antiguoPadre, nombreDirectorio, autor);

            for (const directorioEncontrado of directoriosEncontrados) {
                await actualizarDirectorioRecursivo(directorioEncontrado, antiguoPadre, nuevoPadre, autor);
            }

            res.json({ message: "Directorio movido con éxito." });
        }


    } catch (error) {
        console.error('Error al mover directorio:', error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

async function buscarDirectorio(antiguoPadre, nombreDirectorio, autor) {
    const directoriosEncontrados = await directorio.find({
        pathPadre: antiguoPadre,
        autor: autor,
        nombre: nombreDirectorio
    });

    return directoriosEncontrados;
}

async function actualizarDirectorioRecursivo(directorio, antiguoPadre, nuevoPadre, autor) {
    //actualizacion Padre
    const nuevoPath = directorio.path.replace(antiguoPadre, nuevoPadre);
    const nuevoPathPadre = directorio.pathPadre.replace(antiguoPadre, nuevoPadre);
    await actualizarDirectorio(directorio._id, nuevoPath, nuevoPathPadre);
    //actualizar Hijos

    const subDirectorios = await buscarDirectorios(directorio.path, autor);
    for (const subDirectorio of subDirectorios) {
        await actualizarDirectorioRecursivo(subDirectorio, directorio.path, nuevoPath, autor);
    }

    const archivos = await buscarArchivos(directorio.path, autor);
    for (const archivo of archivos) {
        const nuevoPathPadreArchivo = archivo.pathPadre.replace(antiguoPadre, nuevoPadre);
        await actualizarArchivo(archivo._id, nuevoPathPadreArchivo);
    }
}
async function buscarArchivos(pathPadre, autor) {
    const archivosEncontrados = await archivo.find({
        pathPadre: pathPadre,
        autor: autor,
        enPapelera: false
    });
    return archivosEncontrados;
}
async function actualizarArchivo(id, nuevoPathPadre) {
    try {
        const resultado = await archivo.findByIdAndUpdate(id, {
            pathPadre: nuevoPathPadre
        }, { new: true });

        if (!resultado) {
            console.error(`No se pudo actualizar el archivo con ID: ${id}`);
            // Manejar el error, lanzar una excepción o realizar alguna acción adicional
        }

        // Puedes agregar más lógica aquí después de actualizar el archivo si es necesario

        console.log(`Archivo actualizado con éxito: ${JSON.stringify(resultado)}`);
    } catch (error) {
        console.error('Error al actualizar archivo:', error);
        // Manejar el error, lanzar una excepción o realizar alguna acción adicional
    }
}


async function buscarDirectorios(directorioPath, autor) {
    const directorioEncontrados = await directorio.find({
        pathPadre: directorioPath,
        autor: autor,
        enPapelera: false
    });
    return directorioEncontrados;
}
async function actualizarDirectorio(id, nuevoPath, nuevoPathPadre) {
    try {
        const resultado = await directorio.findByIdAndUpdate(id, {
            path: nuevoPath,
            pathPadre: nuevoPathPadre
        }, { new: true });

        if (!resultado) {
            console.error(`No se pudo actualizar el directorio con ID: ${id}`);
           
        }

       

        console.log(`Directorio actualizado con éxito: ${JSON.stringify(resultado)}`);
    } catch (error) {
        console.error('Error al actualizar directorio:', error);        
    }
}




module.exports = {
    agregarDirectorio,
    obtenerDirectorio,
    obtenerDirectorioPorPathAutor,
    obtenerPathPorNombre,
    moverDirectorio
}