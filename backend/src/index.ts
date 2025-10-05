import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8081 });




let allSockets = new Map();

wss.on("connection", (socket) => {
  console.log("New client connected");


  socket.on("message", (message) => {

    //type , message are the inputs 

    
    //@ts-ignore
    const parsedMessage = JSON.parse(message);

    if(parsedMessage.type === "join"){
         allSockets.push({

            //@ts-ignore
            socket,
            room : parsedMessage.payload.roomId,
         })

         if(allSockets.has(parsedMessage.payload.room)){
              
         }

        
    }

    if(parsedMessage.type==="chat"){

        //const currentUserRoom = allSockets.find((x) =>x.socket === socket);
        let currentUserRoom = null;
        
        for(let i=0;i<allSockets.length;i++){
            
            //@ts-ignore
            if(allSockets[i].socket === socket){
                 currentUserRoom = allSockets[i].room
            }
        }

        for(let i=0 ;i<allSockets.length ;i++){
              
            if(allSockets[i].room=== currentUserRoom){
                   
                allSockets[i].socket.send(parsedMessage.payload.message);
            }
        }

    }




    
  });
});
