import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowsRotate, faCalendar, faPaperPlane  , faEnvelope} from "@fortawesome/free-solid-svg-icons"

export default function SideBar () {
    return(
        <>
        <div className="sidebar-main-container col-2 d-flex flex-column align-items-center">
            <h3>CREW VIEW <span>✈</span></h3>
            <nav className="nav-container d-flex flex-column">
                <ul>
                    <NavLink to='/'>
                        <FontAwesomeIcon icon={faHouse}/>
                        Dashboard
                    </NavLink>
                </ul>
                <ul>
                    <NavLink to='/'>
                        <FontAwesomeIcon icon={faCalendar}/>
                         Roster
                    </NavLink>
                </ul>
                <ul>
                    <NavLink to='/'>
                        <FontAwesomeIcon icon={faArrowsRotate}/>
                        Flight Swap
                    </NavLink>
                </ul>
                <ul>
                    <NavLink to='/'>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                        Airborne
                    </NavLink>
                </ul>
                <ul>
                    <NavLink to='/'>
                        <FontAwesomeIcon icon={faEnvelope}/>
                        Messages
                    </NavLink>
                </ul>
            </nav>
            <span className="nav-ball ball-1"></span>
            <span className="nav-ball ball-2"></span>
        </div>
        </>
    )
}