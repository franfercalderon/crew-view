import { createContext, useState , useEffect} from "react";
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
    const [globalRosters, setGlobalRosters] = useState([])
    // const [isLoading, setIsLoading] = useState(true)

    const getUserRosters = () =>{

        let rostersArray = []

        const q = query(collection(db, "rosters"), where("crewId", "==", globalUser.employeeId));
        getDocs(q)
            .then((querySnapshot)=>{
                querySnapshot.forEach(doc=>{
                    rostersArray.push(doc.data())
                })
            })
            .finally(()=>{
                setGlobalRosters(rostersArray)
            })
    }

    
    const updateContextUser = (email) =>{
        
        //Looks for the user in DB and stores it in context state (globalUser)
        const docRef = doc(db, 'users', email)
        getDoc(docRef)
        .then((snapshot)=>{
            if(snapshot.exists()){

                //Updates state with user information
                setGlobalUser(snapshot.data())
            }
        })
        // .then(()=>{

        //     //Calls fn to get user rosters
        //     getUserRosters()
        // })
        .catch(err=>{
            console.log(err.message)
        })
    }

    // if(globalUser){
    //     getUserRosters()
    // }
    
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
            updateContextUser,
            globalUser,
            globalRosters,
            getUserRosters
            // isLoading
            // getUserByEmail                                 v
        }}>
            {children}
        </Provider>
    )


}

export {AppContext, AppProvider}