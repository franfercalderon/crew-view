import app from "../../fb"
import { getAuth, signOut } from "firebase/auth"

//Initalize Firebase
const auth = getAuth(app)

export default function Nav () {
    return(
        <>
        <button onClick={()=>{signOut(auth)}}>Sign Out</button>
        </>
    )
}