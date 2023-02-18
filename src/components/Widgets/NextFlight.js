export default function NextFlight ({flight}) {

    //Gets new Date object from next flight departure time
    const flightDate = new Date(flight.departure.time.seconds*1000)

    //Config for date functions
    const monthOptions = { month: "short" }
    const dayOptions = { weekday: "long" }
    const addZero = (input) =>{

        if(input<10){
            let output = '0'+ input
            return output
        }
        else return input
    }
    const capitalizeWords = (string) =>{
        return(
            string
                .toLowerCase()
                .split(' ')
                .map((word)=>word.charAt(0).toUpperCase()+word.slice(1))
                .join(' ')
        )
    }

    //Creates an accessible Date info object
    const flightActualDate = {

        year: flightDate.getFullYear(),
        month: new Intl.DateTimeFormat("en-US", monthOptions).format(flightDate),
        date: addZero(flightDate.getDate()),
        day: new Intl.DateTimeFormat("en-US", dayOptions).format(flightDate),
        hour: addZero(flightDate.getHours()),
        minute: addZero(flightDate.getMinutes())
    }


    return(
        <div className="widget-container col-8">
            <div className="widget-border">
                <h3>Your next flight</h3>
                <div className="wid-inner-div row">
                    <div className="col-4 next-flight-inner-div border-div">
                        <div className="main">                       
                            <p className="arrival-airport"><b>{flight.arrival.airportCode.toUpperCase()}</b></p>
                            <div className="d-flex justify-content-center">
                                <p>{capitalizeWords(flight.arrival.airport)}</p>
                            </div>

                        </div>
                        <p className="title">Destination</p>
                    </div>
                    <div className="col-4 next-flight-inner-div border-div">
                        <div className="main">                       
                            <p className="next-flight-departure-day"><b>{flightActualDate.day}</b></p>
                            <div className="d-flex justify-content-center">
                                <p>{`${flightActualDate.month} ${flightActualDate.date}, ${flightActualDate.year}`}</p>
                            </div>
                            <div className="d-flex flex-column departure-detail">
                                <p><b>From: </b>{capitalizeWords(flight.departure.city)} / {flight.departure.airportCode.toUpperCase()}</p>
                                <p><b>At: </b>{`${flightActualDate.hour}:${flightActualDate.minute} (local time)`}</p>
                            </div>
                        </div>
                        <p className="title">Departure</p>
                    </div>                  
                    <div className="col-4 next-flight-inner-div">
                        <div className="main">
                            <img src={flight.equipment.img} alt={flight.equipment.model} className="next-aircraft-img"/>                       
                            {/* <p>{flight.equipment.manufacturer}</p> */}
                            <div className="d-flex justify-content-center">
                                <p>{capitalizeWords(flight.equipment.manufacturer)} {capitalizeWords(flight.equipment.model)}</p>
                            </div>
                        </div>
                        <p className="title">Aircraft</p>
                    </div>
                </div>                
            </div>
        </div>
    )
}