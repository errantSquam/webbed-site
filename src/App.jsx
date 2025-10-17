import './App.css';
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import DancingSnek from './pages/dancingsnek';
import Gallery from './pages/gallery';
import Commissions from './pages/comms';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function preloadImage(src){
  const toPreload = new Image();
  toPreload.src = src 
  window[src] = toPreload
}

function App() {

  preloadImage("assets/shake him.gif")
  preloadImage("favicon.ico")
  //preloadImage("assets/gangnamsnake.webp")
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
              <Routes>
                  <Route path = "/" element = {<DancingSnek/>}/>
                  <Route path="/gallery" element={<Gallery/>} />
                  <Route path="/commissions" element = {<Commissions/>}/>
              </Routes>
          </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
