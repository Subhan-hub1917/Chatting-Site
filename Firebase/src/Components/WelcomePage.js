import { auth } from "../firebase";
import AnimationChatting from "./AnimationChatting";
import AutoTyping from "./Autotyping";

const WelcomePage = () => {
    return ( 

        <div className="d-none d-lg-block w-lg-50  rounded-end text-center  pt-5 p-3">
            <div >
                <img src={auth.currentUser.photoURL} alt="UserImage" className="rounded-circle" height={100} width={100}/>
                <h2>Welcome {auth.currentUser.displayName}</h2>
                <AutoTyping/>
                <p>Remember that it's generally recommended to use stable, unique identifiers instead of array indices as key prop values, especially if the order of the items can change. Using stable identifiers helps React efficiently update the components and maintain their identity across updates.</p>
                <AnimationChatting/>
            </div>
        </div>

     );
}
 
export default WelcomePage;