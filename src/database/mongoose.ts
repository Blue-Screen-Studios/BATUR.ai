const mongo = require("mongoose");
import * as consoleFormatting from '../modules/consoleFormatting';

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

    mongo.connect(`mongodb+srv://IBXCODECAT:${process.env.DATABASE_PASS}@econcluster.vtl6n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, dbOptions)
    mongo.set('useFindAndModify', false);
    mongo.Promise = global.Promise;

    mongo.connection.on('connected', () => {
        console.log(consoleFormatting.FgGreen, "Database Connected...");
    })

    mongo.connection.on('disconnected', () => {
        console.log(consoleFormatting.FgYellow, "Database Disconnected...");
    })

    mongo.connection.on('err', (err: Error) => {
        console.log(consoleFormatting.FgRed, "There was an error connecting to the database: " + err);
    })
}