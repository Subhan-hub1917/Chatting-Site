import { useContext, useEffect  } from "react";
import { auth, db } from "../firebase";
import CallComponent from './CallComponent'
import Message from "./Message";
import { collection,  onSnapshot,  } from "firebase/firestore";
import MyContext from "../MyContext";
const ChattingLounge = (props) => {
    
    const {messages,setMessages,chatid,receiver,setChatID,receiverPhoto}=props


        const MessagesRef = collection(db, chatid);
      
        onSnapshot(MessagesRef, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.timestamp,
                })));  
        });
        
    
    useEffect(() => {
        window.scrollTo('100','100')
      },[]);
       
      
        const handleBackspace=()=>{
            setChatID("Messages")
        }
        
  
        return ( 
        <div  className={`${chatid!=="Messages" ?"w-sm-100 w-lg-50 main-container width-container rounded-end d-flex flex-column border-start":"d-none d-lg-block w-lg-50 main-container width-container rounded-end d-flex flex-column border-start"} `}>
        <div className="bg-purple d-flex  align-items-center justify-content-start">
            <div className="bg-purple d-flex w-50 text-center align-items-center justify-content-between">
            <h4 className="text-start" onClick={handleBackspace}><i className="bi bi-backspace"></i></h4>
            <p className="text-center">{receiver}</p>
            <p className="ms-5">
                <CallComponent chatid={chatid}/>
            </p>
        </div>
        </div>
            <div className='flex-grow-1 p-4 m-1 custom-scrollbar overflow-auto'>                
                {
                    messages
                    .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds)
                    .map((ms)=>
                    (
                        <div className={` ${auth.currentUser.uid===ms.Senderid? 'd-flex justify-content-start flex-row-reverse':'d-flex justify-content-start'} `} >
                            <img src={auth.currentUser.photoURL} alt="DP" height={35} width={35} className={`${auth.currentUser.uid===ms.Senderid? 'rounded-circle  ':'d-none'}`}/>
                            <img src={receiverPhoto} alt="DP" height={35} width={35} className={`${auth.currentUser.uid===ms.Senderid? 'd-none':'rounded-circle'}`}/>
        
                            <div className={` ${ auth.currentUser.uid===ms.Senderid? 'd-flex flex-column text-center bg-purple fit-content pt-2 pe-4 ps-2 m-1 message-sender':'d- flex text-center bg-light text-purple fit-content pt-2 ps-4 pe-2 m-1 message-reciever'} `}>
                                <h4>{ms.Message}</h4>
                               { ms.messagephoto && <img src={ms.messagephoto} className="mt-2 pb-2 rounded " height={350} width={700} alt="messagePhoto"/> }
                               { ms.messagevideo && <video src={ms.messagevideo} className="mt-2 pb-2 rounded " height={350} width={700} alt="messagevideo" controls /> }
                            <p className="text-sm ms-5">{ms.timestamp && ms.timestamp.toDate().toLocaleString()}</p>
                            </div>
                            
                        </div>
                    )) 
                } 
            </div>
    
        <Message chatid={chatid} />
    </div>
     );
}
 
export default ChattingLounge;