const express = require("express");
const bookingsDAO = require("../dao/bookingsDAO");
const invoicesDAO = require("../dao/invoicesDAO");
const router = express.Router();

router.get("/get", async (req, res) => {
    try {
        const bookings = await bookingsDAO.getAll()
        res.send(bookings);
    } catch (error) {
        res.status(500).send("Failed to load bookings")
    }
});

router.post("/create", async (req, res) => {
    try {
        const booking = await bookingsDAO.create(req.body)
        res.send(booking);
    } catch (error) {
        res.status(500).send("Failed to create booking")
    }
});

router.post("/status/:bookingId/:status", async (req, res) => {
    try {
        const booking = await bookingsDAO.changeStatus(req.params.bookingId, req.params.status);
        res.send(booking);
    } catch (error) {
        res.status(500).send("Failed to change the status of the booking")
    }
});

router.post("/create-invoice/:bookingId", async (req, res) => {
    try {
        const invoiceId = await invoicesDAO.createInvoiceByBookingId(req.params.bookingId);
        res.send({ invoiceId: invoiceId })
    } catch (error) {
        res.status(500).send("Failed to create invoice")
    }
});


module.exports = router;