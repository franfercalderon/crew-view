import app from "../../fb"
import { getAuth, signOut } from "firebase/auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

//Initalize Firebase
const auth = getAuth(app)

export default function Nav () {
    return(
        <>
        <div className="nav-main-container d-flex justify-content-end align-items-center">
            <Link to='/'>
                <div className='d-flex align-items-center btn-signout' onClick={()=>{signOut(auth)}}>
                    <p className="m-0">Sign Out</p>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className=''/>
                </div>
            </Link>
        </div>
        </>
    )
}