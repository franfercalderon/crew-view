import Home from './views/Home/Home'
import Roster from './views/Roster/Roster';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AppProvider } from './context/AppContext';
import FlightSwap from './views/FlightSwap/FlightSwap';



function App() {

  return (
    <>
    <BrowserRouter basename='/crew-view'>
      <AppProvider>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/roster' element={<Roster/>}/>
          <Route exact path='/swap' element={<FlightSwap/>}/>
        </Routes>
      </AppProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
