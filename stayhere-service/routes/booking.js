const express = require("express");
const bookingsDAO = require("../dao/bookingsDAO");
const invoicesDAO = require("../dao/invoicesDAO");
const router = express.Router();

router.get("/get", async (req, res) => {
    const bookings = await bookingsDAO.getAll()
    res.send(bookings);
});

router.post("/create", async (req, res) => {
    const booking = await bookingsDAO.create(req.body)
    res.send(booking);
});

router.post("/status/:bookingId/:status", async (req, res) => {
    const booking = await bookingsDAO.changeStatus(req.params.bookingId, req.params.status);
    res.send(booking);
});

router.post("/create-invoice/:bookingId", async (req, res) => {
    const invoiceId = await invoicesDAO.createInvoiceByBookingId(req.params.bookingId);
    res.send({ invoiceId: invoiceId })
});


module.exports = router;