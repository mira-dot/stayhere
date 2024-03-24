import { useState } from "react";
import BookingForm from "./BookingForm";

const Rooms = ({ rooms, totalDays }) => {
    const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
    return (
        <>
            {
                rooms.map(room =>
                    <div className="row m-2 border border-1 border-primary p-2" key={room.RoomId}>
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
                                    <button onClick={e => setIsBookingFormVisible(true)} type="button" className="btn btn-primary text-center w-50 mt-2">BOOK {">"}</button>
                                </div>
                                <div className="col-6">
                                    <img className="float-end" height={100} src={`/images/room_${room.RoomId}.png`} alt={`Room ${room.RoomId}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <BookingForm visible={isBookingFormVisible} onClose={() => setIsBookingFormVisible(false)} />
        </>
    )
}

export default Rooms;