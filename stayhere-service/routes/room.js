const express = require("express");
const { toDate } = require("date-fns");
const roomsDAO = require("../dao/roomsDAO");

const router = express.Router();

router.get("/get-available-rooms", async (req, res) => {
    const { checkin, checkout, guests } = req.query;
    try {
        const availableRooms = await roomsDAO.findAvailableRooms(toDate(checkin), toDate(checkout), guests)
        res.json(availableRooms);
    } catch (error) {
        res.status(500).send("Failed to get available rooms")
    }
});

module.exports = router;