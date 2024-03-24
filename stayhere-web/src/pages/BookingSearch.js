import { toDate } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingSearch = () => {
    const navigate = useNavigate();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("");

    const handleCheckIn = (e) => {
        setCheckIn(e.target.value);
    };

    const handleCheckOut = (e) => {
        setCheckOut(e.target.value);
    };

    const handleGusts = (e) => {
        setGuests(e.target.value);
    };

    const search = () => {
        if (checkIn === "") {
            alert("Fill in the check-in date");
            return;
        }
        if (toDate(checkIn) < toDate(new Date().toLocaleDateString())) {
            alert("Check-In date must not be less than today!");
            return;
        }
        if (checkOut === "") {
            alert("Fill in the check-out date");
            return;
        }
        if (toDate(checkIn) >= toDate(checkOut)) {
            alert("Check-Out date must be grater than Check-In date!");
            return;
        }
        if (Number(guests) <= 0) {
            alert("Guests must be greater than 0");
            return;
        }

        navigate({
            pathname: "/available-rooms",
            search: `?checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`
        });
    };

    return (
        <div className="border border-1 mt-3">
            <h3 className="text-center">Booking</h3>
            <div className="p-3">
                <label className="form-label" htmlFor="checkin">Check-In</label>
                <input value={checkIn} onChange={handleCheckIn} className="form-control" id="checkin" type="date" placeholder="Check-In" name="checkin" />
                <label className="form-label mt-3" htmlFor="checkout">Check-Out</label>
                <input value={checkOut} onChange={handleCheckOut} className="form-control" id="checkout" type="date" placeholder="Check-Out" name="checkout" />
                <label className="form-label mt-3" htmlFor="guests">Guests</label>
                <input value={guests} onChange={handleGusts} className="form-control" id="checkout" type="number" placeholder="Guests" name="guests" />
                <div className="row justify-content-center">
                    <button onClick={search} type="button" className="btn btn-primary text-center w-50 mt-3">BOOK NOW {">>"}</button>
                </div>
            </div>
        </div>
    );
};

export default BookingSearch;
