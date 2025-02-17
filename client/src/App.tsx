import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Error from "./pages/ErrorPage";


function App() {

  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Catch-all Route for 404 Error */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App
