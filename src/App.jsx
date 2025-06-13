import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import OurStoryPage from './pages/OurStoryPage';
import AccommodationPage from './pages/AccommodationPage';
import BeaujolaisPage from './pages/BeaujolaisPage';
import RSVPPage from './pages/RSVPPage';
import WeNeedYouPage from './pages/WeNeedYouPage';

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notre-clan" element={<OurStoryPage />} />
            <Route path="/logement" element={<AccommodationPage />} />
            <Route path="/beaujolais" element={<BeaujolaisPage />} />
            <Route path="/rsvp" element={<RSVPPage />} />
            <Route path="/nous-avons-besoin-de-vous" element={<WeNeedYouPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
