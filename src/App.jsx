import './App.css';
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import DancingSnek from './pages/dancingsnek';
import Gallery from './pages/gallery';
import Commissions from './pages/comms';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Programming from './pages/programming';
import { GalleryContext, GalleryProvider } from './components/galleryContext';

function preloadImage(src) {
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GalleryProvider><Gallery /></GalleryProvider>} />
          <Route path="/gallery" element={<GalleryProvider><Gallery /></GalleryProvider>} />

          <Route path="/commissions" element={<Commissions />} />
          <Route path="/programming" element={<Programming />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
