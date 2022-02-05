//Configure Enviroment Variables
import dotenv from 'dotenv';
dotenv.config();

//Discord modules
import DiscordJS, { Intents } from 'discord.js';

const client = new DiscordJS.Client({
    intents: [ //Tells discord what kind of information you need sent
        Intents.FLAGS.GUILDS, //Intends to interact with GUILDS
        Intents.FLAGS.GUILD_MESSAGES //Intends to read GUILD_MESSAGES
    ]
});

client.login(process.env.API_TOKEN); //Login using discord secure token

client.on("ready", async () => {
    console.log("The bot is online according to node...");
    console.log("Open Discord to make sure...");

})