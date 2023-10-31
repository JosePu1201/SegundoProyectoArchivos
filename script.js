const { db } = require("./src/Modelos/usuario")

use CloudArch
db.createCollection('usuarios')
db.createCollection('archivos')
db.createCollection('directorios')

db.usuarios.insertOne({
    usuario: 'usuario1',
    contra: '1234',
    role: 'empleado'
});

db.usuarios.insertOne({
    usuario: 'usuario2',
    contra: '1234',
    role: 'admin'
});

db.directorios.insertOne({
    nombre: "raiz",
    path: "/raiz",
    pathPadre: null,
    enPapelera: false,
    autor: "Usuario1",
    FechaDeCreacion: Date,
});

db.archivos.insertOne({
    nombre: "nuevoArchivo",
    extension: "txt",
    contenido: "Esto es el nuevo contenido de mi archivo txt",
    enPapelera: false,
    pathPadre: "/raiz",
    creacion: "2023-10-10",
    modificacion: "2023-10-11"
});