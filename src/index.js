const express = require(`express`);
const { start } = require(`./configs/database.configs`);
const app = express();
start();
const port = 4000;
app.get('/',(req,res) =>{
  res.send('Inicio');  
})

//Inicio del servidor 
const server = app.listen(port,() =>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})
