import { useSearchParams } from "react-router-dom";
import Rooms from "./Rooms";
import { differenceInCalendarDays } from "date-fns";
import { useEffect, useState } from "react";

const AvailableRooms = () => {
  const api = "http://localhost:3001";
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [errorValue, setErrorValue] = useState("");
  const totalDays = differenceInCalendarDays(searchParams.get("checkout"), searchParams.get("checkin"));
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const guests = searchParams.get("guests");
  useEffect(() => {
    setErrorValue("");
    fetch(`${api}/rooms/get?checkin=${checkin}&checkout=${checkout}&guests=${guests}`)
      .then((response) => {
        if (!response.ok) {
          setErrorValue(response.statusText)
          return [];
        }
        else
          return response.json();
      }).then((parsedJson) => {
        if (parsedJson.errorString?.length > 0) {
          setErrorValue(parsedJson.errorString);
        } else {
          setRooms(Array.from(parsedJson));
        }
      })
      .catch(error => setErrorValue(error));
  }, [checkin, checkout, guests]);

  return (
    <>
      <h2 className="text-center">Available Rooms</h2>
      <div className="row m-2">
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