import mongoose from 'mongoose';

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost:27017/twitter', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.catch((error) => console.log('Unable to connect to the mongodb instance. Error: ', error));

const db = mongoose.connection;
    
db.on('error', console.error.bind(console, 'connection error:'));   

export {db, mongoose};
