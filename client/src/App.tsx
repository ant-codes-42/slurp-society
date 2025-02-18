import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Header from "./components/Header";



function App() {

  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App
