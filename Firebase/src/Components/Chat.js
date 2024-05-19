import {  useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ChattingLounge from "./ChattingLounge";
import WelcomePage from "./WelcomePage";

const Chat = (props) => {
    const {messages,setMessages,chatid,receiver,setChatID,receiverPhoto}=props
    
    
    useEffect(()=>{
        const MessagesRef=collection(db,chatid);
        onSnapshot(MessagesRef, (snapshot) => {
            setMessages(snapshot.docs.map((message) => ({ ...message.data(), id: message.id })));
           });
    })
    

    return ( 
        <>
            {
                chatid!=="Messages"
                ?
                <ChattingLounge messages={messages} chatid={chatid} receiver={receiver} setMessages={setMessages} setChatID={setChatID} receiverPhoto={receiverPhoto} />
                :
                <WelcomePage/>
            }

        </>
     );
}
 
export default Chat;