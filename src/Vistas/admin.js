


const parametro = new URLSearchParams(window.location.search)
const nombre = parametro.get('nombre');
const urlGeneral = `http://localhost:4000/api`;
let path = null;
//llama a la configuracion inicial
configInicial();
//Conficuracion al principio de la ejecucion
async function configInicial() {
    //document.getElementById("NombreUsuario").textContent = `Administrador: ${nombre}`;
    mostrarCarpetas();
    const currentUrl = window.location.href;
    const matches = currentUrl.match(/\/([^\/?#]+)[^\/]*$/);
    const sourceHTML = matches ? matches[1] : 'Desconocido';
    if (sourceHTML === "vistaAdmin.html") {
        document.getElementById("NombreUsuario").textContent = `Administrador: ${nombre}`;
    } else {
        document.getElementById("NombreUsuario").textContent = `Empleado: ${nombre}`;
    }
}
//Cerrar Edicion y acciones
function cerrarEditar() {
    document.getElementById("editarArchivo").style.display = "none";
}
function guardarCambios() {
    const nombre = document.getElementById("nombreArchivoEditar").textContent;
    const contenido = document.getElementById("areaEditar").value;
    cambioEdicio(nombre, contenido);
    cerrarEditar();
}
//CAmbio de contrasenea
document.getElementById("actualizar").addEventListener("click", function () {
    document.getElementById("newP").style.display = "block";
});

document.getElementsByClassName("closePas")[0].addEventListener("click", function () {
    document.getElementById("newP").style.display = "none";
});

document.getElementsByClassName("cerrarMuestra")[0].addEventListener("click", function () {
    document.getElementById("mostrarArchivo").style.display = "none";
})

document.getElementById("passwordForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const contrasena = document.getElementById("newPassword").value;
    const confirmaContra = document.getElementById("confirmPassword").value;

    const espacios = /\s/; // Expresión regular para verificar espacios en blanco

    if (contrasena.length === 0 || espacios.test(contrasena)) {
        alert("La contraseña no debe contener espacios en blanco.");
    } else {
        // Verificar si las contraseñas coinciden
        if (confirmaContra !== contrasena) {
            alert("Las contraseñas no coinciden");
            document.getElementById("newPassword").value = "";
            document.getElementById("confirmPassword").value = "";
        } else {
            actualizar(contrasena);
            document.getElementById("newP").style.display = "none";
        }
    }
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
    localStorage.removeItem('token')
});
//valida si hay caracteres especiales
function validarTexto(texto) {
    const caracteresEspeciales = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    if (texto && typeof texto === 'string' && texto.trim() !== '') {
        if (!caracteresEspeciales.test(texto)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
//Crear una carpeta nueva
function agregarCarpeta(event) {
    event.preventDefault();
    const nombreCarpeta = document.getElementById('nombreCarpeta').value;
    console.log(nombreCarpeta);
    if (validarTexto(nombreCarpeta)) {
        nuevaCarpeta(nombreCarpeta);
        cerrarFormularioCarpeta();
    } else {
        alert("El nombre no es valida\nNo debe de tener caracteres especiales ni tener espacios vacios");
    }
}
//validacion para crear carpeta
function nuevaCarpetaView() {
    if (path !== null && path !== '/compartido') {
        document.getElementById('formularioCarpeta').style.display = "block";
    } else {
        alert('No puedes crear una carpeta en este directorio');
    }

}
function cerrarFormularioCarpeta() {
    document.getElementById('formularioCarpeta').style.display = "none";
}

document.getElementById('nuevaCarpetaForm').addEventListener("submit", function (event) {
    event.preventDefault();
    const nombreCarpeta = document.getElementById("nombreCarpeta").value;
    document.getElementById("nombreCarpeta").value = "";
    document.getElementById("formularioCarpeta").style.display = "none";
});
//Nuevo archivo html
document.getElementById("nuevohtml").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("extension").textContent = "html"
    document.getElementById("extension").value = "html"
    document.getElementById("modal").style.display = "block";
});
//Nuevo archivo de texto
document.getElementById("nuevotxt").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("extension").textContent = "txt"
    document.getElementById("extension").value = "txt"
    document.getElementById("modal").style.display = "block";
});
//cierra la vista de crear archivo
function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("fileName").value = "";
    document.getElementById("fileContent").value = "";

}
//Agrega un nuevo archivo
document.getElementById("txtForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const fileName = document.getElementById("fileName").value;
    const fileContent = document.getElementById("fileContent").value;
    const ext = document.getElementById("extension").value;
    if (path === null || path === '/compartido' || path === '/papelera') {
        alert("En  esta carpeta no se pueden crear archivos");
        closeModal();
    } else {
        await crearArchivo(fileName, fileContent, ext);
        await mostrarCarpetas();
    }

    document.getElementById("extension").value = "";

    closeModal();
});

