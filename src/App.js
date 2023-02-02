import { useState } from 'react';
import Home from './views/Home/Home'
import Login from './views/Login/Login';
import app from './fb'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//Initalize Firebase
const auth = getAuth(app)

function App() {

  const [globalUser, setGlobalUser]= useState(null)

  onAuthStateChanged(auth, (fbUser) =>{
    // console.log(fbUser)
    if(fbUser){
      setGlobalUser(fbUser)
    } else{
      setGlobalUser(null)
    }
  })

  return (
    <>
      {globalUser ? <Home/> : <Login/> }
    </>
  );
}

export default App;
