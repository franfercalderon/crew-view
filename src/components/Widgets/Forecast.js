import { useCallback, useEffect, useState , useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import WidgetLoader from '../WidgetLoader/WidgetLoader'

export default function Forecast ({flight}) {

    //STATES
    const [isLoading, setIsLoading] =useState(true)
    const [forecast, setForecast] = useState(null)
    
    //Gets functions from context
    const {addZero, capitalizeWords} = useContext(AppContext)
    
    // //FUNCTIONS

    //This function gets the forcast for the flight arrival date out of the days the API responded with (14 days)
    const getArrivalForecast = useCallback((apiForecast) =>{
        
        //VARIABLES
        const arrivalDate = new Date(flight.arrival.time.seconds*1000)

        //Creates object with formatted information for the arrival date
        const actualArrivalDate ={
            year: arrivalDate.getFullYear(),
            month: addZero(arrivalDate.getMonth()+1),
            day: addZero(arrivalDate.getDate())
        }

        //Creates string withg arrival date to compare it with forecast array dates 
        const arrivalDateString = `${actualArrivalDate.year}-${actualArrivalDate.month}-${actualArrivalDate.day}`

        //Finds the day that matches the arrivalDateString and stores that info in forecast state hook
        const arrivalForecast = apiForecast.forecast.forecastday.find(day=>day.date === arrivalDateString)
        setForecast(arrivalForecast)
        
    },[flight, addZero])


    //When app mounts and when flight changes
    useEffect(()=>{

        if(flight){

            //Gets current Date in seconds
            const currentDate = Math.round(Date.now()/1000) 
    
            //Caculates (in days) difference between current time and next flight arrival time
            const timeDifference = Math.ceil((flight.arrival.time.seconds-currentDate)/60/60/24)
            
            //Gets forecast if arrival is between the next 14 days from current date, since free API only offers foreacast for 3 days
            if(timeDifference < 3){
    
                fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${flight.arrival.airportCode}&days=3`,{'mode':'cors'})
    
                    //Converts response to json
                    .then(res => res.json())
    
                    //Calls function that handles forecast rendering
                    .then(res => getArrivalForecast(res))
    
                    //Finally sets loader to false
                    .finally(() => {
                        
                        setTimeout(()=>{
    
                            setIsLoading(false)
                        },1500)
                    })
                    .catch(err => console.log(err.message))
            }
    
            else{
                setIsLoading(false)
                
            } 
        }

    },[flight, getArrivalForecast])

    return(
        <div className="widget-container col-4">
            <div className="widget-border">
                
                <h3>Forecast {forecast&& `for ${capitalizeWords(flight.arrival.city)}`}</h3>
                {isLoading ?
                    <WidgetLoader/>
                    :
                    <>
                    {forecast?
                        <div className='forecast-inner-div'>
                            <div className='main'>
                                <p className='forecast-condition'><b>{forecast.day.condition.text}</b></p>
                                <img className='forecast-widget-icon' src={forecast.day.condition.icon} alt={forecast.day.condition.text}/>
                                <p className='forecast-temperature'><span>{forecast.day.maxtemp_c}°C</span> / {forecast.day.mintemp_c}°C</p>
                            </div>
                            <div className='title'>
                                <p>Forecast for {forecast.date}</p>
                            </div>
                            
                        </div>
                        :
                        <div className='forecast-inner-div  empty'>
                            <p>Forecast will be displayed within 3 days upon arrival</p>
                        </div>
                    }
                    </>
                }
            </div>
        </div>
    )
}