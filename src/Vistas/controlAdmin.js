function nuevoUsuario() {
    document.getElementById('formularioNuevoUsuario').style.display = "block";
}
function cerrarCrear() {
    document.getElementById('formularioNuevoUsuario').style.display = "none";
    document.getElementById('NombreUsuarioNuevo').value = "";
    document.getElementById('ContraUsuarioNuevo').value = "";
}
async function crearUser(event) {
    event.preventDefault();
    const nombre = document.getElementById('NombreUsuarioNuevo').value;
    const contra = document.getElementById('ContraUsuarioNuevo').value;
    const espacios = /\s/; // Expresión regular para verificar espacios en blanco

    if (contra.length === 0 || espacios.test(contra)) {
        alert("La contraseña no debe contener espacios en blanco.");
    } else {
        if (nombre.length === 0 || espacios.test(nombre)) {
            alert('el nombre no puede tener espacios en blano o estar vacio');
        } else {
            await nuevoUsuarioAgregar(nombre, contra);
            cerrarCrear();
        }

    }
}
//Crear nuevo usuario
async function nuevoUsuarioAgregar(nombre, contra) {
    const url = `${urlGeneral}/agregarUsuario`;
    const data = {
        usuario: nombre,
        Contra: contra,
        rol: "Empleado"
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
            const salida = await res.json();
            alert(salida.message);
        }
    } catch (error) {
        console.error(error); // Registrar el error en la consola

    }

}
//vistas en papelera
function vistaPapelera() {
    document.getElementById('divPapelera').style.display = "block";
    document.getElementById('divTabla').style.display = "none";
    const vaciar = document.getElementById('cuerpoPapelera');
    vaciar.innerHTML = '';
    mostrarArchivosPapelera();
}

function terminarPapelera() {
    document.getElementById('divPapelera').style.display = "none";
    document.getElementById('divTabla').style.display = "block";
}
async function mostrarArchivosPapelera() {
    const url = `${urlGeneral}/archivosEnPapelera`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            // Manejar el caso en que la respuesta no sea exitosa
            console.error('Error al obtener archivos de la papelera');
        } else {
            const data = await res.json();
            procesarInfoPapelera(data);
        }
    } catch (error) {
        // Manejar errores de red o cualquier otra excepción
        console.error('Error en la solicitud:', error);
    }
}


function procesarInfoPapelera(data) {

    data.forEach(Object => {
        const nombre = Object.nombre;
        const autor = Object.autor;
        const tipo = Object.extension;
        const contenido = Object.contenido;
        agregarFilaPapelera(nombre, autor, tipo, contenido);
    });
}
function agregarFilaPapelera(nombre, autor, tipo, contenido) {
    const tbody = document.getElementById('cuerpoPapelera');
    const fila = document.createElement('tr');

    const mostrar = document.createElement('td');
    const boton = document.createElement('button');
    boton.textContent = nombre;
    boton.onclick = function () {
        const mostrarInformacion = `Nombre del archivo: ${nombre}.${tipo}`;
        document.getElementById("MostrarInformacion").textContent = mostrarInformacion;
        document.getElementById("muestra").value = contenido;
        document.getElementById("mostrarArchivo").style.display = "block";
    };
    mostrar.appendChild(boton);

    const celdaTipo = document.createElement('td');
    celdaTipo.textContent = tipo;

    const celdaAutor = document.createElement('td');
    celdaAutor.textContent = autor;

    fila.appendChild(mostrar);
    fila.appendChild(celdaTipo);
    fila.appendChild(celdaAutor);
    tbody.appendChild(fila);
}


