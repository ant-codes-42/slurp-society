import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact.jsx";



function App() {

  return (
    <div>
      <Navbar />
      <Outlet />
      <Contact />
    </div>
  );
}

export default App
