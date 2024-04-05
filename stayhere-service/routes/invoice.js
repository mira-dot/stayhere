const express = require("express");
const invoicesDAO = require("../dao/invoicesDAO");
const router = express.Router();

router.get("/get/:invoiceId", async (req, res) => {
    const invoice = await invoicesDAO.getByInvoiceId(req.params.invoiceId)
    res.send(invoice);
});

module.exports = router;