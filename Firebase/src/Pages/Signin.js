import {  useContext, useState } from 'react'
import { auth,db,provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { addDoc, collection,onSnapshot } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const SignIn = ({setUserName}) => {
    // const {socket,setSocketID}=useContext(MyContext)
    const [users]=useState([])
    const UsersRef=collection(db,"Users");
    const navigate=useNavigate()
    ////////////////////////////////////     here i am collecting data in realtime    //////////////////////////////////////////
    
        onSnapshot(UsersRef,(snapshot) =>{
            snapshot.docs.forEach((doc)=>{
                users.push({...doc.data(), ID:doc.id})
            })
        }   
        )
      
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////

      const handleSignIn = async () => {
          try
          {
              await signInWithPopup(auth, provider)
              
              const checkEmail = auth.currentUser.email;
              const userExists = users.some((user) => user.Email === checkEmail);
              
              if (userExists) {
                    setUserName(userExists.Name)
                    navigate('/Home')
            }
            else
            {
                await addDoc(UsersRef,{
                    Name: auth.currentUser.displayName,
                    Photo: auth.currentUser.photoURL,
                    ID:auth.currentUser.uid,
                    Email:auth.currentUser.email
                })
                
                setUserName(userExists.Name)
                navigate('/Home')
            }
        }
        catch(err)
        {
            console.error(err)
        }
    }
    return (
        <section className='mt-5 width-container'>
            <div className=' w-100 bg-primary rounded' >
                <div className=' d-flex justify-content-center cursor-pointer align-items-center p-4 border-dark border rounded ' onClick={handleSignIn}>
                    <h3><i className='bi bi-google'></i></h3>
                    <h5 className='text-center'>SignIn With Google</h5>
                </div>
            </div>  
        </section> 
     );
}
 
export default SignIn;