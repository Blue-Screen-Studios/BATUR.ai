//Package Imports
import { config } from 'dotenv';
import { Client, Intents } from 'discord.js';
import { google } from 'googleapis'

//Component Function Imports
import { analyzeText } from './components/testmsg'
import { readCommandAsync } from './components/fileSystem';

config();

(async () => {

    const analyzerClient = await google.discoverAPI(process.env.DISCOVERY_URL);

    const bot = new Client({
        intents: [ //Tells discord what kind of information you need sent
            Intents.FLAGS.GUILDS, //Intends to interact with GUILDS
            Intents.FLAGS.GUILD_MESSAGES //Intends to read GUILD_MESSAGES
        ]
    });

    bot.login(process.env.DISCORD_API_KEY); //Login using discord secure token

    bot.on("ready", async () => {
        console.log("The bot is online according to node...");
        console.log("Open Discord to make sure...");

        let text = await readCommandAsync("analyze.json"); //This line is undefined
        console.log(text);
    })

    bot.on("message", async function (msg) {
        if(msg.author == bot.user) return;
        if(msg.content === "") return;
        
        let data = await analyzeText(analyzerClient, msg.content);
        msg.channel.send(JSON.stringify(data));
    });
})()