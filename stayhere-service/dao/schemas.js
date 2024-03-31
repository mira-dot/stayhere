const createRoomSchema = require("./roomSchema");
const createCustomerSchema = require("./customerSchema");
const createBookingSchema = require("./bookingSchema");
const createInvoiceSchema = require("./invoiceSchema");
const createInvoiceItemSchema = require("./invoiceItemSchema");
const createSchema = () => {
    return {
        RoomModel: createRoomSchema(),
        CustomerModel: createCustomerSchema(),
        BookingModel: createBookingSchema(),
        InvoiceModel: createInvoiceSchema(),
        InvoiceItemModel: createInvoiceItemSchema()
    }
}

module.exports = createSchema()