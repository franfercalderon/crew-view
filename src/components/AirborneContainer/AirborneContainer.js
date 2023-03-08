import { useEffect, useState } from "react"
import GoogleMapReact from 'google-map-react'
import FlightMarker from "../FlightMarker/FlightMarker"
import WidgetLoader from "../WidgetLoader/WidgetLoader"

export default function AirborneContainer (){
    //STATES
    const [airborneFlights, setAirborneFlights] = useState(null)
    const [spotted, setSpotted] = useState(null)
    const [imgSrc, setImgSrc] = useState(null)

    //MAP CONFIGURATION
    const defaultProps = {
        center: {
            lat: -35.6,
            lng: -78.38
        },
        zoom: 3.7
    }

    //EFFECTS
     useEffect(()=>{
        const airlineIcaoCode = 'ARG'
        const url= `https://airlabs.co/api/v9/flights?api_key=${process.env.REACT_APP_AIRLABS_API_KEY}&airline_icao=${airlineIcaoCode}`
        // let actualFlights = []
        //FETCH API TO GET AIRLABS API INFO
        fetch(url)
            .then((res)=>res.json())
            .then((data)=>{
                //Filters actual airline flights (there are some small aircraft registered with the same ICAO code)
                const actualFlights = data.response.filter(flight=>{
                    return(flight.aircraft_icao === 'B738' ||
                    flight.aircraft_icao === 'B38M' ||
                    flight.aircraft_icao === 'B737' ||
                    flight.aircraft_icao === 'A332' ||
                    flight.aircraft_icao === 'E190')
                })
                setAirborneFlights(actualFlights)
            })
    },[])

    useEffect(()=>{
        if(spotted){

            const imgSrc = () =>{
                switch(spotted.aircraft_icao){
                    case 'B738':
                        return '/images/aircrafts/b738.jpeg'
                    case 'B737':
                        return '/images/aircrafts/b737.jpeg'
                    case 'B38M':
                        return '/images/aircrafts/b737m.jpeg'
                    case 'E190':
                        return '/images/aircrafts/E190.jpeg'
                    case 'A332':
                        return '/images/aircrafts/a330.jpeg'
                    default: 
                        return null
                }
            }
            setImgSrc(imgSrc)
        }
    },[spotted])

    return(
        <div className='airborne-container-main col-10'>
            <h2>Airborne Flighs</h2>
            <div className="main d-flex row">
                {airborneFlights?
                
                <div className="airborne-map-container d-flex align-items-center justify-content-evenly">
                    <div className="airborne-inner-div d-flex align-items-center">
                        <div className="airborne-details-div">
                            {!spotted?
                            
                            <>
                                <h5>There are {airborneFlights.length} company flights in the air</h5>
                                <p>Click on a plane to see flight details</p>
                            </>
                            :
                            <>
                                <div className="d-flex align-items-center title">
                                    <p><b>{spotted.dep_iata}</b></p>
                                    <span>✈</span>
                                    <p><b>{spotted.arr_iata}</b></p>
                                </div>
                                <div className="img-container">
                                    <img src={imgSrc} alt='plane'/>
                                </div>
                                <div className="data-div">
                                    <div className="d-flex">
                                        <p className="col-6 d-flex justify-content-center"><b>Flight</b> </p>
                                        <p className="col-6 d-flex justify-content-center"><b>Aircraft</b></p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="col-6 d-flex justify-content-center">{spotted.flight_iata}</p>
                                        <p className="col-6 d-flex justify-content-center">{spotted.aircraft_icao}</p>
                                    </div>
                                </div>
                                <div className="data-div">
                                    <div className="d-flex">
                                        <p className="col-6 d-flex justify-content-center"><b>Speed</b> </p>
                                        <p className="col-6 d-flex justify-content-center"><b>Altitude</b></p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="col-6 d-flex justify-content-center">{spotted.speed} km/h</p>
                                        <p className="col-6 d-flex justify-content-center">{spotted.alt} ft</p>
                                    </div>
                                </div>
                                <button onClick={()=>setSpotted(null)} className='btn btn-light clear-btn'>Clear selection</button>
                            </>
                            }
                        </div>

                        <GoogleMapReact 
                        options={{ mapId: "af22a13c608fb736" }}
                        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY}}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}>
                            
                            {airborneFlights.map((flight, idx)=>{

                                return(  
                                    <FlightMarker setSpotted={setSpotted} key={idx} lat={flight.lat}lng={flight.lng} flight={flight} />

                                   
                                )
                            })}

                        </GoogleMapReact>

                    </div>

                </div>
                
                
                :
                <WidgetLoader/>
                }

            </div>
        </div>
    )
}