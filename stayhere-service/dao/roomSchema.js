const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { areIntervalsOverlapping } = require('date-fns');
const Schema = mongoose.Schema;

const createRoomSchema = () => {
    const schema = new Schema({
        RoomId: Number,
        Capacity: Number,
        Price: Number,
        Description: String
    },
        {
            statics: {
                async findAvailableRooms(checkin, checkout, guests) {
                    const allBookings = await mongoose.model("Booking").find({})
                    const allRooms = await this.find({})
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
        })

    schema.plugin(AutoIncrement, { inc_field: 'RoomId' })

    return mongoose.model("Room", schema)
}

module.exports = createRoomSchema