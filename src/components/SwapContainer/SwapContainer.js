import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons"
import app from '../../fb'
import WidgetLoader from '../WidgetLoader/WidgetLoader'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

//Initialize firestore
const db = getFirestore(app)

export default function SwapContainer () {

    //STATES
    const [isLoading, setIsLoading] = useState(true)
    const [allFlightOffers, setAllFlightOffers] = useState([])
    
    useEffect(()=>{

        setIsLoading(true)

        //Sets empty array for flightOffers
        let offerArray = []

        //Gets all flight offers from db
        const getAllFlightOffers = ()=>{
            getDocs(collection(db,'flightOffers'))
                .then(snap=>{
                    snap.forEach(doc=>{
                        offerArray.push(doc.data())
                    })
                })
                .finally(()=>{
                    setAllFlightOffers(offerArray)
                    setIsLoading(false)
                })
                .catch(err=>console.log(err.message))

        }
        getAllFlightOffers()

    },[])


    return(
        <div className="swap-main-container col-10">
            <h2>Flight swap</h2>
            <div className="main d-flex row ">
                <div className="swap-inner-container col-5">
                    <h3>Your open flights</h3>
                    {
                        isLoading?
                        <WidgetLoader/>
                        :
                        <p>OfferCard</p>
                    }
                </div>
                <div className="col-2 swap-middle-btn-container">
                    <div className='swap-middle-btn-div btn'>
                        <FontAwesomeIcon icon={faArrowsRotate}/>
                    </div>
                </div>
                <div className="swap-inner-container col-5">
                    <h3>Open flights</h3>
                </div>
            </div>
            <div className="main d-flex row">
                <div className="swap-inner-container col-12">
                    <h3>Requests</h3>
                </div>
            </div>
        </div>
    )
}