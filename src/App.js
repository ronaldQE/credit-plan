import * as React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import NavBar from './components/NavBar';
import Contacts from './pages/Contacts';
import InterestRate from './pages/InterestRate';


function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/financial-mathematics' element={<Home/>}></Route>
      <Route path='/tasa' element={<InterestRate/>}></Route>
      <Route path='/sim' element={<Simulation/>}></Route>
      <Route path='/cont' element={<Contacts/>}></Route>
      <Route path='*' element={<Navigate replace to="/financial-mathematics"/>}></Route>
    </Routes>
   
    </BrowserRouter>
  );
}

export default App;