//funciones parta compartir
function funcionCompartir(nombreArchivo) {
    document.getElementById('formularioCompartir').style.display = "block";
    document.getElementById('nombreArchivoCompartir').textContent = nombreArchivo;
}
function cerrarCompartir() {
    document.getElementById('formularioCompartir').style.display = "none";
    document.getElementById('nombreCompartir').value = "";
}

function compartirArchivo() {
    const nombreArchivo = document.getElementById('nombreArchivoCompartir').textContent;
    const usuarioCompartir = document.getElementById('nombreCompartir').value;
    if (usuarioCompartir !== nombre) {
        compartir(nombreArchivo, usuarioCompartir);
        cerrarCompartir();
    } else {
        alert("No te puedes compartir tu propio archivo");
    }
}
document.getElementById('compartirForm').addEventListener('submit', function (event) {
    event.preventDefault();
    compartirArchivo();
});

//valida que tipo para decidir accion
async function validarTipo(tipo, nombreCarpeta) {

    if (tipo === "Carpeta") {
        const algo = await obtenerPathCarpeta(nombreCarpeta);
        mostrarCarpetas();
    } else {
        mostrarContenidoArchivo(nombreCarpeta, "mostrar");
    }
}
//agregar a las filas los tipo archivo
function agregarFilaArchivo(nombreArchivo, tipo, fecha, fechaMod) {
    const tbody = document.getElementById('cuerpoTabla');
    const fila = document.createElement('tr');

    const celdaBotonNombre = document.createElement('td');
    const boton = document.createElement('button');
    boton.textContent = nombreArchivo;
    boton.id = nombreArchivo; // Asignar el nombre como id al botón
    boton.onclick = function () {
        validarTipo(tipo, nombreArchivo);
    };
    celdaBotonNombre.appendChild(boton);

    const celda1 = document.createElement('td');
    celda1.textContent = tipo;

    const celdaBotonEditar = document.createElement('td');
    const botonEditar = document.createElement('button');
    botonEditar.textContent = "Editar";
    botonEditar.onclick = function () {
        editarArchivo(nombreArchivo);

    };
    celdaBotonEditar.appendChild(botonEditar);
    //boton para copiar
    const celdaBotonCopiar = document.createElement('td');
    const botonCopia = document.createElement('button');
    botonCopia.textContent = "Copiar";
    botonCopia.onclick = function () {
        console.log('Copiaras:  ', nombre);
    };
    celdaBotonCopiar.appendChild(botonCopia);
    //boton para mover
    const celdaBotonMover = document.createElement('td');
    const botonMover = document.createElement('button');
    botonMover.textContent = "Mover";
    botonMover.onclick = function () {
        setDatos(path,nombreArchivo,"Archivo")
    };
    celdaBotonMover.appendChild(botonMover);
    //boton para elimiar
    const celdaBotonEliminar = document.createElement('td');
    const botonElimina = document.createElement('button');
    botonElimina.textContent = "Eliminar";
    botonElimina.onclick = function () {
        moverPapelera(nombreArchivo);
    };
    celdaBotonEliminar.appendChild(botonElimina);
    //Espacio para compartir 
    const compartir = document.createElement('td');
    const botonCompartir = document.createElement('button');
    botonCompartir.textContent = "Compartir";
    botonCompartir.onclick = function () {
        funcionCompartir(nombreArchivo);
    };
    compartir.appendChild(botonCompartir);
    //fecha de creacion
    const fechaCrear = document.createElement('td');
    fechaCrear.textContent = fecha;

    const fechaModi = document.createElement('td');
    fechaModi.textContent = fechaMod;

    fila.appendChild(celdaBotonNombre);
    fila.appendChild(celda1);
    fila.appendChild(celdaBotonEditar);
    fila.appendChild(celdaBotonCopiar);
    fila.appendChild(celdaBotonMover);
    fila.appendChild(celdaBotonEliminar);
    fila.appendChild(compartir);
    fila.appendChild(fechaCrear);
    fila.appendChild(fechaModi);

    tbody.appendChild(fila);
    localStorage.removeItem('token')
}


