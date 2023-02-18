import Home from './views/Home/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AppProvider } from './context/AppContext';



function App() {

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
