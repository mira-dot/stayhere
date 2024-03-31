const { RoomModel } = require("../dao/schemas");

const seedRooms = async () => {
    await RoomModel.create({
        Description: "Room with 1 single bed. This single room features air conditioning, a safe deposit box and a flat-screen TV.",
        Capacity: 1,
        Price: 100,
    })

    await RoomModel.create({
        Description: "Room with 1 single bed. This single room features air conditioning, a safe deposit box and a flat-screen TV.",
        Capacity: 1,
        Price: 100,
    })

    await RoomModel.create({
        Description: "Room with 1 single bed. This single room features air conditioning, a safe deposit box and a flat-screen TV.",
        Capacity: 1,
        Price: 100,
    })

    await RoomModel.create({
        Description: "Room with 1 single bed. This single room features air conditioning, a safe deposit box and a flat-screen TV.",
        Capacity: 1,
        Price: 100,
    })

    await RoomModel.create({
        Description: "Room with 1 large double bed. This double room feauteres air-conditioning, a safe deposit box, a flat-screen TV and a minibar.",
        Capacity: 2,
        Price: 150,
    })

    await RoomModel.create({
        Description: "Room with 2 single beds. This double room feauteres air-conditioning, a safe deposit box, a flat-screen TV and a minibar.",
        Capacity: 2,
        Price: 150,
    })

    await RoomModel.create({
        Description: "Room with 1 large double bed. This double room feauteres air-conditioning, a safe deposit box, a flat-screen TV and a minibar.",
        Capacity: 2,
        Price: 150,
    })

    await RoomModel.create({
        Description: "Room with 3 single beds. This triple room feauteres air-conditioning, a safe deposit box, a flat-screen TV and a minibar.",
        Capacity: 3,
        Price: 200,
    })

    await RoomModel.create({
        Description: "Room with 3 single beds. This triple room feauteres air-conditioning, a safe deposit box, a flat-screen TV and a minibar.",
        Capacity: 3,
        Price: 200,
    })

    await RoomModel.create({
        Description: "These two rooms are interconnected by a door and feature two bathrooms. One room has a double bed and the 2nd room features twin beds. Further amenities include air conditioning and a minibar.",
        Capacity: 4,
        Price: 250,
    })
}

module.exports = seedRooms