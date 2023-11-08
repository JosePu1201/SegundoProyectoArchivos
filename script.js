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
    autor: "user",
    FechaDeCreacion: new Date('2023-10-25')
});
db.directorios.insertOne({
    nombre: "compartido",
    path: "/campartido",
    pathPadre: null,
    enPapelera: false,
    autor: "user",
    FechaDeCreacion: new Date('2023-10-25')
});
db.directorios.insertOne({
    nombre: "nuevo",
    path: "/raiz/nuevo",
    pathPadre: "/raiz",
    enPapelera: false,
    autor: "user",
    FechaDeCreacion: new Date('2023-10-27')
});
db.archivos.insertOne({
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
});