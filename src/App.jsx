import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import DancingSnek from './pages/dancingsnek';
import Gallery from './pages/gallery';
import Commissions from './pages/comms';

function preloadImage(src){
  const toPreload = new Image();
  toPreload.src = src 
  window[src] = toPreload
}

function App() {

  preloadImage("assets/shake him.gif")
  preloadImage("assets/favicon.ico")
  preloadImage("assets/gangnamsnake.webp")
  
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
