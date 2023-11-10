

const parametro = new URLSearchParams(window.location.search)
const nombre = parametro.get('nombre');
const urlGeneral = `http://localhost:4000/api`;
let path = null;
//llama a la configuracion inicial
configInicial();
//CAmbio de contrasenea
document.getElementById("actualizar").addEventListener("click", function () {
    document.getElementById("newP").style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", function () {
    document.getElementById("newP").style.display = "none";
});

document.getElementsByClassName("cerrarMuestra")[0].addEventListener("click",function(){
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
document.getElementById("txtForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const fileName = document.getElementById("fileName").value;
    const fileContent = document.getElementById("fileContent").value;
    const ext = document.getElementById("extension").value;
    if (path === null || path === '/campartido') {
        alert("En  esta carpeta no se pueden crear archivos");
        closeModal();
    } else {
        crearArchivo(fileName, fileContent, ext);
    }
    document.getElementById("extension").value = "";
    
    closeModal();//<!-- Aquí se generará el contenido dinámico -->
});
//funcion que configura todo al inicio
async function configInicial() {
    mostrarCarpetas();
}
function validarTipo(tipo, nombreCarpeta) {
    if (tipo === "Carpeta") {
        obtenerPathCarpeta(nombreCarpeta);
        limpiarTabla();
        mostrarCarpetas();
    } else {
        mostrarContenidoArchivo(nombreCarpeta);
    }
}
function agregarFilaArchivo(nombre, tipo, fecha, fechaMod) {
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

    const celdaBotonEditar = document.createElement('td');
    const botonEditar = document.createElement('button');
    botonEditar.textContent = "Editar";
    botonEditar.onclick = function () {
        console.log('Estas editando', nombre);
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
        console.log('Moveras:  ', nombre);
    };
    celdaBotonMover.appendChild(botonMover);
    //boton para elimiar
    const celdaBotonEliminar = document.createElement('td');
    const botonElimina = document.createElement('button');
    botonElimina.textContent = "Eliminar";
    botonElimina.onclick = function () {
        moverPapelera(nombre);
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
function RegresarVista() {
    if (path === null) {

    } else if (path === "/raiz") {
        path = null;
    } else if (path === "/campartido") {
        console.log('entra a esta funcion segun el path', path);
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

    if (path === null) {
        obtenerCarpetas();
    } else {
        console.log('asdassadas');
        obtenerCarpetas();
        obtenerArchivos();
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
        console.log(data);
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
        //console.log(data);
        procesarInfo(data);

    } catch (error) {
        console.log('Ocurrio un erro')
    }
}
async function moverPapelera(nombreArchivo) {
    const url = `${urlGeneral}/moverPapelera`;
    const data = {
        path: path,
        autor: nombre,
        nombre: nombreArchivo
    }
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(data => {
            alert("Movida a papelera con exito");
            mostrarCarpetas();
        })
        .catch(error => {
            console.error('error', error);
        })
}
async function mostrarContenidoArchivo(nombreArchivo){
    const url2 = `${urlGeneral}/mostrarContenido?path=${path}&autor=${nombre}&nombre=${nombreArchivo}`
    try {
        const response = await fetch(url2);
        if (!response.ok) {

        }
        const data = await response.json();
        const mostrarInformacion = `Nombre del archivo: ${nombreArchivo}.${data.extension}`;
        document.getElementById("MostrarInformacion").textContent = mostrarInformacion;
        document.getElementById("muestra").value = data.contenido;
        document.getElementById("mostrarArchivo").style.display = "block";
        
        console.log(data.contenido);

    } catch (error) {
        console.log('Ocurrio un erro')
    }
}
function procesarInfo(data) {
    limpiarTabla();
    console.log(data);
    data.forEach(objeto => {
        if (objeto.extension) {
            console.log('Archivo');
            let nombre = objeto.nombre;
            let Fecha = new Date(objeto.creacion);
            let modifiacion = new Date(objeto.modifiacion);
            let tipo = objeto.extension;
            agregarFilaArchivo(nombre, tipo, Fecha, modifiacion);
        } else {
            console.log('Carpeta');
            let nombre = objeto.nombre;
            let Fecha = new Date(objeto.FechaDeCreacion);
            let tipo = "Carpeta";
            agregarFilaCarpeta(nombre, tipo, Fecha, null);
        }
    });
}
