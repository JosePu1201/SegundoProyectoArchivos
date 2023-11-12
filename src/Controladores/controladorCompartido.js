const compartido = require('../Modelos/compartido');
const archivo = require('../Modelos/archivo');
const usuario = require('../Modelos/usuario');

const insertarCompartido= async(req,res)=>{
    const nombreArchivo = req.body.nombreArchivo;
    const autor = req.body.autor;
    const pathPadre = req.body.path;
    const usuarioCompartir = req.body.compartir;
    

    try{
        const archivoEncontrado = await archivo.findOne({
            nombre: nombreArchivo,
            autor: autor,
            pathPadre: pathPadre,
            enPapelera: false
        });

        if(archivoEncontrado){
            const existeUsuario = await usuario.findOne({
                usuario: usuarioCompartir
            });
            if(existeUsuario){
                const fecha = new Date();
                const insertarCompartir = new compartido({
                    nombre: nombreArchivo,
                    autor: usuarioCompartir,
                    extension: archivoEncontrado.extension,
                    contenido: archivoEncontrado.contenido,
                    propietario: autor,
                    pathPadre: "/compartido",
                    creacion: fecha
                });
                const confirmacion = await insertarCompartir.save();
                
                if(confirmacion){
                    res.json({message: "Archivo compartido con exito"});
                    //console.log(confirmacion);
                }
                else{
                    res.json({message: "ocurrio un errror al compartir"})
                }
            }
            else{
                res.status(400).json({message: "Error! El usuario al que quieres compartir no existe"});
            }
        }
        else{
            res.status(400).json({message: "Error! El archivo no existe"});
        }
    }catch(error){
        return res.status(500).json({ message: "Error interno del servidor" });
    }

};

const consultaCompartido = async (req,res) =>{
    const autor = req.query.autor;
    try{
        const archivosCompartidos = await compartido.find({
            autor: autor
        });
        res.json(archivosCompartidos);
    }catch(error){
        res.json({message: "Ocurrio un error"})
    }
};

const eliminarPorID = async (req, res) => {
    const idCompartido = req.query.id;
    console.log(idCompartido);
    try {
        const compartidoEncontrado = await compartido.findById(idCompartido);

        if (compartidoEncontrado) {
            await compartidoEncontrado.deleteOne(); 
            res.json({ message: "Elemento compartido eliminado con éxito" });
        } else {
            res.status(404).json({ message: "Elemento compartido no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


module.exports = {
    insertarCompartido,
    consultaCompartido,
    eliminarPorID
};