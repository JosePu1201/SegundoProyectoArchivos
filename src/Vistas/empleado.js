

const parametro = new URLSearchParams(window.location.search)
const nombre = parametro.get('nombre');
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

        } else {
            actualizar(contrasena);
        }
    }
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";

});

//Nuevo archivo de texto
document.getElementById("nuevotxt").addEventListener("click", function () {
    document.getElementById("modal").style.display = "block";
});

function closeModal() {
    localStorage.removeItem('token');
    document.getElementById("modal").style.display = "none";
}

document.getElementById("txtForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const fileName = document.getElementById("fileName").value;
    const fileContent = document.getElementById("fileContent").value;
    if(path === null){
        alert("En  esta carpeta no se pueden crear archivos");

    }else{

    }
    closeModal();//<!-- Aquí se generará el contenido dinámico -->
});
//funcion que configura todo al inicio
async function configInicial() {
    mostrarCarpetas();
}
function validarTipo(tipo,nombreCarpeta){
    if(tipo === "Carpeta"){
        obtenerPathCarpeta(nombreCarpeta);
        limpiarTabla();
        mostrarCarpetas();
    }else{

    }
}
//agrega filas a una tabla
async function agregarFila(nombre, autor, fecha, tipo,Modificacion) {
    const tbody = document.getElementById('cuerpoTabla');
    const fila = document.createElement('tr');

    const celdaBoton = document.createElement('td');
    const boton = document.createElement('button');
    boton.textContent = nombre;
    boton.id = nombre; // Asignar el nombre como id al botón
    boton.onclick = function () {
       validarTipo(tipo,nombre);
    };
    celdaBoton.appendChild(boton);

    const celda1 = document.createElement('td');
    celda1.textContent = autor;

    const celda2 = document.createElement('td');
    celda2.textContent = fecha;

    const celda3 = document.createElement('td');
    celda3.textContent = tipo;

    const celda4 = document.createElement('td');
    celda4.textContent = Modificacion;

    fila.appendChild(celdaBoton);
    fila.appendChild(celda3);
    fila.appendChild(celda1);
    fila.appendChild(celda2);

    tbody.appendChild(fila);
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
    limpiarTabla();
    obtenerCarpetas();
}
function resetforms(){
    document.getElementById("newP").style.display = "none";
}
// Conecciones a la Api

//Actualizar Contra 
async function actualizar(nuevaContra) {
    const url = 'http://localhost:4000/api/actualizarContra';
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
    const url = `http://localhost:4000/api/consultaDirectorioPathAutor?autor=${nombre}&path=${path}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {

        }
        const data = await response.json();
        procesarInfo(data);
    } catch (error) {

    }
}
async function obtenerPathCarpeta(nombreCarpeta){
    const url1 = `http://localhost:4000/api/consultanombreAutor?nombreCarpeta=${nombreCarpeta}&autor=${nombre}`;
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
    const url = `http://localhost:4000/api/consultaArchivosPathAutor?autor=${nombre}&path=${path}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {

        }
        const data = await response.json();

        await procesarInfo(data);
    } catch (error) {

    }
}
function procesarInfo(data) {
    limpiarTabla();
    data.forEach(objeto => {
        let nombre = objeto.nombre;
        let autor = objeto.autor;
        let Fecha = Date(objeto.autor);
        let tipo = "Carpeta"
        agregarFila(nombre, autor, Fecha, tipo,'');

    });
}
