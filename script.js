const { db } = require("./src/Modelos/usuario")

use CloudArch
db.createCollection('usuarios')
db.createCollection('archivos')
db.createCollection('directorios')

db.usuarios.insertOne({
    usuario: 'user',
    Contra: '1234',
    rol: 'Empleado'
});
db.usuarios.insertOne({
    usuario: 'user1',
    Contra: '1234',
    rol: 'Empleado'
});
db.usuarios.insertOne({
    usuario: 'usuario2',
    Contra: '1234',
    rol: 'Admin'
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
db.archivos.insertOne({
    nombre: "nuevoArchivoPrueba",
    autor: "usuario1"
    extension: "txt",
    contenido: "Esto es el nuevo contenido de mi archivo txt",
    enPapelera: false,
    pathPadre: "/raiz",
    creacion: "2023-10-10",
    modificacion: "2023-10-11"
});
db.archivos.insertOne({
    nombre: "H",
    autor: "usuario1"
    extension: "html",
    contenido: "Esto es el nuevo contenido de mi archivo txt",
    enPapelera: false,
    pathPadre: "/raiz",
    creacion: "2023-10-10",
    modificacion: "2023-10-11"
});