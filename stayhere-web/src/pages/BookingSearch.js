const BookingSearch = () => {
    return (
        <div className="border border-1 mt-3">
            <h3 className="text-center">Booking</h3>
            <div className="p-3">
                <label className="form-label" htmlFor="checkin">Check-In</label>
                <input className="form-control" id="checkin" type="date" placeholder="Check-In"/>
                <label className="form-label" htmlFor="checkout">Check-Out</label>
                <input className="form-control" id="checkout" type="date" placeholder="Check-Out"/>
                <label className="form-label" htmlFor="guests">Guests</label>
                <input className="form-control" id="checkout" type="number" placeholder="Guests"/>
                <div className="row justify-content-center">
                    <button type="button" className="btn btn-primary text-center w-50 mt-3">BOOK NOW >></button>
                </div>
            </div>
        </div>
    )
}

export default BookingSearch;