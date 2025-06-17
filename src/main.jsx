import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FallbackPage from "./pages/FallbackPage";
import "./index.css";

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

// Try to render the app, fall back to a simple page if there's an error
try {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render the app:', error);
  // Render a simple fallback page
  ReactDOM.createRoot(document.getElementById("root")).render(
    <FallbackPage />
  );
}
