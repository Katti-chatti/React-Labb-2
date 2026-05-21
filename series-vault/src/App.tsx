import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SeriesPage from "./pages/SeriesPage";
import AddSeriesPage from "./pages/AddSeriesPage";
import SeriesDetailsPage from "./pages/SeriesDetailsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app-container">

      <Navbar />
       
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/series/:id" element={<SeriesDetailsPage />} />
        <Route path="/add-series" element={<AddSeriesPage />} />
      </Routes>
    </div>
  );
}

export default App;