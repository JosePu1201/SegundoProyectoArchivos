function setDatos(pathAntiguo, nombre, tipo) {
    document.getElementById('tipoMover').textContent = tipo;
    document.getElementById('nombreMover').textContent = nombre;
    document.getElementById('ubiAnterior').textContent = pathAntiguo;

    document.getElementById('MoverA').style.display = "block";
}

function cancelarMover() {
    document.getElementById('tipoMover').textContent = "";
    document.getElementById('nombreMover').textContent = "";
    document.getElementById('ubiAnterior').textContent = "";

    document.getElementById('MoverA').style.display = "none";
}

function moverAqui() {
    const tipo = document.getElementById('tipoMover').textContent;
    const nombreDirectorio = document.getElementById('nombreMover').textContent;
    const pathAntiguo = document.getElementById('ubiAnterior').textContent;
    const pathValidar = path; // Puedes cambiar esto con tu texto

    const patronInicio = /^\/raiz/;

    if (patronInicio.test(pathValidar)) {
        if (tipo === "Carpeta") {
            //validar que me puedo mover
            const texto = path;
            const nuevo = `${pathAntiguo}/${nombreDirectorio}`;
            console.log(esSubruta(texto,nuevo));
            if (esSubruta(texto,nuevo)) {
                alert("No puedes moverte a esta carpeta");
                cancelarMover();
            } else {
                moverDirectorioAPI(pathAntiguo,path,nombreDirectorio,nombre)
                cancelarMover();
            }
            
        } else {
            moverArchivoAPI(pathAntiguo,path,nombreDirectorio,nombre);
            cancelarMover();
        }

    } else {
        //No se puede mover
    }
}
function moverDirectrioPapelera(path,nombreDirectorio){
    moverDirectorioAPI(path,"/papelera",nombreDirectorio,nombre)
}

async function moverDirectorioAPI(pathAntiguo, nuevoPath, nombreDirectorio, autor) {
    const url = `${urlGeneral}/moverDirectorio`;
    const data = {
        antiguoPadre: pathAntiguo,
        nuevoPadre: nuevoPath,
        nombreDirectorio: nombreDirectorio,
        autor: autor
    };

    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const respuesta = await res.json();
            alert(respuesta.message);
        } else {
            const respuesta = await res.json();
            alert(respuesta.message);
        }

        await mostrarCarpetas();
    } catch (error) {
        console.error('Error al intentar mover el directorio:', error);
        // Manejar el error de alguna manera (puede mostrar un mensaje al usuario)
    }
}
async function moverArchivoAPI(pathAntiguo, nuevoPath, nombreArchivo, autor) {
    const url = `${urlGeneral}/moverArchivo`;
    const data = {
        pathAntiguo: pathAntiguo,
        nuevoPath: nuevoPath,
        nombreArchivo: nombreArchivo,
        autor: autor
    };

    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const respuesta = await res.json();
            alert(respuesta.message);
        } else {
            const respuesta = await res.json();
            alert(respuesta.message);
        }

        await mostrarCarpetas();
    } catch (error) {
        console.error('Error al intentar mover el directorio:', error);
        // Manejar el error de alguna manera (puede mostrar un mensaje al usuario)
    }
}

function esSubruta(nuevoPath, antiguoPath) {
    const nuevo = nuevoPath.split('/')
    const antiguo = antiguoPath.split('/')

    if (nuevo.length < antiguo.length) {
        return false;
    }
    
    for (let i = 0; i < antiguo.length; i++) {
        console.log(nuevo[i],'=',antiguo[i]);
        if (nuevo[i] !== antiguo[i]) {
            return false;
        }
    }

    return true;
}
