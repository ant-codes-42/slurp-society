import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";

import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}

