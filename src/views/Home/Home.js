import Nav from "../../components/Nav/Nav"
import SideBar from "../../components/SideBar/SideBar"
import Dashboard from "../../components/Dashboard/Dashboard"
import Login from "../Login/Login"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"

export default function Home () {


    //CONTEXT
    const {globalUser} = useContext(AppContext)

    return(
        <>
            { globalUser ? 
                <>
                    <SideBar/>
                    <Nav/>
                    <Dashboard/>

                </> : 
                <Login/>
            }
        </>
    )
}