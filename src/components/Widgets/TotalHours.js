import { useState, useEffect } from 'react'
import {Chart} from 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2'

export default function TotalHours ({roster}) {

    //STATES
    const [hours, setHours] = useState({total:0,completed:0,scheduled:0})
    
    //GRAPHIC CONFIGURATION
    const data = {
        labels: ['Completed', 'Scheduled'],
        datasets:[
            {
                data: [hours.completed, hours.scheduled],
                backgroundColor: ['#FFC106','#d3d3d3'],
            }
        ]
    }

    const options = {
        plugins:{
            legend: {
                display: false
            },
        },
        cutout: '80%',
        animation: {
            delay: 2000
        }
    }
    
    useEffect(()=>{

        //Gets total scheduled hours for this roster
        const getTotalHours = () => {

            //VARIABLES
            let flyMinutes = 0
            
            //Filter days where user flies
            const flyDays = roster.filter(day => day.flightActivity)
            
            //Adds minutes for each flying day
            flyDays.map(day => flyMinutes = flyMinutes + day.duration.minutes)
            
            const totalHours = Math.round(flyMinutes/60*10)/10

            //Calls function to get past and upcoming hours
            getPastHours(flyDays, totalHours)
            
        }
        
        const getPastHours = (flyDays, totalHours) =>{
            
            //VARIBALES
            let pastMinutes = 0
            const currentDate = Date.now()

            //Gets past flight
            const pastFlights = flyDays.filter(flight=>flight.departure.time.seconds*1000 < currentDate)

            //Adds flight duration to pastHours
            pastFlights.map(flight => pastMinutes = pastMinutes + flight.duration.minutes)

            //Converts minutes to hs rounding them to 1 decimal 
            const pastHours = Math.round(pastMinutes/60*10)/10

            const pendingHours = Math.round((totalHours- pastHours)*10)/10
            
            //Sets past and upcoming scheduled hours in state
            setHours({
                total: totalHours,
                completed: pastHours,
                scheduled: pendingHours
            })

        }




        getTotalHours()

    },[roster])

    return(
        <div className="widget-container col-4">
            <div className="widget-border">
                <h3>Scheduled</h3>
                <div className="total-hours-main">
                    <div className="main">
                        <div className='hours-chart-container'>
                            <Doughnut data={data} options={options}/>                  
                        </div>
                        <div className="total-hours-number">
                            <p>{hours.total}</p>
                            <p>Hours</p>
                        </div>
                    </div>  
                    <div className="title">
                        <div className='d-flex align-items-center'>
                            <span className='flown hours-legend'></span>
                            <p>Completed</p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <span className='upcoming hours-legend'></span>
                            <p>Upcoming</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}