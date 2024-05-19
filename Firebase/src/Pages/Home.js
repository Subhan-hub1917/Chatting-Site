import {  useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase'
import { collection, onSnapshot} from 'firebase/firestore';
import Users from '../Components/Users';
import Chat from '../Components/Chat';
import MyContext from '../MyContext';
const Home = () => {
    const {reciept,setReciet,setSender}=useContext(MyContext)
    const [chatid,setChatID]=useState('Messages')
    const [messages,setMessages]=useState([])
    const [receiver,setReceiver]=useState('')
    const [receiverPhoto,setReceiverPhoto]=useState('')
    
    
    
    
    useEffect(()=>{
        const MessagesRef=collection(db,chatid);                                
        onSnapshot(MessagesRef, (snapshot) => {
            setMessages(snapshot.docs.map((message) => ({ ...message.data(), id: message.id })));
          });
    })
    
    const handleChat=async(receverid,userName,userPhoto)=>{
        setReceiver(userName)  
        setReceiverPhoto(userPhoto)
        const user1=auth.currentUser.uid
        const user2=receverid
        setSender(user1)
        setReciet(user2)
        if (user1.localeCompare(user2) < 0) {
            const actualChatID =  user1+ "_" + user2;
            setChatID(actualChatID)
          } else {
            const actualChatID = user2 + "_" + user1;
            setChatID(actualChatID)
          }
    }
    

    return ( 
        <section className="main-container custom-height bg-black text-light" >

            <div className="d-flex ">    
            
                    <Users handleChat={handleChat} auth={auth} chatid={chatid}     />
                    <Chat messages={messages} setMessages={setMessages} chatid={chatid} receiver={receiver} setChatID={setChatID} receiverPhoto={receiverPhoto}  />
            
            </div>
        </section>
     );
}
 
export default Home;