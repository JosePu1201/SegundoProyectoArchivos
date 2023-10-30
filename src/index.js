const express = require(`express`);
const { start } = require(`./configs/database.configs`);
const app = express();
const usuarioRuter = require('./ruters/usuariosInsertar.ruters');
app.use(express.json());
app.use(express.urlencoded({extended : false}));
start();
const port = 4000;
app.get('/',(req,res) =>{
  res.send('Inicio');  
})
app.use('/api',usuarioRuter);
//Inicio del servidor 
const server = app.listen(port,() =>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})
