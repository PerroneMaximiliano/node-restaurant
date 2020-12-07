const mongoose = require('mongoose');

const mongoDBConnection = () => {
    return mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => {
        console.log('successfully connected to the database');
    }).catch(err => {
        console.log('error connecting to the database');
        process.exit();
    });
};

module.exports = {
    mongoDBConnection
}