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
                        <div className="nav-link-div d-flex align-items-center">
                            <FontAwesomeIcon icon={faHouse}/>
                            <p className="m-0">Dashboard</p>
                        </div>
                    </NavLink>
                </ul>
                <ul>
                    <NavLink to='/roster'>
                        <div className="nav-link-div d-flex align-items-center">
                            <FontAwesomeIcon icon={faCalendar}/>
                            <p className="m-0">Roster</p>
                        </div>
                    </NavLink>
                </ul>
                <ul>     
                    <NavLink to='/swap'>
                        <div className="nav-link-div d-flex align-items-center">
                            <FontAwesomeIcon icon={faArrowsRotate}/>
                            <p className="m-0">Flight Swap</p>
                        </div>
                    </NavLink>
                </ul>
                <ul>
                    <NavLink to='/airborne'>
                        <div className="nav-link-div d-flex align-items-center">
                            <FontAwesomeIcon icon={faPaperPlane}/>
                            <p className="m-0">Airborne</p>
                        </div>
                    </NavLink>
                </ul>
                <ul>
                    <NavLink to='/rosterbuilder'>
                        <div className="nav-link-div d-flex align-items-center">
                            <FontAwesomeIcon icon={faEnvelope}/>
                            <p className="m-0">Roster Builder</p>
                        </div>
                    </NavLink>
                </ul>
            </nav>
        </div>
        </>
    )
}