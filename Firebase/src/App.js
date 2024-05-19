import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import SignIn from './Pages/Signin';
import {  useState } from 'react';
import MyContext from './MyContext';
import Home from './Pages/Home';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import VideoPage from './Components/VideoPage.js';
import VideoChat from './Pages/VideoChat.js';
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

import io from "socket.io-client"
const socket = io.connect('http://localhost:5000')

const App = () => {

    const [userName,setUserName]=useState('User')
    const [reciept,setReciet]=useState('')
    const [sender,setSender]=useState('')
    
    const [socketID,setSocketID]=useState(null)
    const [exist,setExist]=useState(false)
    const [display,setDisplay]=useState(false)
    
    const handleDisplay=()=>{
        setDisplay(true)
        console.log(display)
    }
    onAuthStateChanged(auth, (currentUser)=>{
        setExist(currentUser)
        
    });
    return(
        <>
        <BrowserRouter>
            <MyContext.Provider value={{display,setDisplay,handleDisplay,reciept,setReciet,sender,setSender}}>
            <Routes>
                <Route exact path='/Chat' element={<SignIn setUserName={setUserName}/>} />
                <Route  path='/Home' element={<Home/>} />
                <Route  path='/VideoPage/:room' element={<VideoPage userName={userName}/>  } />
                <Route  path='/VideoChat' element={<VideoChat/>}/>
            </Routes>
                </MyContext.Provider>
        </BrowserRouter>
        </>
    );
    
}

export default App;
