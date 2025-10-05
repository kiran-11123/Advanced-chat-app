import { useState } from "react"
import CrossIcon from "../icons/CrossIcon"

//@ts-ignore
export default function CreateRoom({ socket, open, Onclose }) {

    const [roomCode, setRoomCode] = useState("");
    const [name, setName] = useState("");

    function LoginRoom() {

        try {

            if (roomCode.trim() !== "") {

                socket.send(JSON.stringify({
                    type: "join",
                    payload: {
                        room: roomCode,  // Or 'roomId' if that's what your server expects
                        name: name
                    }
                }));

            }
            else {
                alert("Enter Room Code...")
            }

        }
        catch (er) {
            alert(er);
        }
        finally {
            Onclose();
        }




    }

    return (
        <div>
            {open && (
                <div className="w-full flex justify-center h-screen bg-slate-500 fixed opacity-60 top-0 left-0 rounded-md">
                    <div className="flex flex-col justify-center p-4 rounded-md ">

                        <div className="bg-white opacity-100 rounded-md max-w-xl min-w-96">

                            <div className="flex justify-end cursor-pointer p-2 text-black w-full">
                                <div onClick={Onclose} className="bg-red-900 rounded-full">
                                    <CrossIcon />
                                </div>
                            </div>

                            <div className=" flex flex-col items-center">





                                <input type="text" className="px-4 py-2  mb-2 border-2 border-black rounded-lg" placeholder="Enter Name..." title="room code" onChange={(e) => setName(e.target.value)} />

                                <input type="text" placeholder="Enter code" className="px-4 py-2 mb-2 border-2 border-black rounded-lg" title="room code" onChange={(e) => setRoomCode(e.target.value)} />

                                <button className="px-3 py-2 bg-green-900 text-white rounded-lg mb-2" onClick={LoginRoom}> Enter</button>




                            </div>


                        </div>



                    </div>


                </div>


            )}





        </div>

    )


}