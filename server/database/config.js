const mongoose = require('mongoose');

const mongoDBConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connection database successfully');
    } catch (err) {
        throw new Error('Error trying to connect to the database');
    }
}

module.exports = {
    mongoDBConnection
}