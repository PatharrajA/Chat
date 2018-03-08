mongoose.connect('mongodb://' + config.dbUrl + config.dbName, function(err) {
    if (!err) {
        console.log('Mongo DB Connected');
        winston.log('Mongo DB Connected with DB Name' + config.dbName);
    } else {
        console.log('Mongo DB Not Connected', err);
        winston.log('Mongo DB Not Connected With error' + err);
    }
});