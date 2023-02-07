import { useState } from 'react';
import Home from './views/Home/Home'
import Login from './views/Login/Login';
import Loader from './components/Loader/Loader';
import app from './fb'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


//Initalize Firebase
const auth = getAuth(app)

function App() {

  const [globalUser, setGlobalUser]= useState(null)
  const [isLoading, setIsLoading] = useState(true)
  // const [userCreated, setUserCreated] = useState(null)

  onAuthStateChanged(auth, (fbUser) =>{
    if(fbUser){
      setGlobalUser(fbUser)
      console.log(globalUser)
    } else{
      setGlobalUser(null)
    }
    setIsLoading(false)
  })

  const activeUser = sessionStorage.getItem('activeUser')
  console.log(activeUser)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={
            isLoading ? <Loader/> :
            <>
              {globalUser ? <Home/> : <Login/>} 
            </>
          }/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
