// import { , useCuseStateontext } from 'react';
import Home from './views/Home/Home'
// import Login from './views/Login/Login';
// import Loader from './components/Loader/Loader';
// import app from './fb'
// import { getAuth } from 'firebase/auth';
// import {, dogetFirestorec, getDoc} from 'firebase/firestore'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AppProvider } from './context/AppContext';


//Initalize Firebase
// const auth = getAuth(app)

//Initialize Cloud Firestore and get reference to the service
// const db = getFirestore(app)


function App() {

  //CONTEXT
  // const { getUserByEmail, globalUser} = useContext(AppContext)

  // const [globalUser, setGlobalUser]= useState(null)
  // const [isLoading, setIsLoading] = useState(true)
  // const [userCreated, setUserCreated] = useState(null)

  // onAuthStateChanged(auth, (fbUser) =>{
  //   // console.log('hola')

  //   if(fbUser){

  //     if(fbUser){

  //       getUserByEmail(fbUser.email)
  //       setIsLoading(false)
  //     }
      
  //     // console.log(fbUser.email)
  //     // const email = fbUser.email

  //     // const docRef = doc(db, "users", email);
  //     // getDoc(docRef)
  //     //   .then(snapshot =>{

  //     //     if(snapshot.exists()){
  //     //       console.log('existe mugrienta')
  //     //       updateContextUser(snapshot.data())
  //     //       // console.log("Document data:", snapshot.data())

  //     //     }
  //     //     else (console.log('NO ESTA'))
  //     //   }

  //     // )
  //     // const docSnap = await getDoc(docRef);


        

    
  //   }



  //   // if(fbUser){
  //   //   setGlobalUser(fbUser)
  //   //   // console.log(globalUser)
  //   // } else{
  //   //   setGlobalUser(null)
  //   // }
  //   // setIsLoading(false)
  // })

  // const activeUser = sessionStorage.getItem('activeUser')
  // console.log(activeUser)

  return (
    <>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
        </Routes>
      </AppProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
