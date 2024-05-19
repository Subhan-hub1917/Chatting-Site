import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../firebase";

const Message = (props) => {
    const {chatid}=props
    const [msg,setMsg]=useState('')
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    };

    const handleClearFile = () => {
      setSelectedFile(null);
    };
  
  const handleMessage = async (e) => {
        e.preventDefault();
        const MessagesRef = collection(db, chatid);
        if(msg==="" && selectedFile===null){
          return;
        }

      //   if (selectedFile && msg==='') { 
      //     const storageRef = ref(storage, 'chat-files/' + selectedFile.name);
      //     try{
      //       await  uploadBytes(storageRef, selectedFile)
      //       const downloadURL = await getDownloadURL(storageRef);
      //       console.log('File Selected');

      //       await addDoc(MessagesRef, {
      //         Message: msg,
      //         messagephoto: downloadURL,
      //         Senderid: auth.currentUser.uid,
      //         SenderName: auth.currentUser.displayName,
      //         timestamp: Timestamp.now()
      //       });
            
      //       console.log('Message was sent');
      
      //     }
      //     catch(err)
      //     {
      //       console.error(err.message)
      //     }
      //   setMsg('')
      // }

      if (selectedFile && msg === '') {
        const storageRef = ref(storage, 'chat-files/' + selectedFile.name);
      
        try {
          // Upload the file to Firebase Storage
          await uploadBytes(storageRef, selectedFile);
      
          // Get the download URL of the uploaded file
          const downloadURL = await getDownloadURL(storageRef);
      
          let isVideo = false;
          // Check if the URL indicates a video file based on its extension
          const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
          if (['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(fileExtension)) {
            isVideo = true;
          }
      
          // Create a message object with the appropriate fields
          const messageObject = {
            Message: msg,
            messagevideo: isVideo ? downloadURL : '', // If it's a video, store the URL; otherwise, leave it empty
            messagephoto: isVideo ? '' : downloadURL, // If it's not a video, store the URL; otherwise, leave it empty
            Senderid: auth.currentUser.uid,
            SenderName: auth.currentUser.displayName,
            timestamp: Timestamp.now()
          };
      
          // Add the message object to Firestore
          await addDoc(MessagesRef, messageObject);
      
          console.log('Message was sent');
        } catch (err) {
          console.error(err.message);
        }
      
        setMsg('');
      }
      

      if (msg && selectedFile===null) {
        try{
         
          await addDoc(MessagesRef, {
            Message: msg,
            messagephoto: "",
            messagevideo: "",
            Senderid: auth.currentUser.uid,
            SenderName: auth.currentUser.displayName,
            timestamp: Timestamp.now()
          });
          
        }
        catch(err)
        {
          console.error(err.message)
        }
      setMsg('')
      }
    if(msg && selectedFile) {
      const storageRef = ref(storage, 'chat-files/' + selectedFile.name);
      try{
        await  uploadBytes(storageRef, selectedFile)
        const downloadURL = await getDownloadURL(storageRef);
        console.log('File Selected');
        await addDoc(MessagesRef, {
          Message: msg,
          messagephoto: downloadURL,
          Senderid: auth.currentUser.uid,
          SenderName: auth.currentUser.displayName,
          timestamp: Timestamp.now()
        });
    
        console.log('Message was sent');
  
      }
      catch(err)
      {
        console.error(err.message)
      }
    setMsg('')
  }
    };

      
return ( 
    <div className='w-100 bg-dark'>
      {selectedFile && (
        <button type="button" onClick={handleClearFile} className="width-container border-0 bg-purple text-center">
          Clear
        </button>
      )}
        <form onSubmit={handleMessage} className='d-flex border-1 border-light'style={{"width":"100%"}}>
            <input
                id="myInput"
                type='text'
                onChange={(e)=>setMsg(e.target.value)}
                autoComplete="off"
                autoSave="off"
                placeholder='Enter Your Message' 
                className='rounded-start focus-none bg-purple-light border-0' style={{"height":"50px" , "width":"90%"}} 
            />
            <label htmlFor="fileinput" className={`${selectedFile===null?"text-light pt-2 text-center rounded-end bg-purple":"text-light pt-2 text-center rounded bg-purple-light"}`} style={{"width":"5%"}}><i className="bi bi-image"></i></label>
            <input
            id="fileinput"
            type='file'
            onChange={handleFileSelect}
            className="d-none"
            />
            
            <button type='submit' className="bg-purple border-0" style={{"width":"05%"}}><i className='bi bi-send text-light bg-purple' style={{"width":"100%"}}></i></button>
            
        </form>

    </div>
     );
}
 
export default Message;