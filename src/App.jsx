import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AgendaPage = lazy(() => import('./pages/AgendaPage'));
const AccommodationPage = lazy(() => import('./pages/AccommodationPage'));
const TransportPage = lazy(() => import('./pages/TransportPage'));
const RSVPPage = lazy(() => import('./pages/RSVPPage'));
const WeNeedYouPage = lazy(() => import('./pages/WeNeedYouPage'));
const WeddingListPage = lazy(() => import('./pages/WeddingListPage'));
const ChildrenPage = lazy(() => import('./pages/ChildrenPage'));

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
                <Route path="/deroule" element={<AgendaPage />} />
                <Route path="/hebergements" element={<AccommodationPage />} />
                <Route path="/transport" element={<TransportPage />} />
                <Route path="/confirmez-votre-venue" element={<RSVPPage />} />
                <Route path="/participez" element={<WeNeedYouPage />} />
                <Route path="/liste-de-mariage" element={<WeddingListPage />} />
                <Route path="/enfants" element={<ChildrenPage />} />
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
