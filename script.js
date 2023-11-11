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
    autor: "usuario2",
    FechaDeCreacion: new Date('2023-10-25')
});
db.directorios.insertOne({
    nombre: "compartido",
    path: "/compartido",
    pathPadre: null,
    enPapelera: false,
    autor: "usuario2",
    FechaDeCreacion: new Date('2023-10-25')
});
db.directorios.insertOne({
    nombre: "papelera",
    path: "/papelera",
    pathPadre: null,
    enPapelera: false,
    autor: "usuario2",
    FechaDeCreacion: new Date('2023-10-25')
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
    nombre: "raiz",
    path: "/raiz",
    pathPadre: null,
    enPapelera: false,
    autor: "user1",
    FechaDeCreacion: new Date('2023-10-25')
});
db.directorios.insertOne({
    nombre: "compartido",
    path: "/compartido",
    pathPadre: null,
    enPapelera: false,
    autor: "user1",
    FechaDeCreacion: new Date('2023-10-25')
});
db.directorios.insertOne({
    nombre: "compartido",
    path: "/compartido",
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
db.directorios.insertOne({
    nombre: "nuevo1",
    path: "/raiz/nuevo1",
    pathPadre: "/raiz",
    enPapelera: false,
    autor: "user",
    FechaDeCreacion: new Date('2023-10-27')
});
db.directorios.insertOne({
    nombre: "nuevo2",
    path: "/raiz/nuevo2",
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

db.compartido.insertOne({
    nombre: "Gaby",
    autor: "user1",
    extension: "html",
    contenido: "examen parcial mecánica de fluidos \n\njajajjajaj\n",
    propietario: "user",
    pathPadre: "/compartir",
    creacion: "2023-11-11T04:12:53.000Z"
});