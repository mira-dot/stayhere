import { useState } from "react";

const BookingForm = ({ room, visible, onClose }) => {
    const [booking, setBooking] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Address: '',
        PaymentType: 'CASH',
        Comment: ''
    });
    const close = (e) => {
        onClose(e);
    }
    return (
        <div id="bookFormModal" className="modal" style={{ display: visible ? "block" : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Enter your details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}>
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-6">
                                <label className="form-label">First Name</label>
                                <input value={booking.FirstName} onChange={e => setBooking({ FirstName: e.target.value })} className="form-control" type="text" />
                            </div>
                            <div className="col-6">
                                <label className="form-label">Last Name</label>
                                <input value={booking.LastName} onChange={e => setBooking({ LastName: e.target.value })} className="form-control" type="text" />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6">
                                <label className="form-label">Email</label>
                                <input value={booking.Email} onChange={e => setBooking({ Email: e.target.value })} className="form-control" type="text" />
                            </div>
                            <div className="col-6">
                                <label className="form-label">Payment</label>
                                <select value={booking.PaymentType} onChange={e => setBooking({ PaymentType: e.target.value })} className="form-select">
                                    <option value="CASH">CASH</option>
                                    <option value="CARD">CARD</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12">
                                <label className="form-label">Address</label>
                                <input value={booking.Address} onChange={e => setBooking({ Address: e.target.value })} className="form-control" type="text" />
                            </div>
                            <div className="col-12 mt-3">
                                <label className="form-label">Comment</label>
                                <textarea value={booking.Comment} onChange={e => setBooking({ Comment: e.target.value })} className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">BOOK</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={close}>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingForm;