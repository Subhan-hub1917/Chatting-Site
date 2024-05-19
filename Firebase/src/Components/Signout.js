import { signOut } from "firebase/auth"
import { auth, provider } from "../firebase"
import { useContext } from "react"
import MyContext from "../MyContext"

const Signout = () => {
    const {setExist}=useContext(MyContext)

    const handleSignOut = async () => {
        try
        {
            await signOut(auth,provider)
            setExist(false)
        }
        catch(err)
        {
            console.error(err)
        }
        }   

    return ( 
        <div className=' d-flex text-center justify-content-center cursor-pointer align-items-center p-4 border-dark border rounded ' onClick={handleSignOut}>
        <h3><i className='bi bi-google'></i></h3>
        <h5 className='ms-3'>SignOut</h5>
        </div>
     );
}
 
export default Signout;