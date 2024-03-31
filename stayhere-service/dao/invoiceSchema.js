const { format } = require('date-fns');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const createInvoiceSchema = () => {
    const schema = new Schema({
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
    }, {
        statics: {
            async createInvoice(booking) {
                const existingInvoice = await this.findOne({ BookingId: booking.BookingId })
                if (existingInvoice)
                    return existingInvoice.InvoiceId

                const today = new Date();
                today.setHours(0, 0, 0, 0)
                
                const invoice = await this.create({
                    InvoiceNumber: `${format(today, "yyyyMMdd")}${"00" + booking.BookingId}`,
                    BookingId: booking.BookingId,
                    Receiver: `${booking.Customer.FirstName} ${booking.Customer.LastName}`,
                    Address: `${booking.Customer.Address}`,
                    IssueDate: today,
                    DueDate: today.setDate(today.getDate() + 30),
                    Guests: booking.Guests,
                    Description: `Stay Here room from ${format(booking.CheckIn, "dd/MM/yyyy")} to ${format(booking.CheckOut, "dd/MM/yyyy")} for ${booking.Guests} guest(s)`
                })

                const invoiceItem = await mongoose.model("InvoiceItem").create({
                    InvoiceId: invoice.InvoiceId,
                    Price: booking.FinalPrice,
                    Description: "Room"
                })

                await this.findOneAndUpdate({ InvoiceId: invoice.InvoiceId }, { Items: [invoiceItem] })

                return invoice.InvoiceId
            }
        }
    })
    schema.plugin(AutoIncrement, { inc_field: 'InvoiceId' })

    return mongoose.model("Invoice", schema)
}

module.exports = createInvoiceSchema