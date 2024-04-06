const express = require("express");
const invoicesDAO = require("../dao/invoicesDAO");
const router = express.Router();

router.get("/get/:invoiceId", async (req, res) => {
    try {
        const invoice = await invoicesDAO.getByInvoiceId(req.params.invoiceId)
        res.send(invoice);
    } catch (error) {
        res.status(500).send("Failed to get the invoice")
    }
});

module.exports = router;