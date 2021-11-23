const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require("../controllers/sockets.controller");
const { comprobarJWT } = require("../helpers/jwt");



class Sockets {


    constructor( io ){

        this.io = io;
        this.socketsEvents();
      
    }

    socketsEvents(){
        // On Connection
        this.io.on('connection', async ( socket ) => { 

           
            const [valido, uid] = comprobarJWT(socket.handshake.query["x-token"])

            if( !valido){
                console.log("Socket no identificado");
                return socket.disconnect();
            }

            await usuarioConectado(uid);

        //* Unir al usuario a una  sala de socket.io
            socket.join(uid); 

         //todo: VALIDAR EL JWT
            //? SI NO ESTA VALIDO DESCONECTAR
         //TODO:. SABER QUE USUARIO ESTA ACTIVO MEDIANTE EL UID

         //TODO: EMITIR TODOS LOS USUARIOS CONECTADOS
            this.io.emit('lista-usuarios',  await getUsuarios() )
         //TODO: DOCKET JOIN, UID

         //TODO: ESCUCHAR CUANDO EL CLIENTE MANDA UN MENSAJE
            //? MENSAJE PERSONAL
            socket.on("mensaje-personal", async (payload) =>{
                
                const mensaje = await grabarMensaje( payload );
                this.io.to(payload.para).emit('mensaje-personal',mensaje)
                this.io.to(payload.de).emit('mensaje-personal',mensaje)

            })


        //TODO: dISCONNECT
            //? MARCAR EN LA BD QUE EL USUARIO SE DESCONECTO
        //TODO eMITIR TODOS LOS USUARIOS CONECTADOS

        
        socket.on('disconnect', async ()=>{
           await usuarioDesconectado(uid);
           this.io.emit('lista-usuarios',  await getUsuarios() )

        })

         });
    }

}


module.exports = Sockets;