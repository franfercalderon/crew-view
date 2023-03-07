import { AppContext } from "../../context/AppContext"
import { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRightLeft} from "@fortawesome/free-solid-svg-icons"
import Swal from 'sweetalert2'

export default function SwapCard ({request, handleApprove, deleteSwapRequest, setIsLoading, getAllRequests}) {

    //CONTEXT
    const {addZero, globalUser} = useContext(AppContext)

    //STATES
    const [currentUser,setCurrentUser] = useState(null)
    const [otherUser,setOtherUser] = useState(null)

    //DATES
    //REQUESTER FLIGHT
    //Outbound:
    const requesterOutboundDepartureDate = new Date(request.requester.outboundFlight.departure.time.seconds*1000)
    const requesterOutboundArrivalDate = new Date(request.requester.outboundFlight.arrival.time.seconds*1000)

    //Inbound
    const requesterInboundDepartureDate = new Date(request.requester.inboundFlight.departure.time.seconds*1000)
    const requesterInboundArrivalDate = new Date(request.requester.inboundFlight.arrival.time.seconds*1000)

    //DESIRED FLIGHTS
    //Outbound
    const receptorOutboundDepartureDate = new Date(request.receptor.outboundFlight.departure.time.seconds*1000)
    const receptorOutboundArrivalDate = new Date(request.receptor.outboundFlight.arrival.time.seconds*1000)

    //Inbound
    const receptorInboundDepartureDate = new Date(request.receptor.inboundFlight.departure.time.seconds*1000)
    const receptorInboundArrivalDate = new Date(request.receptor.inboundFlight.arrival.time.seconds*1000)

    //Creates accessible object with flights dates
    const offerDates ={

        requester:{

            outbound:{
                day: new Intl.DateTimeFormat('en-US', {weekday:'short'}).format(requesterOutboundDepartureDate),
                month: new Intl.DateTimeFormat('en-US', {month:'short'}).format(requesterOutboundDepartureDate),
                date: addZero(requesterOutboundDepartureDate.getDate()),
                depHours: addZero(requesterOutboundDepartureDate.getHours()),
                depMins: addZero(requesterOutboundDepartureDate.getMinutes()),
                arrHours: addZero(requesterOutboundArrivalDate.getHours()),
                arrMinutes: addZero(requesterOutboundArrivalDate.getMinutes()),
                arrDate: addZero(requesterOutboundArrivalDate.getDate())
            },
            inbound:{
                day: new Intl.DateTimeFormat('en-US', {weekday:'short'}).format(requesterInboundDepartureDate),
                month: new Intl.DateTimeFormat('en-US', {month:'short'}).format(requesterInboundDepartureDate),
                date: addZero(requesterInboundDepartureDate.getDate()),
                depHours: addZero(requesterInboundDepartureDate.getHours()),
                depMins: addZero(requesterInboundDepartureDate.getMinutes()),
                arrHours: addZero(requesterInboundArrivalDate.getHours()),
                arrMinutes: addZero(requesterInboundArrivalDate.getMinutes()),
                arrDate: addZero(requesterInboundArrivalDate.getDate())
            }
        },
        receptor:{
            outbound:{
                day: new Intl.DateTimeFormat('en-US', {weekday:'short'}).format(receptorOutboundDepartureDate),
                month: new Intl.DateTimeFormat('en-US', {month:'short'}).format(receptorOutboundDepartureDate),
                date: addZero(receptorOutboundDepartureDate.getDate()),
                depHours: addZero(receptorOutboundDepartureDate.getHours()),
                depMins: addZero(receptorOutboundDepartureDate.getMinutes()),
                arrHours: addZero(receptorOutboundArrivalDate.getHours()),
                arrMinutes: addZero(receptorOutboundArrivalDate.getMinutes()),
                arrDate: addZero(receptorOutboundArrivalDate.getDate())
            },
            inbound:{
                day: new Intl.DateTimeFormat('en-US', {weekday:'short'}).format(receptorInboundDepartureDate),
                month: new Intl.DateTimeFormat('en-US', {month:'short'}).format(receptorInboundDepartureDate),
                date: addZero(receptorInboundDepartureDate.getDate()),
                depHours: addZero(receptorInboundDepartureDate.getHours()),
                depMins: addZero(receptorInboundDepartureDate.getMinutes()),
                arrHours: addZero(receptorInboundArrivalDate.getHours()),
                arrMinutes: addZero(receptorInboundArrivalDate.getMinutes()),
                arrDate: addZero(receptorInboundArrivalDate.getDate())
            }
        }
    }

    const handleDelete = (id)=>{
        Swal
        .fire({
            text: `Are you sure you want to cancel this request?`,
            icon: 'warning',
            confirmButtonText: 'Delete',
            showDenyButton: true,
            denyButtonText:'No',
            buttonsStyling: false,
            customClass:{
                confirmButton: 'btn btn-primary alert-btn order-2',
                denyButton: 'btn btn-light alert-btn order-1',
                popup: 'alert-container'
            }
        })
        .then(async (res)=>{
            if(res.isConfirmed){    
                    setIsLoading(true)
                    //Deletes request by id
                    await deleteSwapRequest(id)
                    //Updates requests
                    await getAllRequests()
                    setIsLoading(false)
                }
            })
    }

    useEffect(()=>{

        //Assign state that will be used to show user and other crew flight details

        if(globalUser.employeeId === request.requester.crewId){

            setCurrentUser('requester')
            setOtherUser('receptor')
        }
        else{
            setCurrentUser('receptor')
            setOtherUser('requester')
        }
    },[globalUser, request])


    return(
        <>
        {currentUser && otherUser &&

        <div className='flight-offer-card row'>
            <div className='col-5 request-card d-flex border-div align-items-center flex-column'>
                <h5>Your current flight</h5>
                <div className='d-flex justify-content-center airport-div align-items-center'>
                    <p>{request[currentUser].outboundFlight.departure.airportCode.toUpperCase()}</p>
                    <FontAwesomeIcon icon={faRightLeft}/>
                    <p>{request[currentUser].outboundFlight.arrival.airportCode.toUpperCase()}</p>
                </div>
                <div className='d-flex justify-content-evenly col-12'>
                    <p className='col-2 d-flex justify-content-center '>Outbound</p>
                    <p className='col-2 d-flex justify-content-center'>{request[currentUser].outboundFlight.flight.toUpperCase()}</p>
                    <p className='col-3 d-flex justify-content-center'>{offerDates[currentUser].outbound.day+', '+offerDates[currentUser].outbound.month+' '+offerDates[currentUser].outbound.date}</p>
                    <p className='col-2 d-flex justify-content-center'> {offerDates[currentUser].outbound.depHours+':'+offerDates[currentUser].outbound.depMins+'hs'}</p>
                    <p className='col-3 d-flex justify-content-center'>
                        {offerDates[currentUser].outbound.arrHours+':'+offerDates[currentUser].outbound.arrMinutes+'hs'}
                        {offerDates[currentUser].outbound.date!== offerDates[currentUser].outbound.arrDate && ` +${offerDates[currentUser].outbound.arrDate - offerDates[currentUser].outbound.date}`}</p>
                </div>
                <div className='d-flex justify-content-evenly col-12'>
                    <p className='col-2 d-flex justify-content-center '>Inbound</p>
                    <p className='col-2 d-flex justify-content-center'>{request[currentUser].inboundFlight.flight.toUpperCase()}</p>
                    <p className='col-3 d-flex justify-content-center'>{offerDates[currentUser].inbound.day+', '+offerDates[currentUser].inbound.month+' '+offerDates[currentUser].inbound.date}</p>
                    <p className='col-2 d-flex justify-content-center'> {offerDates[currentUser].inbound.depHours+':'+offerDates[currentUser].inbound.depMins+'hs'}</p>
                    <p className='col-3 d-flex justify-content-center'>{offerDates[currentUser].inbound.arrHours+':'+offerDates[currentUser].inbound.arrMinutes+'hs'}{offerDates[currentUser].inbound.date!== offerDates[currentUser].inbound.arrDate && ` +${offerDates[currentUser].outbound.arrDate - offerDates[currentUser].outbound.date}`}</p>
                </div>
            </div>
            <div className='col-5 request-card d-flex border-div align-items-center flex-column desired'>
                <h5>New flight</h5>
                <div className='d-flex justify-content-center airport-div align-items-center'>
                    <p>{request[otherUser].outboundFlight.departure.airportCode.toUpperCase()}</p>
                    <FontAwesomeIcon icon={faRightLeft}/>
                    <p>{request[otherUser].outboundFlight.arrival.airportCode.toUpperCase()}</p>
                </div>
                <div className='d-flex justify-content-evenly col-12'>
                    <p className='col-2 d-flex justify-content-center '>Outbound</p>
                    <p className='col-2 d-flex justify-content-center'>{request[otherUser].outboundFlight.flight.toUpperCase()}</p>
                    <p className='col-3 d-flex justify-content-center'>{offerDates[otherUser].outbound.day+', '+offerDates[otherUser].outbound.month+' '+offerDates[otherUser].outbound.date}</p>
                    <p className='col-2 d-flex justify-content-center'> {offerDates[otherUser].outbound.depHours+':'+offerDates[otherUser].outbound.depMins+'hs'}</p>
                    <p className='col-3 d-flex justify-content-center'>{offerDates[otherUser].outbound.arrHours+':'+offerDates[otherUser].outbound.arrMinutes+'hs'}{offerDates[otherUser].outbound.date!== offerDates[otherUser].outbound.arrDate && ` +${offerDates[otherUser].outbound.arrDate - offerDates[otherUser].outbound.date}`}</p>
                </div>
                <div className='d-flex justify-content-evenly col-12'>
                    <p className='col-2 d-flex justify-content-center '>Inbound</p>
                    <p className='col-2 d-flex justify-content-center'>{request[otherUser].inboundFlight.flight.toUpperCase()}</p>
                    <p className='col-3 d-flex justify-content-center'>{offerDates[otherUser].inbound.day+', '+offerDates[otherUser].inbound.month+' '+offerDates[otherUser].inbound.date}</p>
                    <p className='col-2 d-flex justify-content-center'> {offerDates[otherUser].inbound.depHours+':'+offerDates[otherUser].inbound.depMins+'hs'}</p>
                    <p className='col-3 d-flex justify-content-center'>{offerDates[otherUser].inbound.arrHours+':'+offerDates[otherUser].inbound.arrMinutes+'hs'} {offerDates[otherUser].inbound.date!== offerDates[otherUser].inbound.arrDate && ` +${offerDates[otherUser].outbound.arrDate - offerDates[otherUser].outbound.date}`}</p>
                </div>
            </div>
            <div className='col-1 request-card options d-flex flex-column align-items-center justify-content-around'>
                {request.requester.crewId === globalUser.employeeId?
                    <button disabled className='btn btn-light'>Pending</button>
                :
                    <button  className='btn btn-primary' onClick={()=>handleApprove(request)}>Approve</button>
                }
                <button className='btn btn-danger' onClick={()=>handleDelete(request.requestId)}>Cancel</button>
            </div>
        </div>
        
        }
        </>
    )
}
   