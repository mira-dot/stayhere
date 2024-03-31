const express = require("express");
const { RoomModel } = require("../dao/schemas");
const { toDate } = require("date-fns");

const router = express.Router();

router.get("/get-available-rooms", async (req, res) => {
    const {checkin, checkout, guests} = req.query;
    const availableRooms = await RoomModel.findAvailableRooms(toDate(checkin), toDate(checkout), guests)
    res.json(availableRooms);
});

module.exports = router;