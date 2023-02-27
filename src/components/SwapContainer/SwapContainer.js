import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons"
import app from '../../fb'
import WidgetLoader from '../WidgetLoader/WidgetLoader'
import FlightOfferCard from '../FlightOfferCard/FlightOfferCard'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useEffect, useState , useContext} from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

//Initialize firestore
const db = getFirestore(app)

export default function SwapContainer () {

    //CONTEXT
    const {globalUser} = useContext(AppContext)

    //STATES
    const [isLoading, setIsLoading] = useState(true)
    const [myOffers, setMyOffers] = useState([])
    const [flightOffers, setFlightOffers] = useState([])
    const [selectedOffers, setSelectedOffers] = useState([])


    const handleSelect = (e) =>{
        const offer = JSON.parse(e.target.value)
        console.log(offer)
        // if(e.target.checked){
        //     // console.log(e.target.value)
        //     setSelectedOffers([...selectedOffers,e.target.value])
        // }
    }

    // useEffect(()=>{

    //     if(selectedOffers.length === 2){
    //         selectedOffers.map((offer)=>{
    //             console.log(offer)
    //             return(console.log(offer.outboundFlight.departure.airportCode))
    //         })
    //     }


    // },[selectedOffers])
    
    useEffect(()=>{

        setIsLoading(true)
        
        //Gets all flight offers from db
        const getAllFlightOffers = ()=>{

            //Sets empty array for flightOffers
            let myFlightsArray = []
            let otherFlightsArray = []

            getDocs(collection(db,'flightOffers'))
                .then(snap=>{
                    snap.forEach(doc=>{
                        if(doc.data().crewId === globalUser.employeeId){
                            console.log('vuelo del usuario')
                            myFlightsArray.push(doc.data())
                        }
                        else{
                            console.log('vuelo de otros')
                            otherFlightsArray.push(doc.data())
                        }
                        
                    })
                })
                .finally(()=>{
                    setMyOffers(myFlightsArray)
                    setFlightOffers(otherFlightsArray)  
                    setIsLoading(false)
                })
                .catch(err=>console.log(err.message))

        }
        getAllFlightOffers()

    },[globalUser])


    return(
        <div className="swap-main-container col-10">
            <h2>Flight swap</h2>
            <div className="main d-flex row ">
                <div className="swap-inner-container col-5">
                    <div className='swap-wid-title'>

                        <h3>Select your open flights</h3>
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
                            <p className='mt-4'>You have no open flights</p>
                            <p>Manage flights from roster</p>
                            <Link to='/roster' className='btn go-roster-btn'>Go to roster</Link>
                        </>
                        }
                        </div>
                    }
                </div>
                <div className="col-2 swap-middle-btn-container">
                    <div className='swap-middle-btn-div btn'>
                        <FontAwesomeIcon icon={faArrowsRotate}/>
                    </div>
                </div>
                <div className="swap-inner-container col-5">
                    <div className='swap-wid-title'>
                        <h3>Colleagues open flights</h3>
                    </div>
                    {
                        isLoading?
                        <WidgetLoader/>
                        :
                        <div className='flight-offer-card-container'>
                        {flightOffers.length > 0 ?
                            <>
                            {flightOffers.map((offer,idx)=><FlightOfferCard offer={offer} handleSelect={handleSelect} key={idx}/>)}
                            </>
                        :                       
                            <p className='mt-4'>There are no offered flights</p>
                        }
                        </div>
                    }
                </div>
            </div>
            <div className="main d-flex row">
                <div className="swap-inner-container col-12">
                    <div className='swap-wid-title'>
                        <h3>Manage your requests</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}