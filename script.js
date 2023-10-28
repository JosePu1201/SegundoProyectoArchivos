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