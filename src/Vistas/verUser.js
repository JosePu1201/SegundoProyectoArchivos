const form = document.getElementById('login-form');
form.addEventListener('submit', validarUsuario);

async function validarUsuario(evento) {
    evento.preventDefault();
    const nombre = document.getElementById('username').value;
    const contra = document.getElementById('password').value;

    const url = `http://localhost:4000/api/obtenerUsurio?usuario=${nombre}&contra=${contra}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            alert("El usuario o contraseña no son validos ")
        }

        const data = await response.json();
        procesarData(data);
    } catch (error) {
        console.error('Ocurrió un error:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
}

function procesarData(data) {
    if (data.rol === 'Empleado') {
        alert(data.usuario);
        window.location.href = `vistaEmpleado.html?nombre=${data.usuario}`; // Redirigir a la página para empleados
    } else if (data.rol === 'Admin') {
        console.lodb.archivos.insertOne({
            nombre: "nuevoArchivoPrueba",
            autor: "user",
            extension: "txt",
            contenido: "Esto es el nuevo contenido de mi archivo txt",
            enPapelera: false,
            pathPadre: "/raiz",
            creacion: new Date('2023-10-26'),
            modificacion: new Date ('2023-10-26T12:00:00.000Z')
        });
        db.archivos.insertOne({
            nombre: "H",
            autor: "user",
            extension: "html",
            contenido: "Esto es el nuevo contenido de mi archivo html",
            enPapelera: false,
            pathPadre: "/raiz",
            creacion: new Date('2023-10-28'),
            modificacion: new Date ('2023-10-29T12:00:00.000Z')
        });g('es admin x');
        window.location.href = 'vistaAdmin.html'; // Redirigir a la página para administradores
    } else {
        console.log('Rol desconocido');
        // Manejar un rol desconocido o mostrar un mensaje al usuario
    }
}
