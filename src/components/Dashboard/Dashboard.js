import { useContext, useEffect, useState , useCallback} from "react"
import { AppContext } from "../../context/AppContext"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import NextFlight from "../Widgets/NextFlight"
import GroundActivity from "../Widgets/GroundActivity"
import TotalHours from '../Widgets/TotalHours'
import SwapRequests from "../Widgets/SwapRequests"
import Forecast from "../Widgets/Forecast"

export default function Dashboard () {

    //STATES
    const [isLoading, setIsLoading] = useState(true)
    const [nextFlight , setNextFlight] = useState(null)

    //CONTEXT
    const {globalUser, currentRoster} = useContext(AppContext)

    //FUNCTIONS
    const getNextFlight = useCallback(() => {

        //Gets current date in seconds
        const currentSeconds = Math.round(Date.now()/1000)

        //Returns array with days where 'active' and 'flightActivity' are true (discards off and ground duty days)
        const activeFlights = currentRoster.data.activity.filter(flight=>{
            return(flight.active && flight.flightActivity)
        })
        
        //Returns array with upcoming flights
        const futureFlights = activeFlights.filter(flight=>{
            // console.log('flight departure '+new Date (flight.departure.time.seconds*1000))
            // console.log('current time is '+ new Date (currentSeconds*1000))
            return(flight.departure.time.seconds >= currentSeconds)
        })
        
        //Sorts future flight by departure timestamp and sets state with next flight
        const upcomingFlight = futureFlights.sort((a,b)=> a.departure.seconds - b.departure.seconds)[0]
        
        // console.log(upcomingFlight)
        setNextFlight(upcomingFlight)


    },[currentRoster])
    
    useEffect(() => {

        //Checks if there is a current roster to render it's info
        if(currentRoster){

            setIsLoading(false)
            if(Object.keys(currentRoster).length > 0){

                //If the currentRoster object is not empty, calls getNextFlight function to get info for widgets 
                getNextFlight()
            }
        }
    },[currentRoster, getNextFlight]);
    // return(
    //     <Rosters/>
    // )
    return(
        <>
        <div className="dashboard-main-container container col-10">
            {isLoading ? 
                <Loader/>
                :
                <>
                {/* <NextFlight flight={nextFlight}/> */}
                
                {Object.keys(currentRoster).length === 0 ?

                   //If currentRoster object is empty, show error message
                   <ErrorMessage title='Mayday! There are no rosters to show.'message='Please contact your manager.'/>
            
                    :

                    //If currentRoster contains information, renders dashboard widgets:
                    <>
                    <h2>Welcome {globalUser.username}</h2>
                    <div className="widget-main-container row">
                        <NextFlight flight={nextFlight}/>
                        <Forecast flight={nextFlight}/>
                    </div>
                    <div className="widget-main-container row">
                        <GroundActivity roster={currentRoster.data.activity}/>
                        <TotalHours roster={currentRoster.data.activity}/>
                        <SwapRequests/>
    
                    </div>
                    </>
                }
                </>
            }
        </div>
        </>
    )
}