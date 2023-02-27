import { useState , useEffect} from "react"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import FlightCard from "../FlightCard/FlightCard"
import { useContext } from "react"
import { AppContext } from '../../context/AppContext'


export default function RosterContainer (){

    //STATES
    const [isLoading, setIsLoading] = useState(true)
    const [publishedDate, setPublishedDate] = useState(null)

    //Gets roster from context
    const {currentRoster} = useContext(AppContext)

    useEffect(() => {

        if(currentRoster){

            setPublishedDate(new Date(currentRoster.data.published.seconds*1000))
        }
       
        
    }, [currentRoster])

    useEffect(() => {

        if(publishedDate) setIsLoading(false)

    }, [publishedDate])

    return(
        <div className="roster-container-main col-10">
            {isLoading?
                <Loader/>
                :
                <>
                {!currentRoster?
                
                <ErrorMessage title='Mayday! There are no rosters to show.'message='Please contact your manager.'/>
                :
                <>
                    <h2>{new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(currentRoster.data.published.seconds*1000))}'s Roster</h2>
                    <div className="roster-container-header row d-flex ">
                        {/* <div className="container d-flex"> */}
                            <p className="col-2 d-flex justify-content-center align-items-center">Date</p>
                            <p className="col-2 d-flex justify-content-center align-items-center">Activity</p>
                            <p className="col-1 d-flex justify-content-center align-items-center">From</p>
                            <p className="col-1 d-flex justify-content-center align-items-center">To</p>
                            <p className="col-1 d-flex justify-content-center align-items-center">Departs</p>
                            <p className="col-1 d-flex justify-content-center align-items-center">Arrives</p>
                            <p className="col-2 d-flex justify-content-center align-items-center">Check In</p>
                            <p className="col-2 d-flex justify-content-center align-items-center">Flight Swap</p>
                        {/* </div> */}
                    </div>
                    <div className="roster-container">
                        {currentRoster.data.activity.map((day, idx)=>{
                            return(
                                <FlightCard day={day} key={idx}/>
                            )
                        })}

                    </div>

                </>
                
                }
                </>
            }
        </div>
    )
}