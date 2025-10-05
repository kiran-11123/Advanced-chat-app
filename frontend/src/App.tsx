import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 const[message,setMessage] = useState("");
 const[socket , setSocket] = useState();


 function sendMessage(){
       
     if(message.trim()!=""){
         
         //@ts-ignore
         socket.send(message) ;
     }
 }


 useEffect(()=>{

 const ws = new WebSocket("http://localhost:8081")
 //@ts-ignore
 setSocket(ws);


 } , [])

  return (
   <div className='text-center bg-red-400'>
    hi there
        
   </div>
  )
}

export default App
