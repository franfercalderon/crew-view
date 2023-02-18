import { useEffect, useState } from "react"

export default function GroundActivity ({roster}) {

    const [activity, setActivity] = useState([])
    console.log(activity)
    console.log(roster)
    // const  checkGroundActivity = () =>{
    //     let activityArray = []

    //     const activeDays = roster.map(day=>{
    //         return(day.active === true)
    //     })
    //     console.log(activeDays)
    // }
    useEffect(()=>{

        // let activityArray = []
        
        const activeDays = roster.filter(day=>{
            return(day.active === true)
        })
        console.log(activeDays)

        if(activeDays.length > 1){

            const groundDuty = activeDays.filter(day=>{
                return(day.flightActivity === false)
            })
            
            setActivity(groundDuty)

        }
        // else{
        //     setActivity([])
        // }


    },[roster])
    return(
        <div className="widget-container col-4">
            <div className="widget-border">
                <h3>Ground Activity</h3>
                <div className="ground-activity-main">
                    {/* {activity.length > 0 ? */}
                    {activity.length === 0 ?
                        <p>You have no ground activity this month</p>
                        :
                        <div className="ground-activity-container">
                            {activity.map((day, idx)=>{
                                return(
                                    <div key={idx} className='activity-widget-card'>
                                        <p>{day.duty.description}</p>
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