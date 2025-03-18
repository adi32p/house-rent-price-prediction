import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import HousePrediction from "./components/ui/HousePrediction";
import RentForm from "./components/RentForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<RentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
