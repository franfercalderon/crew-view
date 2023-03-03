import { AppContext } from '../../context/AppContext'
import { useContext, useState } from 'react'
import app from "../../fb"
import Swal from 'sweetalert2'
import {getFirestore, collection, addDoc, query, where,FieldPath, deleteDoc, getDocs} from 'firebase/firestore'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'

//Initialize Cloud Firestore and get reference to the service
const db = getFirestore(app)

export default function FlightCard ({day, currentSeconds}){

    //STATES
    const [isLoading, setIsLoading] = useState(false)
   
    //CONTEXT
    const {addZero,capitalizeWords, currentRoster,updateIsOffrededInRoster} = useContext(AppContext)

    //VARIABLES
    const dayDate = new Date(day.date.seconds*1000)
    const navigate = useNavigate()

    //FUNCTIONS
    
    //Gets return flight for swap selected flight
    const getReturnFlight = (day) => {

        
        // Returns array with just flying days
        const flightDays = currentRoster.data.activity.filter(day=>day.flightActivity)
        
        //Sorts array 
        const sortedRoster = flightDays.sort((a,b)=>{
            return a.date.seconds - b.date.seconds
        })
        
        //Finds return flight, being this the next one in order by date
        const returnFlight = sortedRoster.find(flight=>flight.date.seconds > day.date.seconds)
        return returnFlight
    }
    
    //When swap buttons are clicked:
    const handleSwap = (day) => {
        
        //Gets 'return' activity for this flight
        const returnFlight = getReturnFlight(day)

        const offeredFlight = {
            crewId: currentRoster.data.crewId,
            rosterId: currentRoster.id,
            outboundFlight: day,
            inboundFlight: returnFlight
        }

        //Checks if flight was open for swap
        if(!day.isOffered){

            Swal
                .fire({
                    text: 'Do you want to post this flight?',
                    icon: 'info',
                    iconColor: '#FFC106',
                    showDenyButton: true,
                    denyButtonText:'Cancel',
                    confirmButtonText: 'Post flight',
                    buttonsStyling: false,
                    customClass:{
                        confirmButton: 'btn btn-primary alert-btn order-2',
                        denyButton: 'btn btn-light alert-btn order-1',
                        popup: 'alert-container'
                    }
                })
                .then(res=>{
                    if(res.isConfirmed){
                        postOffer(offeredFlight)
                    }
                })
        }
        else{
            Swal
                .fire({
                    text: 'Do you want to close this flight?',
                    icon: 'info',
                    iconColor: '#FFC106',
                    showDenyButton: true,
                    denyButtonText:'Cancel',
                    confirmButtonText: 'Close flight',
                    buttonsStyling: false,
                    customClass:{
                        confirmButton: 'btn btn-primary alert-btn order-2',
                        denyButton: 'btn btn-light alert-btn order-1',
                        popup: 'alert-container'
                    }
                })
                .then(res=>{
                    if(res.isConfirmed){
                        deleteOffer(offeredFlight)
                    }
                })
        }
    }

    const deleteOffer = (offeredFlight) => {

        //Sets loader to true
        setIsLoading(true)

        //Creates ref in db where flight id matches
        const flightIdPath = new FieldPath('outboundFlight', 'flightId');
        const q = query(collection(db,'flightOffers'), where(flightIdPath,'==',offeredFlight.outboundFlight.flightId))

        //Gets docs from 
        getDocs(q)
            .then(snap=>{
                snap.forEach(doc=>deleteDoc(doc.ref))
            })
            .then(()=>updateIsOffrededInRoster(offeredFlight))
            .finally(()=>setIsLoading(false))
            .catch((err)=>console.log(err.message))
    }

    //Creates document in db with flights (outbound and inbound) offer
    const postOffer = (offeredFlight) =>{

        //Sets loader to true
        setIsLoading(true)

        //Creates reference to collection in data base
        const dbRef = collection(db,'flightOffers')

        //Adds doc to collection with a auto ID generated by Firebase
        addDoc(dbRef, offeredFlight)
            .then(()=>{
                updateIsOffrededInRoster(offeredFlight)
            })
            .then(()=>{
                setIsLoading(false)
                Swal
                    .fire({
                        title: 'Flight Posted!',
                        text: 'You will find it in Flight Swap section',
                        icon: 'success',
                        confirmButtonText: 'Go to Flight Swap',
                        showDenyButton: true,
                        denyButtonText:'Ok',
                        buttonsStyling: false,
                        customClass:{
                            confirmButton: 'btn btn-primary alert-btn order-2',
                            denyButton: 'btn btn-light alert-btn order-1',
                            popup: 'alert-container'
                        }
                    })
                    .then((res)=>{
                        if(res.isConfirmed){
                            navigate('/swap')
                        }
                    })
            })
            .catch(err=>{
                setIsLoading(false)
                Swal
                    .fire({
                        title: 'Oops!',
                        text: 'Your flight was not posted. ' + err.message,
                        icon: 'error',
                        confirmButtonText: 'Post flight',
                        buttonsStyling: false,
                        customClass:{
                            confirmButton: 'btn btn-primary alert-btn',
                            popup: 'alert-container'
                        }
                    })
            })
    }


    return(
        <>
        {isLoading?
            <Loader/>
        :
        <div className="flight-card-main-container row">
            <p className="col-2 d-flex justify-content-center align-items-center">{addZero(dayDate.getMonth()+1)}-{addZero(dayDate.getDate())}-{dayDate.getFullYear()}</p>
            <p className="col-2 d-flex justify-content-center align-items-center">
                {!day.active ?
                    'Off'
                    :
                    <>
                    {day.flightActivity?
                    day.flight.toUpperCase()
                    :
                    capitalizeWords(day.duty.description)
                    }
                    </>
                }
            </p>
            <p className="col-1 d-flex justify-content-center align-items-center">
                {!day.active?
                    '--'
                :
                <>
                    {day.flightActivity?
                    day.departure.airportCode.toUpperCase()
                    :
                    '--'        
                    }
                </>}
            </p>
            <p className="col-1 d-flex justify-content-center align-items-center">
                {!day.active?
                    '--'
                :
                <>
                    {day.flightActivity?
                    day.arrival.airportCode.toUpperCase()
                    :
                    '--'        
                    }
                </>}
            </p>
            <p className="col-1 d-flex justify-content-center align-items-center">
                {!day.active?
                    '--'
                :
                <>
                    {day.flightActivity?
                        <>
                        {addZero(new Date(day.departure.time.seconds*1000).getHours())}:{addZero(new Date(day.departure.time.seconds*1000).getMinutes())}
                        </>
                    :
                        <>
                        {addZero(new Date(day.duty.starts.seconds*1000).getHours())}:{addZero(new Date(day.duty.starts.seconds*1000).getMinutes())}
                        </>           
                    }
                </>}
            </p>
            <p className="col-1 d-flex justify-content-center align-items-center">
                {!day.active?
                    '--'
                :
                <>
                    {day.flightActivity?
                        <>
                        {addZero(new Date(day.arrival.time.seconds*1000).getHours())}:{addZero(new Date(day.arrival.time.seconds*1000).getMinutes())}
                        </>
                    :
                        <>
                        {addZero(new Date(day.duty.ends.seconds*1000).getHours())}:{addZero(new Date(day.duty.ends.seconds*1000).getMinutes())}
                        </>           
                    }
                </>}
            </p>
            <p className="col-2 d-flex justify-content-center align-items-center">
                {!day.active || !day.flightActivity ?
                    '--'
                :
                <>
                    {day.flightActivity?
                        <>
                        {day.international?
                            <>
                            {addZero(new Date((day.departure.time.seconds-9000)*1000).getHours())}:{addZero(new Date((day.departure.time.seconds-9000)*1000).getMinutes())}
                            </>
                            :
                            <>
                            {addZero(new Date((day.departure.time.seconds-4800)*1000).getHours())}:{addZero(new Date((day.departure.time.seconds-4800)*1000).getMinutes())}
                            </>
                        }
                        </>
                    :
                        <>
                        {addZero(new Date(day.duty.starts.seconds*1000).getHours())}:{addZero(new Date(day.duty.starts.seconds*1000).getMinutes())}
                        </>           
                    }
                </>}
            </p>
            <div className="col-2 d-flex justify-content-center align-items-center">

                {day.active && day.flightActivity && currentSeconds> day.departure.time.seconds ?
                    <p><i>Departed</i></p>
                :
                <>
                    {day.active && day.flightActivity && day.departure.fromHub && !day.isOffered ?
                        <input type='button' className='btn btn-primary swap-btn-list' value='Open' onClick={()=>handleSwap(day)}/>
                        
                    :
                    <>
                        {day.active && day.flightActivity && day.isOffered && day.departure.fromHub &&
                            <input type='button' className='btn btn-danger swap-btn-list' value='Close' onClick={()=>handleSwap(day)} />
                            
                        }
                    </>
                    }
                </>
                }
            </div>
        </div>
        }
        </>
    )
}