const mongo = require("mongoose");

export function dbInit() 
{
    const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        poolSize: 5,
        connectTimeoutMS: 10000,
        family: 4
    };

    mongo.connect(`mongodb+srv://IBXCODECAT:${process.env.DATABASE_PASS}@econcluster.vtl6n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    mongo.set('useFindAndModify', false);
    mongo.Promise = global.Promise;

    mongo.connection.on('connected', () => {
        console.log("Database Connected...");
    })

    mongo.connection.on('disconnected', () => {
        console.log("Database Disconnected...");
    })

    mongo.connection.on('err', (err: Error) => {
        console.log("There was an error connecting to the database: " + err);
    })
}