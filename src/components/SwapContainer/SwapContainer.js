import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons"
import app from '../../fb'
import WidgetLoader from '../WidgetLoader/WidgetLoader'
import FlightOfferCard from '../FlightOfferCard/FlightOfferCard'
import SwapCard from '../SwapCard/SwapCard'
import { getFirestore, collection, getDocs, deleteDoc, addDoc, doc, updateDoc, getDoc} from 'firebase/firestore'
import { useEffect, useState , useContext} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { MDBSwitch } from 'mdb-react-ui-kit'
import Swal from 'sweetalert2'
import {v4 as uuidv4} from 'uuid'

//Initialize firestore
const db = getFirestore(app)

export default function SwapContainer () {
    
    //CONTEXT
    const {globalUser, currentRoster,getUserRosters, getAllRequests, myRequests} = useContext(AppContext)

    //ROUTER
    const navigate = useNavigate()
    
    //STATES
    const [isLoading, setIsLoading] = useState(true)
    const [myOffers, setMyOffers] = useState([])
    const [flightOffers, setFlightOffers] = useState([])
    const [selectedOffers, setSelectedOffers] = useState({'requester':null,'receptor':null})
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [elegibleOffers, setElegibleOffers] = useState(null)
    const [elegibilityFilter, setElegibilityFilter] = useState(true)
    const [showManage, setShowManage] = useState(false)

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

                //Checks if flight dates matches. For a flight to be elegible, dates of receptor's flights must be the same as the requester's.
                const reqOutbound = selectedOffers.requester.outboundFlight.date.seconds
                const reqInbound = selectedOffers.requester.inboundFlight.date.seconds
                const recOutbound = selectedOffers.receptor.outboundFlight.date.seconds
                const recInbound = selectedOffers.receptor.inboundFlight.date.seconds

                if(reqOutbound === recOutbound && reqInbound === recInbound){
                    //Calls fn that posts the swapRequest in db
                    postSwapRequest({...selectedOffers,'requestId':uuidv4()})
                }
                else{
                    return(
                        Swal
                        .fire({
                            title: 'Oops!',
                            text: 'The selected flights are not elegible for a swap. Please select flights that where departure and return flight dates match.',
                            icon: 'warning',
                            confirmButtonText: 'Ok',
                            buttonsStyling: false,
                            customClass:{
                                confirmButton: 'btn btn-primary alert-btn order-2',
                                popup: 'alert-container'
                            }
                        })

                    )
                }
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

    const deleteFlightOffer = async (request) => {
        try{
            //Gets all docs from flightOffers collection in db 
            const querySnap = await getDocs(collection(db, 'flightOffers'))
            querySnap.forEach(doc=>{
                const docId = doc.data().outboundFlight.flightId
                const reqOutboundId = request.requester.outboundFlight.flightId
                const recOutboundId = request.receptor.outboundFlight.flightId
                // console.log('docId '+docId)
                //if flight match any of the contained in offers (compares flightId), deletes it
                if( docId === recOutboundId ||
                    docId === reqOutboundId){
                    // console.log('entra ahora')
                    // console.log('requester Id es '+request.requester.outboundFlight.flightId)
                    // console.log('receptor Id es '+request.receptor.outboundFlight.flightId)
                    // // console.log(doc.data())
                    deleteDoc(doc.ref)
                }
                
            })

        }
        catch(err){console.log(err.message)}
    }

    const deleteSwapRequest = async (requestId) => {

        //Gets all requests and looks for the matching id
        try{
            const querySnap = await getDocs(collection(db, 'swapRequests'))
            querySnap.forEach(doc=>{
                if(doc.data().requestId === requestId){
                    deleteDoc(doc.ref)
                }
            })

        }
        catch(err){console.log(err.message)}
    }


    const updateActivity = (currentActivity, newFlights) =>{
  
        //Maps over current activity, looking for dates coincidences with new activity flights:
        return(
            currentActivity.map(day => {
                if(day.date.seconds === newFlights.outboundFlight.date.seconds){
                    return newFlights.outboundFlight
                }
                else if(day.date.seconds === newFlights.inboundFlight.date.seconds){
                    return newFlights.inboundFlight
                }
                //If date does not match any new flight, returns the day's activity as it was.
                return day
            })
        )
    }

    const updateRosterInDb = async (rosterId, newActivity ) =>{

        try{
            //Creates reference to docuemnt in rosters collection, using roster ID
            const rosterRef = doc(db, 'rosters', rosterId)
            
            //Repalces activity with new data
            await updateDoc(rosterRef, {'data.activity': newActivity})
        }
        catch(err){
            console.log(err.message)
        }

    } 
    
    const handleApprove = async (request) =>{

        Swal
        .fire({
            text: `Do you want to approve this swap?`,
            icon: 'info',
            iconColor: '#FFC106',
            confirmButtonText: 'Approve',
            showDenyButton: true,
            denyButtonText:'Not now',
            buttonsStyling: false,
            customClass:{
                confirmButton: 'btn btn-primary alert-btn order-2',
                denyButton: 'btn btn-light alert-btn order-1',
                popup: 'alert-container'
            }
        })
        .then((res)=>{
            if(res.isConfirmed){
                //If a confirmation is received, calls function that handles the swap
                approveSwap(request)
            }
        })
        
        
        
    }
    
    const approveSwap = async (request)=>{

        //Turns loader on
        setIsLoading(true)

        try{
            //Gets current roster from requester user to edit and update it    
            const docSnap = await getDoc(doc(db, 'rosters', request.requester.rosterId))
            if(docSnap.exists()){
    
                //Calls function that returns updated activity for both rosters
                const requesterNewActivity = updateActivity(docSnap.data().data.activity, request.receptor)
                const receptorNewActivity = updateActivity(currentRoster.data.activity, request.requester)
                
                //Sends changes to rosters in db
                await updateRosterInDb(currentRoster.id, receptorNewActivity)
                await updateRosterInDb(request.requester.rosterId, requesterNewActivity)
    
                //Once rosters have been updated, deletes swap request
                await deleteSwapRequest(request.requestId)
    
                //Once request have been deleted, deletes flight offers from offer board
                await deleteFlightOffer(request)
                
                //Updates users' roster and open requests
                getAllRequests()
                getUserRosters()
                
                //Sets loder to false
                setIsLoading(false)
                
                //Returns success message
                return(
                    Swal
                    .fire({
                        title: 'Flight Swap approved!',
                        text: `You will see your new activity reflected in your roster`,
                        icon: 'success',
                        confirmButtonText: 'Go to Roster',
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
                            //Shows manage Requests section
                            navigate('/roster')
                        }
                    })
                )
    
            }
        }
        catch(err){
            setIsLoading(false)
            return(
                Swal
                .fire({
                    title: 'Oops!',
                    text: 'We could not approve this request now. Please try again later.',
                    icon: 'warning',
                    confirmButtonText: 'Ok',
                    buttonsStyling: false,
                    customClass:{
                        confirmButton: 'btn btn-primary alert-btn order-2',
                        popup: 'alert-container'
                    }
                })
            )
        }

    }

    //EFFECTS
    useEffect(()=>{

        //Enables button when own flight and other flight are selected
        selectedOffers.requester && selectedOffers.receptor ?
        setBtnDisabled(false) : setBtnDisabled(true)

    },[selectedOffers]) 

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
            <h2>Flight Swap</h2>
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
                            <p className='mt-4'>There are no offered flights</p>
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
                            {myRequests.length > 0?
                            <>
                            {
                                myRequests.map((request,idx)=>{
                                    return (
                                        <SwapCard request={request} deleteSwapRequest={deleteSwapRequest} handleApprove={handleApprove} key={idx} setIsLoading={setIsLoading} getAllRequests={getAllRequests}/>
                                    )
                                })
                            }
                            </>
                            :
                            //If user have no requests
                            <p className='mt-6'>You have no open requests</p>
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