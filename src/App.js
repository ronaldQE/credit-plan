import * as React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import NavBar from './components/NavBar';
import Contacts from './pages/Contacts';
import InterestRate from './pages/InterestRate';
import Box from '@mui/material/Box';


function App() {
  return (
    <BrowserRouter basename='/credit-plan'>
    <NavBar/>
    <Box  sx={{px:"8%"}}>
    <Routes >
      <Route path='/credit-plan' element={<Home/>}></Route>
      <Route path='/tasa' element={<InterestRate/>}></Route>
      <Route path='/sim' element={<Simulation/>}></Route>
      <Route path='/cont' element={<Contacts/>}></Route>
      <Route path='*' element={<Navigate replace to="/credit-plan"/>}></Route>
    </Routes>

    </Box>
   
    </BrowserRouter>
  );
}

export default App;
