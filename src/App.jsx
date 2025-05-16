import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import OurStoryPage from './pages/OurStoryPage';
import TravelPage from './pages/TravelPage';
import RegistryPage from './pages/RegistryPage';
import RSVPPage from './pages/RSVPPage';

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notre-clan" element={<OurStoryPage />} />
            <Route path="/voyage" element={<TravelPage />} />
            <Route path="/liste-de-mariage" element={<RegistryPage />} />
            <Route path="/rsvp" element={<RSVPPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