//agrega filas a una tabla de tipo carpetas
function agregarFilaCarpeta(nombre, tipo, fecha, fechaMod) {
    const tbody = document.getElementById('cuerpoTabla');
    const fila = document.createElement('tr');

    const celdaBotonNombre = document.createElement('td');
    const boton = document.createElement('button');
    boton.textContent = nombre;
    boton.id = nombre; // Asignar el nombre como id al botón
    boton.onclick = function () {
        validarTipo(tipo, nombre);
    };
    celdaBotonNombre.appendChild(boton);

    const celda1 = document.createElement('td');
    celda1.textContent = tipo;
    //Aun falta para cambiar cuando sean carpetas

    const celdaBotonEditar = document.createElement('td');
    celdaBotonEditar.textContent = "    ";
    //boton para copiar
    const celdaBotonCopiar = document.createElement('td');
    if (path === null) {
        celdaBotonCopiar.textContent = ""
    } else {
        const botonCopia = document.createElement('button');
        botonCopia.textContent = "Copiar";
        botonCopia.onclick = function () {
            console.log('Copiaras:  ', nombre);
        };
        celdaBotonCopiar.appendChild(botonCopia);
    }
    //boton para mover
    const celdaBotonMover = document.createElement('td');
    if (path === null) {

    } else {
        const botonMover = document.createElement('button');
        botonMover.textContent = "Mover";
        botonMover.onclick = function () {
            setDatos(path, nombre, "Carpeta");
        };
        celdaBotonMover.appendChild(botonMover);
    }

    //boton para elimiar
    const celdaBotonEliminar = document.createElement('td');
    if (path === null) {

    } else {
        const botonElimina = document.createElement('button');
        botonElimina.textContent = "Eliminar";
        botonElimina.onclick = function () {
            moverDirectrioPapelera(path,nombre);
        };
        celdaBotonEliminar.appendChild(botonElimina);
    }

    //Espacio para compartir 
    const compartir = document.createElement('td');
    compartir.textContent = "";
    //fecha de creacion
    const fechaCrear = document.createElement('td');
    fechaCrear.textContent = fecha;

    const fechaModi = document.createElement('td');
    fechaModi.textContent = fechaMod;

    fila.appendChild(celdaBotonNombre);
    fila.appendChild(celda1);
    fila.appendChild(celdaBotonEditar);
    fila.appendChild(celdaBotonCopiar);
    fila.appendChild(celdaBotonMover);
    fila.appendChild(celdaBotonEliminar);
    fila.appendChild(compartir);
    fila.appendChild(fechaCrear);
    fila.appendChild(fechaModi);

    tbody.appendChild(fila);
    localStorage.removeItem('token')
}
async function limpiarTabla() {
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    cuerpoTabla.innerHTML = ''; // Eliminar todo el contenido del cuerpo de la tabla
}
/**fin acciones tabla ----------------------------------------- */
function editarArchivo(nombreArchivo) {
    mostrarContenidoArchivo(nombreArchivo, "editar")
}
//movimiento de las vistas
function RegresarVista() {

    if (path === null) {

    } else if (path === "/raiz") {
        path = null;
    } else if (path === "/compartido") {
        path = null;
        document.getElementById("divTabla").style.display = "block";
        document.getElementById("divCompartido").style.display = "none"
    } else if (path === "/papelera") {
        path = null;
        terminarPapelera();
    } else {
        let nuevo = path.lastIndexOf('/');
        if (nuevo !== -1) {
            const antesDiagonal = path.substring(0, nuevo);
            path = antesDiagonal;
        }
    }
    mostrarCarpetas();
}


