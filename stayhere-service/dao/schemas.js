const bookingsDAO = require("./bookingsDAO")
const customersDAO = require("./customersDAO")
const invoiceItemsDAO = require("./invoiceItemsDAO")
const invoicesDAO = require("./invoicesDAO")
const roomsDAO = require("./roomsDAO")

const createSchemas = () => {
    roomsDAO.createSchema()
    customersDAO.createSchema()
    bookingsDAO.createSchema()
    invoicesDAO.createSchema()
    invoiceItemsDAO.createSchema()
}

module.exports = createSchemas