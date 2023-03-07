import { AppContext } from "../../context/AppContext"
import { useContext, useState , useEffect} from "react"
import {Link} from 'react-router-dom'

export default function SwapRequests (){

    ///CONTEXT
    const {getAllRequests,myRequests} = useContext(AppContext)

    useEffect(()=>{

        //Gets users Requests
        getAllRequests()

    },[getAllRequests])

    return(
        <div className="widget-container col-4">
            <div className="widget-border">
                <h3>Swap Requests</h3>
                <div className="swap-wid-main">
                {myRequests.length>0?
                    <div className="swap-detail-wid">
                        <div className="d-flex align-items-center">
                            <span></span>
                            <p>You have {myRequests.length} open {myRequests.length===1?'request':'requests'}</p>
                        </div>
                        <p>Manage your requests from Flight Swap</p>
                        <Link to='/swap' className='btn go-swap-btn'> Flight Swap</Link>
                    </div>

                    :
                    <p>You have no open requests.</p>
                }
                </div>
            </div>
        </div>
    )
}