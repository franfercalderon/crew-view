import Home from './views/Home/Home'
import Roster from './views/Roster/Roster';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AppProvider } from './context/AppContext';
import FlightSwap from './views/FlightSwap/FlightSwap';
import Airborne from './views/Airborne/Airborne';
import RosterBuilder from './views/RosterBuilder/RosterBuilder';



function App() {

  return (
    <>
    <BrowserRouter >
      <AppProvider>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/roster' element={<Roster/>}/>
          <Route exact path='/swap' element={<FlightSwap/>}/>
          <Route exact path='/airborne' element={<Airborne/>}/>
          <Route exact path='/rosterbuilder' element={<RosterBuilder/>}/>
        </Routes>
      </AppProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
