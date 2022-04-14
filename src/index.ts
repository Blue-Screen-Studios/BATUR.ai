//Package Imports
import { config } from 'dotenv';
import { Client, Intents, Interaction, Message } from 'discord.js';

//Component Function Imports
import { postCommands } from './components/commands';
import { createCodeBlock } from './components/formatMessage';
import { dbInit } from './database/mongoose';

config();

(async () => {

    const client = new Client({
        intents: [ //Tells discord what kind of information you need sent
            Intents.FLAGS.GUILDS, //Intends to interact with GUILDS
            Intents.FLAGS.GUILD_MESSAGES //Intends to read GUILD_MESSAGES
        ]
    });

    client.login(process.env.DISCORD_API_KEY); //Login using discord secure token

    client.on("ready", async () => {
        console.log("Econibot is online...");

        dbInit();
    })

    client.on('interactionCreate', async (interaction) => {
        if(!interaction.isCommand()) return;
        
        const { commandName, options } = interaction;
        
        /*if(commandName === "")
        {

        }*/
    })
})()