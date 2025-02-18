import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact.jsx";
import Header from "./components/Header";



function App() {

  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
      <Contact />
    </div>
  );
}

export default App
