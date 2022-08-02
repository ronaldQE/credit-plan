
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import NavBar from './components/NavBar';


function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/sim' element={<Simulation/>}></Route>
    </Routes>
   
    </BrowserRouter>
  );
}

export default App;
