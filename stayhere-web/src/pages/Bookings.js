import axios from "axios";
import { format, toDate } from "date-fns";
import { useEffect, useState } from "react";

const Bookings = () => {
    const [errorValue, setErrorValue] = useState("");
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/booking/get`)
            .then((response) => {
                if (response.status !== 200)
                    setErrorValue(response.statusText)
                else
                    setBookings(response.data);
            })
    }, [])

    const changeStatus = (bookingId, status) => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/booking/status/${bookingId}/${status}`)
            .then((response) => {
                if (response.status !== 200)
                    setErrorValue(response.statusText)
                else {
                    setBookings((state) => {
                        return state.map(item => {
                            if (item.BookingId === bookingId)
                                return response.data
                            return item
                        })
                    })
                }
            })
    }

    const issueInvoice = (bookingId) => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/booking/create-invoice/${bookingId}`)
            .then((response) => {
                if (response.status !== 200)
                    setErrorValue(response.statusText)
                else {
                    const newWindow = window.open(`/invoice?invoiceId=${response.data.invoiceId}`, '_blank', 'noopener,noreferrer')
                    if (newWindow) newWindow.opener = null
                }
            })
    }

    const mailTo = (booking) => {
        const lineBreak = "%0D%0A"
        const subject = `Stay Here booking #${booking.BookingId} confirmation`
        let body = `Dear ${booking.Customer.FirstName} ${booking.Customer.LastName}, ${lineBreak}We are happy to inform you that your booking is confirmed!`
        body += lineBreak + lineBreak
        body += `Check-in: ${format(booking.CheckIn, "dd/MM/yyyy")}`
        body += lineBreak;
        body += `Check-out: ${format(booking.CheckOut, "dd/MM/yyyy")}`
        body += lineBreak + lineBreak
        body += `We can’t wait to see you!${lineBreak}Stay Here Team`
        return `mailto:${booking.Customer.Email}?subject=${subject}&body=${body}`
    }

    return (
        <>
            <h2 className="text-center">Bookings Table</h2>
            {errorValue.length > 0 && <div className="text-white text-center strong bg-danger">{errorValue}</div>}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="bg-secondary">Booking Id</th>
                        <th className="bg-secondary">Customer</th>
                        <th className="bg-secondary">Room Id</th>
                        <th className="bg-secondary">Check-in</th>
                        <th className="bg-secondary">Check-out</th>
                        <th className="bg-secondary">Guests</th>
                        <th className="bg-secondary">Final Price</th>
                        <th className="bg-secondary">Status</th>
                        <th className="bg-secondary"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map(booking =>
                            <tr key={booking.BookingId}>
                                <td>{booking.BookingId}</td>
                                <td>
                                    <span className="text-danger">Name:</span> {booking.Customer.FirstName} {booking.LastName}<br />
                                    <span className="text-danger">Email:</span> <a href={mailTo(booking)}>{booking.Customer.Email}</a><br />
                                    <span className="text-danger">Address:</span> {booking.Customer.Address}<br />
                                    <span className="text-danger">Payment Type:</span> {booking.PaymentType}<br />
                                    <span className="text-danger">Comment:</span> {booking.Customer.Comment}<br />
                                </td>
                                <td>{booking.RoomId}</td>
                                <td>{format(toDate(booking.CheckIn), "dd/MM/yyyy")}</td>
                                <td>{format(toDate(booking.CheckOut), "dd/MM/yyyy")}</td>
                                <td>{booking.Guests}</td>
                                <td>{booking.FinalPrice}</td>
                                <td>{booking.Status}</td>
                                <td>
                                    <button onClick={e => changeStatus(booking.BookingId, "ACCEPTED")} type="button" className="btn btn-secondary mx-2">Accept {">"}</button>
                                    <button onClick={e => changeStatus(booking.BookingId, "DECLINED")} type="button" className="btn btn-secondary mx-2">Decline {">"}</button>
                                    <button onClick={e => changeStatus(booking.BookingId, "CHECKEDIN")} type="button" className="btn btn-secondary mx-2">Check-in {">"}</button>
                                    <button onClick={e => changeStatus(booking.BookingId, "CHECKEDOUT")} type="button" className="btn btn-secondary mx-2">Check-out {">"}</button>
                                    <button onClick={e => issueInvoice(booking.BookingId)} type="button" className="btn btn-secondary mx-2">Invoice {">"}</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default Bookings;