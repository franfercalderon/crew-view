import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons"
import app from '../../fb'
import WidgetLoader from '../WidgetLoader/WidgetLoader'
import FlightOfferCard from '../FlightOfferCard/FlightOfferCard'
import SwapCard from '../SwapCard/SwapCard'
import { getFirestore, collection, getDocs, deleteDoc, addDoc, doc, updateDoc, getDoc} from 'firebase/firestore'
import { useEffect, useState , useContext, useCallback} from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { MDBSwitch } from 'mdb-react-ui-kit'
import Swal from 'sweetalert2'

//Initialize firestore
const db = getFirestore(app)

export default function SwapContainer () {
    
    //CONTEXT
    const {globalUser, currentRoster} = useContext(AppContext)
    
    //STATES
    const [isLoading, setIsLoading] = useState(true)
    const [myOffers, setMyOffers] = useState([])
    const [flightOffers, setFlightOffers] = useState([])
    const [selectedOffers, setSelectedOffers] = useState({'requester':null,'receptor':null})
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [elegibleOffers, setElegibleOffers] = useState(null)
    const [elegibilityFilter, setElegibilityFilter] = useState(true)
    const [showManage, setShowManage] = useState(false)
    const [myRequests, setMyRequests] = useState(null)

    //FUNCTIONS
    
    const handleSelect = (e) =>{

        //Gets offer from flight card
        const offer = JSON.parse(e.target.value)

        if(offer.crewId === globalUser.employeeId){
            setSelectedOffers({...selectedOffers, requester: offer})
        }
        else{
            setSelectedOffers({...selectedOffers,receptor: offer})
        }
    }    

    //When ? button is clicked, shows information regarding flight elegibility / request handling
    const showHelp = ()=>{

        if(showManage){
            Swal
            .fire({
                text: `You can only approve requests you have received. Requests made by you, need to be approved by the other user. You can always cancel a flight swap request before it's approved, wheather it was requested by you or not.`,
                icon: 'info',
                iconColor: '#FFC106',
                confirmButtonText: 'Ok',
                buttonsStyling: false,
                customClass:{
                    confirmButton: 'btn btn-primary alert-btn order-2',
                    popup: 'alert-container'
                }
            })
        }
        else{

            Swal
            .fire({
                text: `For a flight to be elegible, it's departure and arrival from/to your hub must be the same days as some of your open flights.`,
                icon: 'info',
                iconColor: '#FFC106',
                confirmButtonText: 'Ok',
                buttonsStyling: false,
                customClass:{
                    confirmButton: 'btn btn-primary alert-btn order-2',
                    popup: 'alert-container'
                }
            })
        }
    }

    //For a more readable UI, orders flight offers based on departure date
    const sortOffer = (array) => {
        array = array.sort((a,b)=>{
            return(
                a.outboundFlight.date.seconds - b.outboundFlight.date.seconds
            )
        })
        return array
    }

    const handleSwap = () => {
        Swal
        .fire({
                text: 'Do you want to request a Flight Swap?',
                icon: 'warning',
                iconColor: '#FFC106',
                confirmButtonText: 'Confirm',
                showDenyButton: true,
                denyButtonText:'Cancel',
                buttonsStyling: false,
                customClass:{
                    confirmButton: 'btn btn-primary alert-btn order-2',
                    denyButton: 'btn btn-light alert-btn order-1',
                    popup: 'alert-container'
                }
            })
        .then((res)=>{
            if(res.isConfirmed){
                postSwapRequest(selectedOffers)
            }
        })
    }

    const postSwapRequest = (request) =>{
        
        setIsLoading(true)

        //Adds request document to swapRequests collection in firestore
        addDoc(collection(db,'swapRequests'),request)
            .then(()=>{
                Swal
                    .fire({
                        title: 'Swap Requested!',
                        text: `You can check the status of this swap request on 'Manage your requests'`,
                        icon: 'success',
                        confirmButtonText: 'Go to Manage Requests',
                        showDenyButton: true,
                        denyButtonText:'Cancel',
                        buttonsStyling: false,
                        customClass:{
                            confirmButton: 'btn btn-primary alert-btn order-2',
                            denyButton: 'btn btn-light alert-btn order-1',
                            popup: 'alert-container'
                        }
                    })
                    .then((res)=>{
                        if(res.isConfirmed){

                            //Shows manage Requests section
                            setShowManage(true)
                        }
                    })
            })
            .finally(()=>{
                //Turns loader off
                setIsLoading(false)
                //Updates requests
                getAllRequests()
                //Cleans selectedOffers State
                setSelectedOffers({'requester':null,'receptor':null})
            })
            .catch(err=>console.error(err.message))
    }

    //Handles flight activity changes in both requester and receptor rosters, then calls funciton that actually updates the document in db
    const updateRoster = (current, request) =>{

        //UPDATES REQUESTER'S ROSTER
        //Maps over requester's current roster and finds date match to know what flights to replace with newFlights inbound and outbound
        const requesterUpdatedActivity = current.data.activity.map(day=>{
            
            if(day.date.seconds === request.receptor.outboundFlight.date.seconds){
                return request.receptor.outboundFlight
            }
            
            else if(day.date.seconds === request.receptor.inboundFlight.date.seconds){
                return request.receptor.inboundFlight
            }
            //If date does not match any new flight, returns the day's activity as it was.
            return day
            
        })

        //Finally, calls function to update in db
        updateRosterInDb(current.id, requesterUpdatedActivity)


        //UPDATES RECEPTOR'S (CURRENT USER) ROSTER
        //Maps over currentRoster and replaces flights with requester's
        const receptorUpdatedActivity = currentRoster.data.activity.map(day=>{

            if(day.date.seconds === request.requester.outboundFlight.date.seconds){
                return request.requester.outboundFlight
            }
            else if(day.date.seconds === request.requester.inboundFlight.date.seconds){
                return request.requester.inboundFlight
            }
            //If date does not match any new flight, returns the day's activity as it was.
            return day
        })

        //Calls function to update in db
        updateRosterInDb(currentRoster.id, receptorUpdatedActivity)

    }

    const updateRosterInDb = (rosterId, newActivity ) =>{
        //Creates reference to docuemnt in rosters collection, using roster ID
        const rosterRef = doc(db, 'rosters', rosterId)
        updateDoc(rosterRef, {'data.activity': newActivity})
            .then(()=>console.log('rosterupdated'))
            .catch((err)=>console.log(err.message))
    }   

    const handleApprove = (request) =>{

        //Gets current roster from requester user to edit and update it
        getDoc(doc(db, 'rosters', request.requester.rosterId))
            .then((doc)=>{
                if(doc.exists()){

                    //Calls function thast actually updates the requesters roster
                    updateRoster(doc.data(), request)
                }
            })
            .catch(err=>console.log(err.message))
    }

    //EFFECTS
    useEffect(()=>{

        //Enables button when own flight and other flight are selected
        selectedOffers.requester && selectedOffers.receptor ?
        setBtnDisabled(false) : setBtnDisabled(true)
    },[selectedOffers])

    const getAllRequests = useCallback(() =>{

            //Creates empty array for offers
            let myRequestArray = []
    
            //Gets all offers that have
            getDocs(collection(db,'swapRequests'))
                .then(snap=>{
                    snap.forEach(doc=>{
    
                        //First, checks if offers are current, if any of the flights have departed, it deletes requests from db. This way, user can only see current requests.
                        if(doc.data().requester.outboundFlight.departure.time.seconds && doc.data().receptor.outboundFlight.departure.time.seconds > Math.round(Date.now()/1000)){

                            if( doc.data().receptor.crewId || doc.data().requester.crewId === globalUser.employeeId){
                                myRequestArray.push(doc.data())
                            }
                        }
                        else{
                            deleteDoc(doc.ref)
                        }
                    })
                })
                .then(()=> {
                    //Orders Requests by departure date
                    myRequestArray = myRequestArray.sort((a,b)=>{
                        return(
                            a.requester.outboundFlight.departure.time.seconds - b.requester.outboundFlight.departure.time.seconds
                        )
                    })
                    setMyRequests(myRequestArray)
                })
                .catch((err)=>console.log(err.message))
    
    },[globalUser])
    

    useEffect(()=>{
        
        if(globalUser){

            //When globalUser is true, gets all requests for this user.
            getAllRequests()

        }

    },[globalUser, getAllRequests])
    
    useEffect(()=>{

        setIsLoading(true)

        if(globalUser){

            //Gets all flight offers from db
            const getAllFlightOffers = ()=>{
    
                //Sets empty array for flightOffers and current seconds to compare and not consider old flight offers
                let requesterArray = []
                let otherFlightsArray = []
                const currentSeconds = Math.round(Date.now()/1000)

    
                getDocs(collection(db,'flightOffers'))
                    .then(snap=>{
                        snap.forEach(doc=>{

                            //First, checks if flight offer is expired (flight departed). If it's current, pushes the offer to requesterArray or otherFlightsArray, depending on crewId value. 
                            if(doc.data().outboundFlight.departure.time.seconds > currentSeconds){

                                if(doc.data().crewId === globalUser.employeeId) requesterArray.push(doc.data())
    
                                else otherFlightsArray.push(doc.data())
                            }
                            //If offer is expired, deletes doc from db to keep it clean
                            else{
                                deleteDoc(doc.ref)
                            }

                        })
                    })
                    .finally(()=>{
                        requesterArray = sortOffer(requesterArray)
                        otherFlightsArray = sortOffer(otherFlightsArray)
                        setMyOffers(requesterArray)
                        setFlightOffers(otherFlightsArray)  
                        setIsLoading(false)
                    })
                    .catch(err=>console.log(err.message))
            }
            getAllFlightOffers()
        }

    },[globalUser])

    useEffect(()=>{

        //This function iterates over the user open flights and compares each flight with all other open flights, looking for a coincidence in departure and arrival dates. 
        const getElegibleOffers = () => {

            //Maps over users open flights
            const elegibleArray = myOffers.map(myOffer => {

                // Creates a new array including only those flights where departure and arrival dates match.
                const matchingOffers = flightOffers.filter(offer=> myOffer.outboundFlight.date.seconds === offer.outboundFlight.date.seconds && myOffer.inboundFlight.date.seconds === offer.inboundFlight.date.seconds)
                return matchingOffers
            })

            //Arrays get flat to one level
            const elegibleFlights = elegibleArray.flat()

            if(elegibleFlights.length > 0){
                //If there is at least one matching element, stores it in state.
                setElegibleOffers(elegibleFlights)
            }
        }
        
        getElegibleOffers()

    },[flightOffers,myOffers])


    return(
        <div className="swap-main-container col-10">
            <h2>Flight swap</h2>
            <div className="main d-flex row ">
                <>
                {!showManage ?
                <>
                <div className="swap-inner-container col-5">
                    <div className='swap-wid-title'>
                        <h3>Your open flights</h3>
                        <p>Select a flight to swap:</p>
                    </div>
                    {
                        isLoading?
                        <WidgetLoader/>
                        :
                        <div className='flight-offer-card-container'>
                        {myOffers.length > 0 ?
                        <>
                        {myOffers.map((offer,idx)=><FlightOfferCard offer={offer} handleSelect={handleSelect} key={idx}/>)}
                        </>
                        :   
                        <>
                            <p className='mt-4'>You have no open flights.</p>
                            <p>Manage flights from roster.</p>
                            <Link to='/roster' className='btn go-roster-btn'>Go to roster</Link>
                        </>
                        }
                        </div>
                    }
                </div>
                <div className="col-2 swap-middle-btn-container">
                    <button disabled={btnDisabled} onClick={handleSwap} className='swap-middle-btn-div btn'>
                        <FontAwesomeIcon icon={faArrowsRotate}/>
                    </button>
                    <p>{!btnDisabled ? 'Request Swap': 'Select flights'}</p>
                </div>
                <div className="swap-inner-container col-5">
                    <div className='swap-wid-title'>
                        <div className='d-flex justify-content-between'>
                            <h3>All open flights</h3>
                            <div className='question-sign' onClick={showHelp}>
                                <span></span>
                                <p>?</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-baseline '> 
                            <p>Select a flight:</p>
                            <div className='d-flex align-items-baseline toggle-elegible' onClick={()=>setElegibilityFilter(!elegibilityFilter)}>
                                <label>Show elegibles
                                </label>
                                <MDBSwitch id='flexSwitchCheckDefault' name='elegible' defaultChecked/>
                            </div>

                        </div>
                    </div>
                    {
                        isLoading?
                        <WidgetLoader/>
                        :
                        <div className='flight-offer-card-container'>
                        {flightOffers.length > 0 ?
                            <>
                            {elegibilityFilter?

                            <>
                                {elegibleOffers ?
                                <>
                                    {elegibleOffers.map((offer,idx)=><FlightOfferCard offer={offer} handleSelect={handleSelect} key={idx}/>)}
                                </>
                                :
                                <>
                                <p className='mt-4'>There are no flights matching yours.</p>       
                                <p>You can see all offers by disabling 'Show elegible'.</p>                
                                </>
                                }
                            </>
                                
                            :
                            <>
                                {flightOffers.map((offer,idx)=><FlightOfferCard offer={offer} handleSelect={handleSelect} key={idx}/>)}
                            </>
                            }                  
                            </>
                        :                       
                            <p className='mt-6'>There are no offered flights</p>
                        }
                        </div>
                    }
                </div>
                </>
                :
                
                <div className="swap-inner-container col-12">
                    {isLoading?

                    <WidgetLoader/>
                    :
                    <>
                    <div className='swap-wid-title'>
                        <div className='d-flex justify-content-between'>
                            <h3>Your swap requests</h3>
                            <div className='question-sign' onClick={showHelp}>
                                <span></span>
                                <p>?</p>
                            </div>
                        </div>
                    </div>
                    <div className='flight-offer-card-container'>
                        <>
                            {!myRequests?
                                //If user have no requests
                                <p className='mt-6'>There are no offered flights</p>
                            :
                            <>
                            {
                                myRequests.map((request,idx)=>{
                                    return (
                                        <SwapCard request={request} handleApprove={handleApprove} key={idx} />
                                    )
                                })
                            }
                            </>
                            }
                        </>
                    </div>
                    </>
                    }
                </div>
                }
                </>
            </div>
            <div className=" bottom d-flex row">
                <button onClick={()=>setShowManage(!showManage)} className='btn manage-requests-btn'>
                    <p>{!showManage? 'Manage your requests': 'Go to Offer Board'}</p>
                </button>
            </div>
        </div>
    )
}