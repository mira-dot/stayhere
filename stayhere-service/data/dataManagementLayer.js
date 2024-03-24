const fs = require('node:fs/promises');
const path = require("path");

const rootPath = path.dirname(process.mainModule.filename);
const dataPath = path.join(rootPath, "data");

console.log("rootPath=" + rootPath);
console.log("dataPath=" + dataPath);

const ROOMS = "rooms.json";
const BOOKINGS = "bookings.json";
const CUSTOMERS = "customers.json";
const INVOICES = "invoices.json";
const INVOICEITEMS = "invoiceitems.json";

async function readDataRoutines(entityName) {
    const rawFileContent = await fs.readFile(path.join(dataPath, entityName));
    return JSON.parse(rawFileContent);
}

async function saveDataRoutines(entityName, items) {
    return await fs.writeFile(path.join(dataPath, entityName), JSON.stringify(items), {encoding: "utf-8"});
}

async function readRooms() {
    return await readDataRoutines(ROOMS);
}

async function readBookings() {
    return await readDataRoutines(BOOKINGS);
}

async function readCustomers() {
    return await readDataRoutines(CUSTOMERS);
}

async function readInvoices() {
    return await readDataRoutines(INVOICES);
}

async function readInvoiceItems() {
    return await readDataRoutines(INVOICEITEMS);
}

async function saveRooms(items){
    return await saveDataRoutines(ROOMS, items);
}

async function saveBookings(items){
    return await saveDataRoutines(BOOKINGS, items);
}

async function saveCustomers(items){
    return await saveDataRoutines(CUSTOMERS, items);
}

async function saveInvoices(items){
    return await saveDataRoutines(INVOICES, items);
}

async function saveInvoiceItems(items){
    return await saveDataRoutines(INVOICEITEMS, items);
}

module.exports.readRooms = readRooms;
module.exports.readBookings = readBookings;
module.exports.readCustomers = readCustomers;
module.exports.readInvoices = readInvoices;
module.exports.readInvoiceItems = readInvoiceItems;

module.exports.saveRooms = saveRooms;
module.exports.saveBookings = saveBookings;
module.exports.saveCustomers = saveCustomers;
module.exports.saveInvoices = saveInvoices;
module.exports.saveInvoiceItems = saveInvoiceItems;