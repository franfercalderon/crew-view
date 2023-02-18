import { createContext, useState , useEffect, useCallback} from "react";
import app from "../fb";
import { getFirestore } from "firebase/firestore";
import {getDoc, doc, collection, query, where, getDocs} from 'firebase/firestore'
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

    //FUNCTIONS

    //This will me a memoized function that will be recreated when globalUser (in dependency array) changes. This function gets all rosters for user stored in globalUser
    const getUserRosters = useCallback(() =>{

            //Declares empty array to be filled later.
            let rostersArray = []

            //Creates query for Firebase 
            const q = query(collection(db, "rosters"), where("crewId", "==", globalUser.employeeId));

            //Calls FB function to get all documents thats match the query ('crewId' == 'employeeId')
            getDocs(q)
                .then((querySnapshot)=>{
                    querySnapshot.forEach(doc=>{

                        //Pushes each doc to the array
                        rostersArray.push(doc.data())
                    })
                })
                .then(()=>{
                    getCurrentRoster(rostersArray)
                })
                .catch((err)=>{console.error(err.message)})

    },[globalUser])
    
    //This function return the current month roster
    const getCurrentRoster = (rostersArray) => {

        if(rostersArray.length > 0){

            //Gets current timestamp in seconds
            const currentDate =  Math.round(Date.now()/1000)
    
            //Creates a roster array including only those where 'published' date is in the past
            const pastRosters = rostersArray.filter(roster =>{
                return(
                    roster.published.seconds <= currentDate
                )
            })
    
            //Sorts past rosters by published date and gets the biggest result (it will be the closest to currentDate)
            const thisMonthRoster = pastRosters.sort((a,b) => a.published.seconds - b.published.seconds).reverse()[0]
            
            //Stores roster in State
            return(setCurrentRoster(thisMonthRoster))
        }
        else{
            setCurrentRoster({})
        }
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
            currentRoster                            
        }}>
            {children}
        </Provider>
    )


}

export {AppContext, AppProvider}