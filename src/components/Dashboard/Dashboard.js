// import { async } from "@firebase/util"
// import { async } from "@firebase/util"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import Loader from "../Loader/Loader"

export default function Dashboard () {

    //CONTEXT
    const {globalUser, globalRosters, getUserRosters} = useContext(AppContext)

    //STATES
    const [isLoading, setIsLoading]= useState(true)
    // const [userRosters, setUserRosters] = useState([])
    
    // useEffect(()=>{
    //     setUserRosters(globalRosters)
    //     // console.log(userRosters)
    // },[globalRosters])
    // useEffect(()=>{
    //     console.log(globalRosters)
    //     console.log(globalUser)
    // },[])

    // console.log(user)

    // console.log(globalUser)
    // console.log(globalRosters)
    useEffect(()=>{
        getUserRosters()
        setIsLoading(false)
    },[])

    return(
        <>
        <div className="dashboard-main-container container col-10">
            {isLoading ? 
                <Loader/>
                :
                <>
                <h2>Welcome {globalUser.username}</h2>
                <div className="widget-main-container row">

                    <div className="widget-container col-5">
                        <div className="widget-border">
                            <h3>Your next flight</h3>
                        </div>
                    </div>

                    <div className="widget-container col-7">
                        <div className="widget-border">
                            <h3>This month</h3>
                        </div>
                    </div>
                </div>
                <div className="widget-main-container row">
                    <div className="widget-container col-4">
                        <div className="widget-border">
                            <h3>Ground Activity</h3>
                        </div>
                    </div>

                    <div className="widget-container col-4">
                        <div className="widget-border">
                            <h3>Total hours</h3>
                        </div>
                    </div>
                    <div className="widget-container col-4">
                        <div className="widget-border">
                            <h3>Your next flight</h3>
                        </div>
                    </div>
                </div>
                </>
            }
        </div>
        </>
    )
}