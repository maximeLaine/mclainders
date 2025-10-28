import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FallbackPage from "./pages/FallbackPage";
import "./index.css";

// Try to render the app, fall back to a simple page if there's an error
try {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  // Render a simple fallback page if app fails to initialize
  ReactDOM.createRoot(document.getElementById("root")).render(
    <FallbackPage />
  );
}
