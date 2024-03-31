import "./App.css";
import Home from "./pages/Home";
import AvailableRooms from "./pages/AvailableRooms";
import Bookings from "./pages/Bookings";
import NoPage from "./pages/NoPage";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./pages/Header";
import Invoice from "./pages/Invoice";

function App() {
    const location = useLocation();
    return (
        <div>
            {!location.pathname.startsWith("/invoice") && <Header />}
            <div className="container-fluid">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="available-rooms" element={<AvailableRooms />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="invoice" element={<Invoice />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
