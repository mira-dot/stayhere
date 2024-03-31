const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongod = null;

const connectDB = async () => {
    try {
        mongod = await MongoMemoryServer.create();
        dbUrl = mongod.getUri();
        
        const conn = await mongoose.connect(dbUrl);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        if (mongod) {
            await mongod.stop();
            mongoose.mongo = null;
        }
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = { connectDB, disconnectDB };