import SideBar from "../../components/SideBar/SideBar"
import Nav from "../../components/Nav/Nav"
import SwapContainer from "../../components/SwapContainer/SwapContainer"
import Login from "../Login/Login"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"

export default function FlightSwap (){

    //CONTEXT
    const {globalUser} = useContext(AppContext)

    
    return(
        <>
        {globalUser?
            <>
                <SideBar/>
                <Nav/>
                <SwapContainer/>
            </>
        :
            <Login/>
        }
        </>
    )
}