import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8081 });




let allSockets = new Map();

wss.on("connection", (socket) => {
    console.log("New client connected");


    socket.on("message", (message) => {

        //type , message are the inputs 


        //@ts-ignore
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === "join") {


            if (!allSockets.has(parsedMessage.payload.room)) {

                allSockets.set(parsedMessage.payload.room, []);

            }

            const name = parsedMessage.payload.name;

            allSockets.get(parsedMessage.payload.room).push({
                socket,
                name

            })
         


        }


      else if (parsedMessage.type === "chat") {

            //const currentUserRoom = allSockets.find((x) =>x.socket === socket);

            const message = parsedMessage.payload.message;
            let currentUserRoom = null;

            for (const [roomId, roomSockets] of allSockets.entries()) {

                //@ts-ignore
                const SocketEntry = roomSockets.find(entry => entry.socket === socket)
                if (SocketEntry) {
                    currentUserRoom = roomId;
                    break; // Found it—exit the loop
                }
            }

            if (!currentUserRoom) {
                console.error(`Socket not found in any room`);
                return; // Or send an error back to the socket
            }


            const users = allSockets.get(currentUserRoom);

            
          
            if (users.length == 0) {
                console.error("No one Present in the room")
            }

            users.map((e: any) => {
                console.log("This is e" , e);
                e.socket.send(JSON.stringify({ message: parsedMessage.payload.message, name: e.name  }))
            })

            console.log(users);



        }

      


        

    });
});
