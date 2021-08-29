
// Servidor de Expres
const express = require('express');
const http = require('http');
const socketio  =require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        
        // HTTP SERVER
        this.server = http.createServer(this.app);

        //CONFIGURQACIONES DE SOCKET
        this.io = socketio(  this.server, { /* Configuraciones - mantener la latencia. timeout-etc */ });
    }

    middlewares(){
        // Desplegar el directorio Publico
        this.app.use( express.static( path.resolve( __dirname, '../public'  ) ) )

    }

    configurarSockets(){

        new Sockets( this.io );

    }

    execute(){
        //Inicializar Middlewares
        this.middlewares();

        //Inicializando Sockets
        this.configurarSockets()

        //Inicialisar el server
        this.server.listen(this.port,()=>{
            console.log("El servidor ya esta corriendo en el puerto: ->", this.port);
        });
    }


}

module.exports= Server;