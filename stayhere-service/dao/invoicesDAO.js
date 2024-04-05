const mongoose = require('mongoose');
const invoiceItemsDAO = require('./invoiceItemsDAO');
const bookingsDAO = require('./bookingsDAO');
const { format } = require('date-fns');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    InvoiceId: Number,
    InvoiceNumber: String,
    BookingId: Number,
    Receiver: String,
    Address: String,
    IssueDate: Date,
    DueDate: Date,
    Guests: Number,
    Description: String,
    Items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InvoiceItem'
    }]
})

class InvoicesDAO {
    invoiceModel = null;

    createSchema = () => {
        invoiceSchema.plugin(AutoIncrement, { inc_field: 'InvoiceId' })
        this.invoiceModel = mongoose.model("Invoice", invoiceSchema)
    }

    getByInvoiceId = async (invoiceId) => {
        return await this.invoiceModel.findOne({ InvoiceId: invoiceId }).populate("Items")
    }

    createInvoiceByBookingId = async (bookingId) => {
        const booking = await bookingsDAO.getByBookingId(bookingId)

        const existingInvoice = await this.invoiceModel.findOne({ BookingId: booking.BookingId })
        if (existingInvoice)
            return existingInvoice.InvoiceId

        const today = new Date();
        today.setHours(0, 0, 0, 0)

        const invoice = await this.invoiceModel.create({
            InvoiceNumber: `${format(today, "yyyyMMdd")}${"00" + booking.BookingId}`,
            BookingId: booking.BookingId,
            Receiver: `${booking.Customer.FirstName} ${booking.Customer.LastName}`,
            Address: `${booking.Customer.Address}`,
            IssueDate: today,
            DueDate: today.setDate(today.getDate() + 30),
            Guests: booking.Guests,
            Description: `Stay Here room from ${format(booking.CheckIn, "dd/MM/yyyy")} to ${format(booking.CheckOut, "dd/MM/yyyy")} for ${booking.Guests} guest(s)`
        })

        const invoiceItem = await invoiceItemsDAO.create({
            InvoiceId: invoice.InvoiceId,
            Price: booking.FinalPrice,
            Description: "Room"
        })

        await this.invoiceModel.findOneAndUpdate({ InvoiceId: invoice.InvoiceId }, { Items: [invoiceItem] })

        return invoice.InvoiceId
    }
}


module.exports = new InvoicesDAO()