const bookingsDAO = require("../dao/bookingsDAO")
const customersDAO = require("../dao/customersDAO")
const invoiceItemsDAO = require("../dao/invoiceItemsDAO")
const invoicesDAO = require("../dao/invoicesDAO")
const roomsDAO = require("../dao/roomsDAO")

const createSchemas = () => {
    roomsDAO.createSchema()
    customersDAO.createSchema()
    bookingsDAO.createSchema()
    invoicesDAO.createSchema()
    invoiceItemsDAO.createSchema()
}

module.exports = createSchemas