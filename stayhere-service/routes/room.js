const express = require("express");
const { toDate } = require("date-fns");
const roomsDAO = require("../dao/roomsDAO");

const router = express.Router();

router.get("/get-available-rooms", async (req, res) => {
    const { checkin, checkout, guests } = req.query;
    const availableRooms = await roomsDAO.findAvailableRooms(toDate(checkin), toDate(checkout), guests)
    res.json(availableRooms);
});

module.exports = router;