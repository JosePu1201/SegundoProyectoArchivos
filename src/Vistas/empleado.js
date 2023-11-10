

const parametro = new URLSearchParams(window.location.search)
const nombre = parametro.get('nombre');
const urlGeneral = `http://localhost:4000/api`;
let path = null;
//llama a la configuracion inicial
configInicial();
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

document.getElementsByClassName("close")[0].addEventListener("click", function () {
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
function nuevaCarpetaView() {
    document.getElementById("formularioCarpeta").style.display = "block";
}

function cerrarFormularioCarpeta() {
    document.getElementById("formularioCarpeta").style.display = "none";
}

document.getElementById("nuevaCarpetaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const nombreCarpeta = document.getElementById("nombreCarpeta").value;

    // Aquí puedes enviar el nombre de la carpeta a tu API para crearla
    // Por ejemplo, utilizando fetch o XMLHttpRequest

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

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("fileName").value = "";
    document.getElementById("fileContent").value = "";

}
document.getElementById("txtForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const fileName = document.getElementById("fileName").value;
    const fileContent = document.getElementById("fileContent").value;
    const ext = document.getElementById("extension").value;
    if (path === null || path === '/campartido') {
        alert("En  esta carpeta no se pueden crear archivos");
        closeModal();
    } else {
        await crearArchivo(fileName, fileContent, ext);
        await mostrarCarpetas();
    }

    document.getElementById("extension").value = "";

    closeModal();//<!-- Aquí se generará el contenido dinámico -->
});
//funcion que configura todo al inicio
async function configInicial() {
    document.getElementById("NombreUsuario").textContent = nombre;
    mostrarCarpetas();
}
async function validarTipo(tipo, nombreCarpeta) {

    if (tipo === "Carpeta") {
        console.log('entra aca al hacer click en carpeta');
        const algo = await obtenerPathCarpeta(nombreCarpeta);
        console.log('Sigue aca?', path);
        mostrarCarpetas();


    } else {
        mostrarContenidoArchivo(nombreCarpeta, "mostrar");
    }
}

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
        console.log('Moveras:  ', nombreArchivo);
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
        console.log('Compartiras: ', nombre);
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
//agrega filas a una tabla
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
        console.log('Moveras:  ', nombre);
    };
    celdaBotonMover.appendChild(botonMover);
    //boton para elimiar
    const celdaBotonEliminar = document.createElement('td');
    const botonElimina = document.createElement('button');
    botonElimina.textContent = "Eliminar";
    botonElimina.onclick = function () {
        console.log('Eliminaras:  ', nombre);
    };
    celdaBotonEliminar.appendChild(botonElimina);
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
function editarArchivo(nombreArchivo) {
    mostrarContenidoArchivo(nombreArchivo, "editar")
}
function RegresarVista() {

    if (path === null) {
        
    } else if (path === "/raiz") {
        path = null;
    } else if (path === "/campartido") {
        path = null;
    } else {
        let nuevo = path.lastIndexOf('/');
        if (nuevo !== -1) {
            const antesDiagonal = path.substring(0, nuevo);
            path = antesDiagonal;
        }
    }
    mostrarCarpetas();
}
function accionCerrar() {
    localStorage.removeItem('token')
    window.location.href = "login.html";
}
async function limpiarTabla() {
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    cuerpoTabla.innerHTML = ''; // Eliminar todo el contenido del cuerpo de la tabla
}

async function mostrarCarpetas() {
    console.log('Esntra Aqui');
    limpiarTabla();
    if (path === null) {
        document.getElementById("path").textContent = "";
        obtenerCarpetas();
    } else {
        document.getElementById("path").textContent = path;
        obtenerArchivos();
        obtenerCarpetas();
    }

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
            alert(salida.message); // Se debe tratar la respuesta del servidor
        } else {
            alert(`Archivo: ${nombreNuevo}.${extension} creado con éxito`); // Uso de plantilla de cadena
        }
    } catch (error) {
        console.error(error); // Registrar el error en la consola
        // Podrías también usar alert para mostrar el error
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
async function obtenerPathCarpeta(nombreCarpeta) {
    const url1 = `${urlGeneral}/consultanombreAutor?nombreCarpeta=${nombreCarpeta}&autor=${nombre}`;
    try {
        const response = await fetch(url1);
        if (!response.ok) {

        }
        const data = await response.json();
        path = data.path;
    } catch (error) {

    }
}

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

}
function procesarInfo(data) {

    console.log(data);
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
