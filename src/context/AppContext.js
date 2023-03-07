import { createContext, useState , useEffect, useCallback} from "react";
import app from "../fb";
import { getFirestore } from "firebase/firestore";
import {getDoc, doc, collection, query,deleteDoc, where, getDocs,updateDoc,FieldPath} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AppContext = createContext()
const {Provider} = AppContext

//Initialize Cloud Firestore and get reference to the service
const db = getFirestore(app)

//Initalize Firebase
const auth = getAuth(app)

const AppProvider = ({children}) => {


    //STATES
    const [globalUser, setGlobalUser] = useState(null)
    const [currentRoster, setCurrentRoster] = useState(null)
    const [myRequests, setMyRequests] = useState([])

    //FUNCTIONS

    const addZero = (input) =>{
        
        //Adds a 0 behind if day/month values are 1 digit:
        if(input<10){
            let output = '0'+ input
            return output
        }
        else return input
    }

    const capitalizeWords = (string) =>{
        return(
            string
                .toLowerCase()
                .split(' ')
                .map((word)=>word.charAt(0).toUpperCase()+word.slice(1))
                .join(' ')
        )
    }



    //This will me a memoized function that will be recreated when globalUser (in dependency array) changes. This function gets all rosters for user stored in globalUser
    const getUserRosters = useCallback(() =>{
            
            //Creates query for Firebase 
            const crewIdRef = new FieldPath('data', 'crewId');
            const q = query(collection(db, "rosters"), where(crewIdRef, "==", globalUser.employeeId));

            //Gets seconds of current month 1st day, to match the desired roster published date in seconds.
            const d = new Date()
            const publishedDate = new Date(d.getFullYear(),d.getMonth(),1).getTime()/1000

            //Calls FB function to get all documents thats match the query ('crewId' == 'employeeId')
            getDocs(q)
                .then((querySnapshot)=>{

                    querySnapshot.forEach(doc=>{

                        //Checks if published date matches current month, sets state with current Roster
                        if(doc.data().data.published.seconds === publishedDate){
                           
                            setCurrentRoster({
                                id: doc.id,
                                data: doc.data().data
                            })
                        }
                    })
                })
                .catch((err)=>{console.error(err.message)})

    },[globalUser])

    //Gets all swap requests
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

    //Update flightOffered Status in roster
    const updateIsOffrededInRoster = (offeredFlight) =>{

        const newActivity = currentRoster.data.activity.map(flight=>{

            //If flight matches any of the offeredFlights, sets isOffered to opposite boolean
            if (flight.flightId === offeredFlight.outboundFlight.flightId ||offeredFlight.inboundFlight.flightId === flight.flightId){
                
                return{
                    ...flight,
                    isOffered: !flight.isOffered
                }
            }
            return(flight)
        })

        //Creates new roster to update in db and state
        let updatedRoster = {
            ...currentRoster, 
            data: {...currentRoster.data, activity: newActivity}
        }

        //Reference to user's Roster:
        const userRosterRef = doc(db, "rosters", currentRoster.id)
        
        //Updates in db
        updateDoc(userRosterRef,updatedRoster)
            //If succeeds, sets new state
            .then(()=>setCurrentRoster(updatedRoster))
            .catch((err)=>console.error(err.message))
    }


    //This function gets user info from DB and stores is in a State
    const updateContextUser = (email)=>{

            //Creates reference to doc, looking for a doc containing user's email 
            const docRef = doc(db, 'users', email)
            getDoc(docRef)
            .then((snapshot)=>{

                //If this document exists
                if(snapshot.exists()){
    
                    //Updates state with user information
                    setGlobalUser(snapshot.data())
                }
            })
            .catch((err)=>{console.error(err.message)})
    }

    useEffect(()=>{

        //If globalUser is set, calls fn to get user's rosters
        if(globalUser){

            getUserRosters()
        }

    },[globalUser,getUserRosters])
    
    
    useEffect(()=>{
        
        //Calls FIrebase function when app mounts
        onAuthStateChanged(auth, (fbUser)=>{
            
            if(fbUser){
                
                //If an user is found, calls fn to update context User
                updateContextUser(fbUser.email)
            }
            else{

                //If not, sets context User to null (SignOut)
                setGlobalUser(null)
            }
        })

    },[])
    
    return(

        <Provider value={{
            globalUser,
            currentRoster,
            myRequests,
            addZero,
            capitalizeWords,
            updateIsOffrededInRoster,
            getUserRosters,
            getAllRequests          
        }}>
            {children}
        </Provider>
    )


}

export {AppContext, AppProvider}