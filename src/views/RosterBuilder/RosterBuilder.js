import { useContext } from "react"
import BuilderContainer from "../../components/BuilderContainer/BuilderContainer"
import Nav from "../../components/Nav/Nav"
import SideBar from "../../components/SideBar/SideBar"
import { AppContext } from "../../context/AppContext"
import Login from "../Login/Login"

export default function RosterBuilder (){

    //CONTEXT
    const {globalUser} = useContext(AppContext)

    return(
        <>  
            {globalUser ?
                <>
                <SideBar/>
                <Nav/>
                <BuilderContainer/>
                </>
                :
                <Login/>
            }
        </>
    )
}