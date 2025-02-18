import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import App from "./App";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
import CreateReservation from "./pages/CreateReservation";
import Error from "./pages/ErrorPage";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path ="/Contact" index element ={<Contact />}/>
          <Route path ="/Menu" index element ={<Menu />}/>
          <Route path="reservation" element={<Reservation />} />
          <Route path="reservation/create/:slotId" element={<CreateReservation />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>,
  );
}

