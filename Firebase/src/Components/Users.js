import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../firebase"

const Users = (props) => {

    const { handleChat,chatid}=props
    const [users,setUsers]=useState([])

    const UsersRef=collection(db,"Users");

    useEffect(()=>{
        onSnapshot(UsersRef, (snapshot) => {
            setUsers(snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })))
          });
    })

    return ( 
        <div className={`${chatid==="Messages" ?"w-sm-100 w-lg-50  main-container p-4 rounded-start custom-scrollbar overflow-auto bg-purple":"d-none d-lg-block w-lg-50  main-container p-4 rounded-start custom-scrollbar overflow-auto bg-purple"}`}>          
              <div className='d-flex mb-2 bg-black rounded-pill border' >
                    <form className='d-flex rounded-pill' style={{"width":"100%"}}>
                        <input className='focus-none rounded-pill text-light bg-black border-0' id="mySearch" style={{"height":"40px" , "width":"92%"}} placeholder="Seach..." />
                        <button className='bg-black text-light rounded-pill border-end border-0'  style={{"width":"08%"}}><i className='bi bi-search' style={{"width":"100%"}}></i></button>
                    </form>
              </div>
                {
                    users.map((user)=>( 
                        <div onClick={(e)=>handleChat(user.ID,user.Name,user.Photo)} className={`"p-2 mb-2 d-flex align-items-center bg-black text-light rounded cursor-pointer" ${auth.currentUser.uid===user.ID ? "d-none":"d"}`} key={user.ID} >
                                <img src={user.Photo} alt="DP" height={50} width={50} className='rounded-circle d-none d-md-block'/>
                                <h4 className='ms-md-3 ms-none'>{user.Name}</h4>
                            </div>                     
                    ))
                }
                    
        </div>
     );
}
 
export default Users;