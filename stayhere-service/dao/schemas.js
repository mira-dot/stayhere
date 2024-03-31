const createRoomSchema = require("./roomSchema");
const createCustomerSchema = require("./customerSchema");
const createBookingSchema = require("./bookingSchema");
const createSchema = () => {
    return {
        RoomModel: createRoomSchema(),
        CustomerModel: createCustomerSchema(),
        BookingModel: createBookingSchema()
    }
}

module.exports = createSchema()