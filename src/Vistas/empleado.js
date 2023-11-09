

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
    if(path === null || path === '/campartido'){
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
async function agregarFila(nombre, tipo, fecha, fechaMod) {
    const tbody = document.getElementById('cuerpoTabla');
    const fila = document.createElement('tr');

    const celdaBotonNombre = document.createElement('td');
    const boton = document.createElement('button');
    boton.textContent = nombre;
    boton.id = nombre; // Asignar el nombre como id al botón
    boton.onclick = function () {
       validarTipo(tipo,nombre);
    };
    celdaBotonNombre.appendChild(boton);

    const celda1 = document.createElement('td');
    celda1.textContent = tipo;
    //Aun falta para cambiar cuando sean carpetas
    if(tipo === "Carpeta"){
        const celda2 = document.createElement('td');
        celda2.textContent = "    ";
        //boton para copiar
        const celdaBotonCopiar = document.createElement('td');
        const botonCopia = document.createElement('button');
        botonCopia.textContent = "Copiar";
        botonCopia.onclick = function(){
            console.log('Copiaras:  ',nombre);
        };
        celdaBotonCopiar.appendChild(botonCopia);
        //boton para mover
        const celdaBotonMover = document.createElement('td');
        const botonMover = document.createElement('button');
        botonMover.textContent = "Mover";
        botonMover.onclick = function(){
            console.log('Moveras:  ',nombre);
        };
        celdaBotonMover.appendChild(botonMover);
        //boton para elimiar
        const celdaBotonEliminar = document.createElement('td');
        const botonElimina = document.createElement('button');
        botonElimina.textContent = "Eliminar";
        botonElimina.onclick = function(){
            console.log('Eliminaras:  ',nombre);
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
        fila.appendChild(celda2);
        fila.appendChild(celdaBotonCopiar);
        fila.appendChild(celdaBotonMover);
        fila.appendChild(celdaBotonEliminar);
        fila.appendChild(compartir);
        fila.appendChild(fechaCrear);
        fila.appendChild(fechaModi);

    }else{

    }
   

    
 

    tbody.appendChild(fila);
}
function RegresarVista(){
    if(path === null){

    }else if(path === "/raiz"){
        path = null;
    }else if(path === "/campartido"){
        console.log('entra a esta funcion segun el path',path);
        path = null;
    }else{
        let nuevo = path.lastIndexOf('/');
        if(nuevo !== -1){
            const antesDiagonal = path.substring(0,nuevo);
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
    limpiarTabla();
    obtenerCarpetas();
    if(path === null){

    }else{
        console.log('asdassadas');
        obtenerArchivos();
    }
    
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
    const url2 = `http://localhost:4000/api/consultaArchivoPathAutor?autor=${nombre}&path=${path}`;
    try {
        const response = await fetch(url2);
        if (!response.ok) {

        }
        const data = await response.json();
        console.log(data);
        //procesarInfoArchivo(data);
    
    } catch (error) {
        console.log('Ocurrio un erro')
    }
}
function procesarInfoArchivo(data) {
    limpiarTabla();
    console.log(data);
    data.forEach(objeto => {
        let nombre = objeto.nombre;
        let Fecha = new Date(objeto.FechaDeCreacion);
        let tipo = "Carpeta"
        agregarFila(nombre,tipo,Fecha,null);

    });
}
function procesarInfo(data) {
    limpiarTabla();
    console.log(data);
    data.forEach(objeto => {
        let nombre = objeto.nombre;
        let autor = objeto.autor;
        let Fecha = new Date(objeto.FechaDeCreacion);
        let tipo = "Carpeta"
        agregarFila(nombre,tipo,Fecha,null);

    });
}
