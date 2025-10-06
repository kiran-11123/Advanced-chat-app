import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateRoom from './components/createRoom'

function App() {

  const[modelOpen , setOpenModel] = useState(false);
  const[socket , SetSocket] = useState();
  const[message , setMessage] = useState("");
  const[data , setData] = useState([{"name":"System" , "message":"Welcome to Chat App" }]);
  function SendMessage(){
       
    if(message.trim()!=""){
      //@ts-ignore  

      socket.send(JSON.stringify({
          type: "chat",
          payload: {
              message: message
          }
      }));

      console.log("Message Sent" ,data);;
    }
  }




  useEffect(()=>{

    const ws = new WebSocket("http://localhost:8081");
    
    //@ts-ignore
    SetSocket(ws);

    ws.onmessage = (message)=>{

      const messageData = JSON.parse(message.data);
     setData(m => [...m, { "name": messageData.name, "message": messageData.message }]);
      console.log(data);
    }

  } ,[])


  return (

    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4'>

       <div className='w-full max-w-2xl rounded-sm shadow-sm bg-gray-200 h-[95vh] p-2'>

        <div className='flex flex-col justify-between'>

           <CreateRoom  socket={socket} open={modelOpen} Onclose={()=>{
        setOpenModel(false) 
       }}  />

          <div className='flex items-center justify-between font-mono font-bold mb-1'>
           <div className='px-3 py-2 bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-900'>
             Chat App
           </div>

           <div>
           
             <button className='px-3 py-2 bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-900' onClick={(e)=>setOpenModel(true)}  >Enter Room</button>
           </div>
          </div>

          <div className='h-[80vh] bg-black w-full rounded-md p-2 mb-2 text-white overflow-auto' >

            <div className="chat-container  ">
  {data.map((item, index) => (
    <div key={index} className=" py-1 w-full  mb-1 rounded-lg p-2">
     
     <strong>{item.name} :</strong> {item.message}
      
    </div>
  ))}
</div>

          </div>

          <div  className='flex items-center justify-between'>
          <input title="input" type="text"  className='w-full px-4 py-2 rounded-lg shadow-lg' onChange={(e)=>setMessage(e.target.value)}/>
          <button className='px-4 py-2 bg-green-700 text-white rounded-lg  shadow-lg hover:bg-green-900' onClick={SendMessage}>Send</button>

        </div>

        </div>

   

        

       </div>


    </div>
   
  )
}

export default App
