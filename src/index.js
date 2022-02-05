//Configure Enviroment Variables
import dotenv from 'dotenv';
dotenv.config();

//Import Google Modules (Perspective Comment API)
import perspective from 'googleapis'

//Import Discord modules
import DiscordJS, { Intents } from 'discord.js';


perspective.discoverAPI(process.env.DISCOVERY_URL)
    .then(google => {
        const analyzeRequest = {
            comment: {
                text: 'Jiminy cricket! Well gosh durned it! Oh damn it all!',
            },
            requestedAttributes: {
                TOXICITY: {},
            },
        };

        google.comments.analyze(
            {
                key: process.env.PERSPECTIVE_API_KEY,
                resource: analyzeRequest,
            },
            (err, response) => {
                if (err) throw err;
                console.log(JSON.stringify(response.data, null, 2));
            });
    })
    .catch(err => {
        throw err;
});


const client = new DiscordJS.Client({
    intents: [ //Tells discord what kind of information you need sent
        Intents.FLAGS.GUILDS, //Intends to interact with GUILDS
        Intents.FLAGS.GUILD_MESSAGES //Intends to read GUILD_MESSAGES
    ]
});

client.login(process.env.DISCORD_API_KEY); //Login using discord secure token

client.on("ready", async () => {
    console.log("The bot is online according to node...");
    console.log("Open Discord to make sure...");

})