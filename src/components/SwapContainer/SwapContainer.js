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

        
        //Gets all flight offers from db
        const getAllFlightOffers = ()=>{

            //Sets empty array for flightOffers
            let offerArray = []

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
                    <div className='swap-wid-title'>

                        <h3>Your open flights</h3>
                    </div>
                    {
                        isLoading?
                        <WidgetLoader/>
                        :
                        <div className='flight-offer-card-container'>
                        {allFlightOffers.length > 0 ?
                            <>
                            <div className='flight-offer-card'>
                                <p>MIA</p>
                                <div className='d-flex flex-column'>
                                    <p>Outbound</p>
                                    <p>February 8th</p>
                                    <p>20:00</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <p>Inbound</p>
                                    <p>February 10th</p>
                                    <p>04:20</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <p>Select</p>
                                    <input type='checkbox'/>
                                </div>
                            </div>
                            <div className='flight-offer-card'>
                                <p>MIA</p>
                                <div className='d-flex flex-column'>
                                    <p>Outbound</p>
                                    <p>February 8th</p>
                                    <p>20:00</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <p>Inbound</p>
                                    <p>February 10th</p>
                                    <p>04:20</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <p>Select</p>
                                    <input type='checkbox'/>
                                </div>
                            </div>
                            <div className='flight-offer-card'>
                                <p>MIA</p>
                                <div className='d-flex flex-column'>
                                    <p>Outbound</p>
                                    <p>February 8th</p>
                                    <p>20:00</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <p>Inbound</p>
                                    <p>February 10th</p>
                                    <p>04:20</p>
                                </div>
                                <div className='d-flex flex-column'>
                                    <p>Select</p>
                                    <input type='checkbox'/>
                                </div>
                            </div>
                            </>
                            
                            // <p>Las hay</p>
                        :   
                        <>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
                            <p>No las hay</p>
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