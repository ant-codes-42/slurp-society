import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import App from "./App";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
import Error from "./pages/ErrorPage";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>,
  );
}

