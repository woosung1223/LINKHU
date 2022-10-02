const mongoose = require('mongoose');

const connect = () => {
    if (process.env.NODE_ENV == 'dev') {
        mongoose.set('debug', true);
    }

    mongoose.connect(`mongodb://${process.env.MONGOID}:${process.env.MONGOPWD}@localhost:27017/admin`, {
        dbName: 'LINKHU',
        userNewUrlParser : true,
        useCreateIndex : true,
    }, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Mongo DB connected');
        }
    });
};

mongoose.connection.on('error', (error) => {
    console.error('Mongo DB error occured', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('mongoDB disconnected, connecting...');
    connect();
});



module.exports = connect;