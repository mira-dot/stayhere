const express = require("express");
const dml = require("../data/dataManagementLayer");
const roomsHelper = require("../helpers/roomsHelper");

const router = express.Router();

router.get("/get", async (req, res, next) => {
    const {checkin, checkout, guests} = req.query;
    const allRooms = await dml.readRooms();
    const allBookings = await dml.readBookings();
    const availableRooms = roomsHelper.getAvailaleRooms(allRooms, allBookings, checkin, checkout, guests);

    res.json(availableRooms);
});

module.exports = router;