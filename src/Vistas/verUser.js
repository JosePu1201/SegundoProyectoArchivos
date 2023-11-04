const form = document.getElementById('login-form') // Accede al formulario por su clase
form.addEventListener('submit', validarUsuario);
async function validarUsuario(evento){
    evento.preventDefault();
    nombre = document.getElementById('username').value;
    contra = document.getElementById('password').value;
    
    const url = `http://localhost:4000/api/obtenerUsurio?usuario=${nombre}&contra=${contra}`;
    console.log(url);
    await fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => procesarData(data))
}

function procesarData(data){
    if(data.rol === 'Empledo'){
        console.log('es un empleado');
        window.location.href = 'vistaEmpleado.html';
    }
    else{
        console.log('es admin x');
    }
}


