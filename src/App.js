import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import DancingSnek from './pages/dancingsnek';
import Gallery from './pages/gallery';


function App() {
  return (
    <HashRouter>
            <Routes>
                <Route path = "/" element = {<DancingSnek/>}/>
                <Route path="/gallery" element={<Gallery/>} />
            </Routes>
        </HashRouter>
  );
}

export default App;
