import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { MyGlobalContext } from "..";

const BookingForm = ({ bookingDetails, visible, onClose }) => {
    const { setRefreshTime } = useContext(MyGlobalContext);
    const [showThankYou, setShowThankYou] = useState(false);
    const [booking, setBooking] = useState({
        FirstName: {
            value: "",
            isRequired: true,
            isValid: false
        },
        LastName: {
            value: "",
            isRequired: true,
            isValid: false
        },
        Email: {
            value: "",
            isRequired: true,
            isValid: false
        },
        Address: {
            value: "",
            isRequired: true,
            isValid: false
        },
        PaymentType: "CASH",
        Comment: ""
    });

    useEffect(() => {
        setShowThankYou(false)
    }, [bookingDetails])

    const book = (e) => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/booking/create`, {
            FirstName: booking.FirstName.value,
            LastName: booking.LastName.value,
            Email: booking.Email.value,
            Address: booking.Address.value,
            PaymentType: booking.PaymentType,
            Comment: booking.Comment,
            RoomId: bookingDetails.RoomId,
            CheckIn: bookingDetails.CheckIn,
            CheckOut: bookingDetails.CheckOut,
            Guests: bookingDetails.Guests,
            FinalPrice: bookingDetails.FinalPrice,
            Status: "NEW"
        })
            .then(() => { setRefreshTime(new Date()); setShowThankYou(true) })
    }
    const close = (e) => {
        onClose(e);
    }
    const bookingContent = () => {
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <label className="form-label">First Name</label>
                        <input defaultValue={booking.FirstName.value} onChange={e => setBooking(state => ({ ...state, FirstName: { value: e.target.value } }))} className="form-control" type="text" />
                    </div>
                    <div className="col-6">
                        <label className="form-label">Last Name</label>
                        <input defaultValue={booking.LastName.value} onChange={e => setBooking(state => ({ ...state, LastName: { value: e.target.value } }))} className="form-control" type="text" />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6">
                        <label className="form-label">Email</label>
                        <input defaultValue={booking.Email.value} onChange={e => setBooking(state => ({ ...state, Email: { value: e.target.value } }))} className="form-control" type="text" />
                    </div>
                    <div className="col-6">
                        <label className="form-label">Payment</label>
                        <select defaultValue={booking.PaymentType} onChange={e => setBooking(state => ({ ...state, PaymentType: e.target.value }))} className="form-select">
                            <option value="CASH">CASH</option>
                            <option value="CARD">CARD</option>
                        </select>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12">
                        <label className="form-label">Address</label>
                        <input defaultValue={booking.Address.value} onChange={e => setBooking(state => ({ ...state, Address: { value: e.target.value } }))} className="form-control" type="text" />
                    </div>
                    <div className="col-12 mt-3">
                        <label className="form-label">Comment</label>
                        <textarea defaultValue={booking.Comment} onChange={e => setBooking(state => ({ ...state, Comment: e.target.value }))} className="form-control" type="text" />
                    </div>
                </div>
            </div>
        )
    }
    const thankYou = () => {
        return (
            <div className="text-center mt-3 border border-1 p-3">Your booking has been successfully sent. Please wait for confirmation e-mail.</div>
        )
    }

    return (
        <div id="bookFormModal" className="modal" style={{ display: visible ? "block" : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{showThankYou ? "Booking succeeded" : "Enter your details"}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {!showThankYou && bookingContent()}
                        {showThankYou && thankYou()}
                    </div>
                    <div className="modal-footer">
                        {!showThankYou && <button type="button" className="btn btn-primary" onClick={book}>BOOK</button>}
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={close}>{showThankYou ? "CLOSE" : "CANCEL"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingForm;