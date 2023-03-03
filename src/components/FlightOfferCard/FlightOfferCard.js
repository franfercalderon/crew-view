import { AppContext } from "../../context/AppContext"
import { useContext } from "react"


export default function FlightOfferCard ({offer, handleSelect}) {

    //CONTEXT
    const {addZero, globalUser} = useContext(AppContext)

    //Creates date for inbound/outbound flights
    const outboundDate = new Date(offer.outboundFlight.departure.time.seconds*1000)
    const inboundDate = new Date(offer.inboundFlight.arrival.time.seconds*1000)

    //Compiles flights info in a more accessible object
    const outbound = {
        destination: offer.outboundFlight.arrival.airportCode,
        month: new Intl.DateTimeFormat("en-US", { month: "long" }).format(outboundDate),
        date: addZero(outboundDate.getDate()),
        hour: addZero(outboundDate.getHours()),
        minutes:addZero(outboundDate.getMinutes())
    }

    const inbound = {
        month: new Intl.DateTimeFormat("en-US", { month: "long" }).format(inboundDate),
        date: addZero(inboundDate.getDate()),
        hour: addZero(inboundDate.getHours()),
        minutes:addZero(inboundDate.getMinutes())
    }

    return(

        <div className='flight-offer-card'>
            <div className='d-flex flex-column align-items-center'>
                <p>Outbound</p>
                <p><i>{outbound.month+' '+outbound.date}</i></p>
                <p><i>{outbound.hour+':'+outbound.minutes}</i></p>
            </div>
            <span>{`>`}</span>
            <p><b>{outbound.destination.toUpperCase()}</b></p>
            <span>{`>`}</span>
            <div className='d-flex flex-column align-items-center'>
                <p>Inbound</p>
                <p><i>{inbound.month+' '+inbound.date}</i></p>
                <p><i>{inbound.hour+':'+inbound.minutes}</i></p>
            </div>
            <div className='d-flex flex-column'>
                {offer.crewId === globalUser.employeeId ?
                <input type='radio' className="flight-offer-radio" name="myFlightOffer" onChange={handleSelect} value={JSON.stringify(offer)}/>
                :
                <input type='radio' className="flight-offer-radio" name="flightOffer" onChange={handleSelect} value={JSON.stringify(offer)}/>
                }
            </div>
        </div>
    )

}