import { useEffect, useState , useContext} from "react"
import { AppContext } from "../../context/AppContext"
export default function GroundActivity ({roster}) {

    const [activity, setActivity] = useState([])

    //Gets functions from context
    const{capitalizeWords, addZero} = useContext(AppContext)

    useEffect(()=>{

        // let activityArray = []
        
        const activeDays = roster.filter(day=>{
            return(day.active === true)
        })

        if(activeDays.length > 1){

            const groundDuty = activeDays.filter(day=>{
                return(day.flightActivity === false)
            })
            setActivity(groundDuty)
        }


    },[roster])

    return(
        <div className="widget-container col-4">
            <div className="widget-border">
                <h3>Ground Activity</h3>
                <div className="ground-activity-main">
                    {activity.length === 0 ?
                        <p>You have no ground activity this month</p>
                        :
                        <div className="ground-activity-container">
                            {activity.map((day, idx)=>{

                                const date = new Date(day.date.seconds*1000)

                                return(
                                    <div key={idx} className='activity-widget-card'>
                                        <p>{new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)} <span>{addZero(date.getDate())}</span></p>
                                        
                                        <p>{capitalizeWords(day.duty.description)}</p>
                                    </div>
                                )
                            })

                            }
                        </div>
                        
                    }

                </div>
            </div>
        </div>
    )
}