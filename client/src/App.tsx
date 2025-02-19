import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
// import Contact from "./pages/Contact.jsx";
import Header from "./components/Header";

import './App.css';

function App() {

  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
      {/* <Contact /> */}
    </div>
  );
}

export default App
