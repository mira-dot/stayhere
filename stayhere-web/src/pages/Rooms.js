import { useContext, useState } from "react";
import BookingForm from "./BookingForm";
import { MyGlobalContext } from "..";

const Rooms = ({ rooms, totalDays }) => {
    const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({});
    const { checkIn, checkOut, guests } = useContext(MyGlobalContext);
    const book = (room) => {
        setBookingDetails({
            RoomId: room.RoomId,
            CheckIn: checkIn,
            CheckOut: checkOut,
            Guests: guests,
            FinalPrice: totalDays * room.Price
        });
        setIsBookingFormVisible(true)
    }

    return (
        <>
            {
                rooms.map(room =>
                    <div className="row m-2 border border-1 border-primary p-2 bg-secondary" key={room.RoomId}>
                        <div className="col-2">
                            <span className="d-block">RoomId: {room.RoomId}</span>
                            <span className="d-block">Capacity: {room.Capacity}</span>
                        </div>
                        <div className="col-6">{room.Description}</div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col-6">
                                    <span className="d-block">Price per night: {room.Price} EUR</span>
                                    <span className="d-block">Total Price {totalDays} night(s): {room.Price * totalDays} EUR</span>
                                    <button onClick={e => book(room)} type="button" className="btn btn-primary text-center w-50 mt-2">BOOK {">"}</button>
                                </div>
                                <div className="col-6">
                                    <img className="float-end" height={100} src={`/images/room_${room.RoomId}.png`} alt={`Room ${room.RoomId}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <BookingForm bookingDetails={bookingDetails} visible={isBookingFormVisible} onClose={() => setIsBookingFormVisible(false)} />
        </>
    )
}

export default Rooms;