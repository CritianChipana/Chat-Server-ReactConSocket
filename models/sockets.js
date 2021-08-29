


class Sockets {


    constructor( io ){

        this.io = io;
        this.socketsEvents();
      
    }

    socketsEvents(){
        // On Connection
        this.io.on('connection', ( socket ) => { 

            // Escuchamos el evento
            socket.on("mensaje-to-server", ( data )=>{
                console.log(data);
        
                this.io.emit( 'mensaje-from-server', data );
        
            });
        
         });
    }

}


module.exports = Sockets;