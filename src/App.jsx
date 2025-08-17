import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import DancingSnek from './pages/dancingsnek';
import Gallery from './pages/gallery';
import Commissions from './pages/comms';


function App() {

  const loadingChicken = new Image();
  loadingChicken.src = "assets/shake him.gif";
  window["assets/shake him.gif"] = loadingChicken;
  
  return (
    <HashRouter>
            <Routes>
                <Route path = "/" element = {<DancingSnek/>}/>
                <Route path="/gallery" element={<Gallery/>} />
                <Route path="/commissions" element = {<Commissions/>}/>
            </Routes>
        </HashRouter>
  );
}

export default App;
