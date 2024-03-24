function getAvailaleRooms(allRooms, allBookings, checkin, checkout, guests) {
    const availableRooms = [];
    for (let i = 0; i < allRooms.length; i++) {
        const room = allRooms[i];

        isAvailable = true;

        // capacity check
        if (room.Capacity < guests) {
            isAvailable = false;
        }
        else {
            for (let j = 0; j < allBookings.length; j++) {
                const booking = allBookings[j];

                // skip other rooms
                if (booking.RoomId !== room.RoomId)
                    continue;

                // date check
                if (checkin < booking.checkout) // overlap of checkin and checkout, the same day checkin is allowed
                {
                    isAvailable = false
                    break;
                }
            }
        }

        if (isAvailable)
            availableRooms.push(room);
    }
    return availableRooms;
}

module.exports.getAvailaleRooms = getAvailaleRooms;