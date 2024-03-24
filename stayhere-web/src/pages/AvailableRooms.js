import { useSearchParams } from "react-router-dom";
import Rooms from "./Rooms";
import { differenceInCalendarDays } from "date-fns";

const AvailableRooms = () => {
  const [searchParams] = useSearchParams();
  const totalDays = differenceInCalendarDays(searchParams.get("checkout"), searchParams.get("checkin"));
  const rooms = [
    {
      RoomId: 1,
      Capacity: 2,
      Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      Price: 100
    },
    {
      RoomId: 2,
      Capacity: 3,
      Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      Price: 150
    }
  ]
  return (
    <>
      <h2 className="text-center">Available Rooms</h2>
      <div className="row m-2">
        <span className="col-4">Check-in: {searchParams.get("checkin")}</span>
        <span className="col-4">Check-out: {searchParams.get("checkout")}</span>
        <span className="col-4">Guests: {searchParams.get("guests")}</span>
      </div>
      <Rooms rooms={rooms} totalDays={totalDays} />
    </>
  )
};

export default AvailableRooms;