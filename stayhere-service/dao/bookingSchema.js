const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const createBookingSchema = () => {
    const schema = new Schema({
        BookingId: Number,
        CustomerId: Number,
        RoomId: Number,
        CheckIn: Date,
        CheckOut: Date,
        Guests: Number,
        FinalPrice: Number,
        PaymentType: String,
        Comment: String,
        Status: String,
        Customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        }
    })
    schema.plugin(AutoIncrement, { inc_field: 'BookingId' })

    return mongoose.model("Booking", schema)
}

module.exports = createBookingSchema