const { RoomModel } = require("../dao/schemas");

const seedRooms = async () => {
    await RoomModel.create({
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        Capacity: 1,
        Price: 100,
    })

    await RoomModel.create({
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        Capacity: 1,
        Price: 100,
    })

    await RoomModel.create({
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        Capacity: 1,
        Price: 100,
    })

    await RoomModel.create({
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        Capacity: 1,
        Price: 100,
    })

    await RoomModel.create({
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        Capacity: 2,
        Price: 150,
    })

    await RoomModel.create({
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        Capacity: 2,
        Price: 150,
    })

    await RoomModel.create({
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        Capacity: 2,
        Price: 150,
    })

    await RoomModel.create({
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        Capacity: 3,
        Price: 200,
    })

    await RoomModel.create({
        Description: "Blabla",
        Capacity: 3,
        Price: 200,
    })

    await RoomModel.create({
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        Capacity: 4,
        Price: 250,
    })
}

module.exports = seedRooms