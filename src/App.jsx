import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const OurStoryPage = lazy(() => import('./pages/OurStoryPage'));
const AccommodationPage = lazy(() => import('./pages/AccommodationPage'));
const BeaujolaisPage = lazy(() => import('./pages/BeaujolaisPage'));
const RSVPPage = lazy(() => import('./pages/RSVPPage'));
const WeNeedYouPage = lazy(() => import('./pages/WeNeedYouPage'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notre-clan" element={<OurStoryPage />} />
                <Route path="/logement" element={<AccommodationPage />} />
                <Route path="/beaujolais" element={<BeaujolaisPage />} />
                <Route path="/rsvp" element={<RSVPPage />} />
                <Route path="/nous-avons-besoin-de-vous" element={<WeNeedYouPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
