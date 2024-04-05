const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { areIntervalsOverlapping } = require('date-fns');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    RoomId: Number,
    Capacity: Number,
    Price: Number,
    Description: String
}).plugin(AutoIncrement, { inc_field: 'RoomId' })

class RoomsDAO {
    roomModel = null;

    createSchema = () => {
        this.roomModel = mongoose.model("Room", roomSchema)
    }

    getAll = async () => {
        return await this.roomModel.find({})
    }

    create = async (room) => {
        return await mongoose.model("Room").create(room)
    }

    findAvailableRooms = async (checkin, checkout, guests) => {
        const allBookings = await mongoose.model("Booking").find({})
        const allRooms = await this.getAll()
        return allRooms.filter(room => {
            // capacity check
            if (room.Capacity < guests) {
                return false;
            }
            else {
                for (const booking of allBookings.filter(x => x.RoomId == room.RoomId)) {
                    // check overlap of checkin and checkout
                    if (areIntervalsOverlapping(
                        { start: checkin, end: checkout },
                        { start: booking.CheckIn, end: booking.CheckOut },
                        { inclusive: false } // the same day checkin/checkout is allowed
                    ))
                        return false;
                }

                return true;
            }
        })
    }

}

module.exports = new RoomsDAO()