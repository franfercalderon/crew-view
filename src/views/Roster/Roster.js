import Nav from "../../components/Nav/Nav"
import SideBar from "../../components/SideBar/SideBar"
import RosterContainer from "../../components/RosterContainer/RosterContainer"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import Login from "../Login/Login"

export default function Roster () {

    //CONTEXT
    const {globalUser} = useContext(AppContext)

    return(
        <>
            { globalUser ? 
                <>
                    <Nav/>
                    <RosterContainer/>
                    <SideBar/>

                </> 
                : 
                <Login/>
            }
        </>
    )
}