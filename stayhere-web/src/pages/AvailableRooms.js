import { useSearchParams } from "react-router-dom";
import Rooms from "./Rooms";
import { differenceInCalendarDays } from "date-fns";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { MyGlobalContext } from "..";
import axios from "axios";

const AvailableRooms = () => {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [errorValue, setErrorValue] = useState("");
  const totalDays = differenceInCalendarDays(searchParams.get("checkout"), searchParams.get("checkin"));
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const guests = searchParams.get("guests");
  const {
    setCheckIn,
    setCheckOut,
    setGuests,
    refreshTime
  } = useContext(MyGlobalContext)

  useEffect(() => {
    setErrorValue("");
    setCheckIn(checkin);
    setCheckOut(checkout);
    setGuests(guests);

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/room/get-available-rooms?checkin=${checkin}&checkout=${checkout}&guests=${guests}`)
      .then((response) => {
        if (response.status !== 200) {
          setErrorValue(response.statusText)
        }
        else
          setRooms(response.data);
      })
      .catch(error => setErrorValue(error.response?.data ?? "Unknown error"));
  }, [checkin, checkout, guests, setCheckIn, setCheckOut, setGuests, refreshTime]);

  return (
    <>
      <h2 className="text-center">Available Rooms</h2>
      <div className="row m-2 bg-info-subtle border border-1 border-primary">
        <span className="col-4">Check-in: {checkin}</span>
        <span className="col-4">Check-out: {checkout}</span>
        <span className="col-4">Guests: {guests}</span>
      </div>
      {errorValue.length > 0 && <div className="text-white text-center strong bg-danger">{errorValue}</div>}
      <Rooms rooms={rooms} totalDays={totalDays} />
    </>
  )
};

export default AvailableRooms;