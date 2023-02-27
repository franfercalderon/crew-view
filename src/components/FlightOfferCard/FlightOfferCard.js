import { AppContext } from "../../context/AppContext"
import { useContext, useEffect, useState } from "react"


export default function FlightOfferCard ({offer, handleSelect}) {

    //CONTEXT
    const {addZero} = useContext(AppContext)

    //STATES
    // const [selectedOffers, setSelectedOffers] = useState([])
    console.log(offer)

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

    // const handleSelect = (e) =>{
    //     // let selectedOffers = []
    //     if(e.target.checked){
    //         setSelectedOffers(...selectedOffers,e.target.value)
    //     }
    // }

    // useEffect(()=>{

    //     if(selectedOffers.length === 2){
    //         selectedOffers.map((offer)=>{
    //             return(console.log(offer.outboundFlight.departure.airportCode))
    //         })
    //     }


    // },[selectedOffers])



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
                <input type='checkbox' name="flightOffer" onChange={handleSelect} value={JSON.stringify(offer)}/>
            </div>
        </div>
    )

}