async function mostrarCarpetas() {
    limpiarTabla();
    if (path === null) {
        document.getElementById("path").textContent = "";
        obtenerCarpetas();
    } else {
        if (path === "/compartido") {
            document.getElementById("divTabla").style.display = "none";
            document.getElementById("divCompartido").style.display = "block"
            obtenerArchivosCompartido()
        } else if (path === "/papelera") {
            vistaPapelera();
        } else {
            document.getElementById("path").textContent = path;
            obtenerArchivos();
            obtenerCarpetas();
        }
    }

}
/**funciones compartido
 * -----------------------------------------------------------------------------
 */
async function obtenerArchivosCompartido() {
    const cuerpoTabla = document.getElementById('cuerpoCompartido');
    cuerpoTabla.innerHTML = '';
    const url = `${urlGeneral}/consultaCompartido?autor=${nombre}`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const data = await response.json();
            alert(data.message);
        } else {
            const data = await response.json();
            recorrerCompartido(data);
        }
    } catch (error) {
        console.log('Ocurrio un erro')
    }
}
function recorrerCompartido(data) {
    data.forEach(objeto => {
        const id = objeto._id;
        const nombreArchivo = objeto.nombre;
        const extension = objeto.extension;
        const contenido = objeto.contenido;
        const propietario = objeto.propietario;
        const creacion = new Date(objeto.creacion);
        let opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

        let fechaEnEspanol = creacion.toLocaleDateString('es-ES', opcionesFecha);
        let horaEn24Formato = creacion.toLocaleTimeString('es-ES', opcionesHora);

        let fechaCompartido = `Fecha: ${fechaEnEspanol}, Hora: ${horaEn24Formato}`;
        console.log(id);
        agregarFilaCompartir(id, nombreArchivo, extension, contenido, propietario, fechaCompartido);
    });
}
async function agregarFilaCompartir(id, nombre, extension, contenido, propietario, fechaCompartido) {
    const tbody = document.getElementById('cuerpoCompartido');
    const fila = document.createElement('tr');

    const celdaBotonArchivo = document.createElement('td');
    const boton = document.createElement('button');
    boton.textContent = nombre;
    boton.onclick = function () {
        document.getElementById("MostrarInformacion").textContent = `Nombre archivo: ${nombre}.${extension}`;
        document.getElementById("muestra").value = contenido;
        document.getElementById("mostrarArchivo").style.display = "block";
    }
    celdaBotonArchivo.appendChild(boton);
    fila.appendChild(celdaBotonArchivo);

    // Tipo
    const tipo = document.createElement('td');
    tipo.textContent = extension;
    fila.appendChild(tipo);

    // Compartido por
    const compartidoPor = document.createElement('td');
    compartidoPor.textContent = propietario;
    fila.appendChild(compartidoPor);

    // Fecha
    const fechaC = document.createElement('td');
    fechaC.textContent = fechaCompartido;
    fila.appendChild(fechaC);

    // Botón Eliminar
    const eliminar = document.createElement('td');
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';  // Corrección aquí
    botonEliminar.onclick = async function () {
        await eliminarCompartido(id);
        obtenerArchivosCompartido();
    };
    eliminar.appendChild(botonEliminar);
    fila.appendChild(eliminar);

    tbody.appendChild(fila);
}

