const mongoose = require('mongoose')
const { Mongo_URI } = process.env

exports.connect = () => {
    mongoose.connect(Mongo_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: false,
        //useCreateIndex: true
    })
       .then(() => console.log('MongoDB Connected...'))
       .catch(err => console.error(err))
        //.finally(() => mongoose.connection.close())
}