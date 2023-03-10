import SideBar from "../../components/SideBar/SideBar"
import Nav from "../../components/Nav/Nav"
import AirborneContainer from "../../components/AirborneContainer/AirborneContainer"
import { AppContext } from "../../context/AppContext"
import { useContext } from "react"
import Login from "../Login/Login"

export default function Airborne (){

    //CONTEXT
    const {globalUser} = useContext(AppContext)

    return(

        <>  
            {globalUser?
                <>
                <SideBar/>
                <Nav/>
                <AirborneContainer/>
                </>
                :
                <Login/>
            }
        </>
    
    )
}