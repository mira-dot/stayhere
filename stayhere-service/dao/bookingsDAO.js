const mongoose = require('mongoose');
const customersDAO = require('./customersDAO');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
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

class BookingsDAO {
    bookingModel = null

    createSchema = () => {
        bookingSchema.plugin(AutoIncrement, { inc_field: 'BookingId' })
        this.bookingModel = mongoose.model("Booking", bookingSchema)
    }

    getAll = async () => {
        return await this.bookingModel.find({}).populate("Customer")
    }

    getByBookingId = async (bookingId) => {
        return await this.bookingModel.findOne({ BookingId: bookingId }).populate("Customer");
    }

    create = async (booking) => {
        const customer = await customersDAO.create(booking)
        return await this.bookingModel.create({ ...booking, CustomerId: customer.CustomerId, Customer: customer })
    }

    changeStatus = async (bookingId, status) => {
        return await this.bookingModel.findOneAndUpdate({ BookingId: bookingId }, { Status: status }, { new: true }).populate("Customer");
    }
}

module.exports = new BookingsDAO()