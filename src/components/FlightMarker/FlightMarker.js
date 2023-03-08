import { useState } from "react"


export default function FlightMarker ({flight, setSpotted}){

    //STATES
    const [isHovering, setIsHovering] = useState(false)

    //VARIABLES
    //Icon rotation based on heading information. It substracts 90deg since the original icon has a 90 deg rotation
    const rotation = (flight.dir)-90

    return(
        
        <div className='marker-main-container'>
            {isHovering&&
            <div className='flight-tag'>
                <p><b>{flight.dep_iata}</b></p>
                <span> {'>>'} </span>
                <p><b>{flight.arr_iata}</b></p>
            </div>
            }
            <div className='marker-container' onMouseEnter={()=> setIsHovering(true)} onMouseLeave={()=>setIsHovering(false)} onClick={()=> setSpotted(flight)}>
                <p style={{transform: `rotate(${rotation}deg)`}}>✈</p>
            </div>
        </div>
        
    )
}