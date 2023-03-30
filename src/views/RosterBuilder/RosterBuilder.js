import { useContext, useState } from "react"
import RosterSettings from "../../components/RosterSettings/RosterSettings"
import Nav from "../../components/Nav/Nav"
import SideBar from "../../components/SideBar/SideBar"
import { AppContext } from "../../context/AppContext"
import Login from "../Login/Login"

export default function RosterBuilder (){

    //STATES
    const [rosterSettings, setRosterSettings] = useState(null)

    //CONTEXT
    const {globalUser} = useContext(AppContext)


    return(
        <>  
            {globalUser ?
                <>
                <SideBar/>
                <Nav/>
                {!rosterSettings?
                    <RosterSettings setRosterSettings={setRosterSettings}/>
                    :
                    <>
                    <h3>You are now creating a new Roster for user:</h3>
                    <p>{rosterSettings.user.username+' '+rosterSettings.user.lastname}</p>
                    <h3>For period:</h3>
                    <p>{rosterSettings.period.month+1+'/'+rosterSettings.period.year}</p>
                    <h3>Aircrafts:</h3>
                    {rosterSettings.equipment.map((plane,i)=>{
                        return(
                            <p key={i}>{plane.manufacturer + ' '+ plane.model+'-' + plane.series}</p>
                        )
                    })
                    }
                    </>
                }
                </>
                :
                <Login/>
            }
        </>
    )
}