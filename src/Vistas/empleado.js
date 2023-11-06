const parametro = new URLSearchParams(window.location.search)
const nombre = parametro.get('nombre');
let path = "";
//llama a la configuracion inicial
configInicial();
//CAmbio de contrasenea
document.getElementById("actualizar").addEventListener("click", function() {
    document.getElementById("modal").style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
});


document.getElementById("passwordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const newPassword = document.getElementById("newPassword").value;
    console.log('la nueva contrase;a xD');
});
//Nuevo archivo de texto
document.getElementById("nuevotxt").addEventListener("click", function() {
    document.getElementById("modal").style.display = "block";
});

function closeModal() {
    localStorage.removeItem('token');
    document.getElementById("modal").style.display = "none";
}

document.getElementById("txtForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const fileName = document.getElementById("fileName").value;
    const fileContent = document.getElementById("fileContent").value;
    console.log("Nombre del Archivo: " + fileName);
    console.log("Contenido del Archivo: " + fileContent);
    closeModal();
});
//funcion que configura todo al inicio
function configInicial(){

}
//agrega filas a una tabla
function agregarFila(numFila) {
    const tbody = document.getElementById('cuerpoTabla');
    const fila = document.createElement('tr');

    const celda1 = document.createElement('td');
    celda1.textContent = 'Celda 1';

    const celda2 = document.createElement('td');
    celda2.textContent = 'Celda 2';

    const celdaBoton = document.createElement('td');
    const boton = document.createElement('button');
    boton.textContent = 'Presionar';
    boton.onclick = function() {
        console.log('Botón presionado en la fila ' + numFila);
    };

    celdaBoton.appendChild(boton);

    fila.appendChild(celda1);
    fila.appendChild(celda2);
    fila.appendChild(celdaBoton);

    tbody.appendChild(fila);
}
function accionCerrar(){
    localStorage.removeItem('token')
    window.location.href = "login.html";
}
function agregar() {
    for (let i = 1; i <= 10; i++) {
        agregarFila("asdas");
    }
};