function resetforms() {
    document.getElementById("newP").style.display = "none";
}
// Conecciones a la Api
async function crearArchivo(nombreNuevo, contenido, extension) {
    const url = `${urlGeneral}/agregarArchivo`;
    const Creacion = new Date();

    const data = {
        nombre: nombreNuevo,
        autor: nombre,
        extension: extension,
        contenido: contenido,
        enPapelera: false,
        pathPadre: path,
        creacion: Creacion.toISOString(), // Convertir a formato ISO para enviar al servidor
        modificacion: Creacion.toISOString() // Convertir a formato ISO para enviar al servidor
    }

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const salida = await res.json();
            alert(salida.message);
        } else {
            alert(`Archivo: ${nombreNuevo}.${extension} creado con éxito`);
        }
    } catch (error) {
        console.error(error); // Registrar el error en la consola

    }
}
//Eliminar compartido
async function eliminarCompartido(id) {
    const url = `${urlGeneral}/eliminarCompartido?id=${id}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Puedes incluir otros encabezados según sea necesario
            }
        });

        if (!response.ok) {
            const data = await response.json();
            alert(data.message);
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        console.error('Error al eliminar compartido:', error);
        alert('Ocurrió un error al eliminar');
    }
}


//Actualizar Contra 
async function actualizar(nuevaContra) {
    const url = `${urlGeneral}/actualizarContra`;
    const data = {
        nombre: nombre,
        nuevaContra: nuevaContra
    }
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(data => {
            alert("Contrase;a actualizada con exito");
            resetforms();
        })
        .catch(error => {
            console.error('error', error);
        })
}
//obtener las carpetas
async function obtenerCarpetas() {
    const url = `${urlGeneral}/consultaDirectorioPathAutor?autor=${nombre}&path=${path}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {

        }
        const data = await response.json();
        procesarInfo(data);
    } catch (error) {

    }
}
//obtiene el path de una carpeta
async function obtenerPathCarpeta(nombreCarpeta) {
    const url1 = `${urlGeneral}/consultanombreAutor?nombreCarpeta=${nombreCarpeta}&autor=${nombre}&path=${path}`;
    try {
        const response = await fetch(url1);
        if (!response.ok) {

        }
        const data = await response.json();
        console.log('el nuevo path', data.path);
        path = data.path;
    } catch (error) {

    }
}
//obtiene archivos
async function obtenerArchivos() {
    const url2 = `${urlGeneral}/consultaArchivoPathAutor?autor=${nombre}&path=${path}`;
    try {
        const response = await fetch(url2);
        if (!response.ok) {

        }
        const data = await response.json();
        procesarInfo(data);

    } catch (error) {
        console.log('Ocurrio un erro')
    }
}
// mueve archivos a la papelera
async function moverPapelera(nombreArchivoEliminar) {
    const url = `${urlGeneral}/moverPapelera`;
    const data = {
        path: path,
        autor: nombre,
        nombre: nombreArchivoEliminar
    }
    console.log(data);
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const respuesta = res.json();
        alert(respuesta.message);
    } else {
        alert(`Archivo: ${nombreArchivoEliminar} eliminado con exito`);
    }
    mostrarCarpetas();
}
//Muestra el contenido de un archivo
async function mostrarContenidoArchivo(nombreArchivo, accion) {
    const url2 = `${urlGeneral}/mostrarContenido?path=${path}&autor=${nombre}&nombre=${nombreArchivo}`
    try {
        const response = await fetch(url2);
        if (!response.ok) {

        }
        const data = await response.json();
        if (accion === "mostrar") {
            const mostrarInformacion = `Nombre del archivo: ${nombreArchivo}.${data.extension}`;
            document.getElementById("MostrarInformacion").textContent = mostrarInformacion;
            document.getElementById("muestra").value = data.contenido;
            document.getElementById("mostrarArchivo").style.display = "block";
        }
        if (accion === "editar") {
            document.getElementById("nombreArchivoEditar").textContent = nombreArchivo;
            document.getElementById("extensionArchivoEditar").textContent = '.' + data.extension;
            document.getElementById("areaEditar").value = data.contenido;
            document.getElementById("editarArchivo").style.display = "block";
        }



    } catch (error) {
        console.log('Ocurrio un erro')
    }
}
//Cambia para editar
async function cambioEdicio(nombreArchivo, nuevoContenido) {
    const url = `${urlGeneral}/actualizarContenido`
    const data = {
        path: path,
        nombre: nombreArchivo,
        autor: nombre,
        contenido: nuevoContenido
    }
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        const respuesta = res.json();
        alert(respuesta.message);
    } else {
        alert(`Archivo: ${nombreArchivo} actualizado con exito`);
    }
    await mostrarCarpetas();

}
//Crear nueva carpetas
async function nuevaCarpeta(nuevoNombre) {
    const pathIn = path + '/' + nuevoNombre;
    console.log(pathIn);
    const pathPadre = path;
    const enPapelera = false;
    const autor = nombre;
    const creacio = new Date();

    const url1 = `${urlGeneral}/agregarDirectorio`;
    const data = {
        nombre: nuevoNombre,
        path: pathIn,
        pathPadre: pathPadre,
        enPapelera: enPapelera,
        autor: autor,
        FechaDeCreacion: creacio
    };
    try {
        const res = await fetch(url1, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const salida = await res.json();
            alert(salida.message); // Se debe tratar la respuesta del servidor
        } else {
            alert(`Carpeta: ${nuevoNombre} creado con éxito`); // Uso de plantilla de cadena
        }
    } catch (error) {
        console.error(error); // Registrar el error en la consola
        // Podrías también usar alert para mostrar el error
    }
    await mostrarCarpetas();
}
async function compartir(nombreArchivo, usuarioCompartir) {
    const url = `${urlGeneral}/compartir`;
    const data = {
        nombreArchivo: nombreArchivo,
        autor: nombre,
        path: path,
        compartir: usuarioCompartir
    };
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const salida = await res.json();
            alert(salida.message);
        } else {
            const salida = await res.json();
            alert(salida.message);
        }
    } catch (error) {
        console.error(error);
    }

}
function procesarInfo(data) {
    data.forEach(objeto => {
        if (objeto.extension) {
            console.log('Archivo');
            let nombre = objeto.nombre;
            let Fecha = new Date(objeto.creacion);
            let opcionesFechaNuev = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let opcionesHoraNuev = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

            let fechaEspa1 = Fecha.toLocaleDateString('es-ES', opcionesFechaNuev);
            let horaEn24FormatoNuev = Fecha.toLocaleTimeString('es-ES', opcionesHoraNuev);

            let fechaCrear = `Fecha: ${fechaEspa1}, Hora: ${horaEn24FormatoNuev}`;

            let modificacion = new Date(objeto.modificacion);
            let opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

            let fechaEnEspanol = modificacion.toLocaleDateString('es-ES', opcionesFecha);
            let horaEn24Formato = modificacion.toLocaleTimeString('es-ES', opcionesHora);

            let fechaModificacion = `Fecha: ${fechaEnEspanol}, Hora: ${horaEn24Formato}`;

            let tipo = objeto.extension;
            agregarFilaArchivo(nombre, tipo, fechaCrear, fechaModificacion);
        } else {
            console.log('Carpeta');
            let nombre = objeto.nombre;
            let Fecha = new Date(objeto.FechaDeCreacion);
            let opcionesFechaNuev = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let opcionesHoraNuev = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

            let fechaEspa1 = Fecha.toLocaleDateString('es-ES', opcionesFechaNuev);
            let horaEn24FormatoNuev = Fecha.toLocaleTimeString('es-ES', opcionesHoraNuev);

            let fechaCrear = `Fecha: ${fechaEspa1}, Hora: ${horaEn24FormatoNuev}`;
            let tipo = "Carpeta";
            agregarFilaCarpeta(nombre, tipo, fechaCrear, null);
        }
    });
}
function accionCerrar() {
    localStorage.removeItem('token')
    window.location.href = "login.html";
}