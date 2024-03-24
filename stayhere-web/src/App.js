import "./App.css";
import Home from "./pages/Home";
import AvailableRooms from "./pages/AvailableRooms";
import Bookings from "./pages/Bookings";
import NoPage from "./pages/NoPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="available-rooms" element={<AvailableRooms />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
