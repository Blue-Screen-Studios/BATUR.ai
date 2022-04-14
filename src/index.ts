//Package Imports
import { config } from 'dotenv';
import { Client, Collection, Intents, Message, DiscordAPIError } from 'discord.js';

//Configure dotenv
config(); 

//Component Function Imports
import { postCommands } from './components/commands';
import { createCodeBlock } from './components/formatMessage';
import { dbInit } from './database/mongoose';
import { AggregationCursor } from 'mongoose';

//Required...
const fs = require("fs");

const client = new Client({
    intents: [ //Tells discord what kind of information you need sent
        Intents.FLAGS.GUILDS, //Intends to interact with GUILDS
        Intents.FLAGS.GUILD_MESSAGES //Intends to read GUILD_MESSAGES
    ]
});

client.login(process.env.DISCORD_API_KEY); //Login using discord secure token

client.cmdPrefix = "!";
client.commands = new Collection();


const commandFiles = fs.readdirSync("./commands").filter((file: string) => file.endsWith('.ts'));
const eventFiles = fs.readdirSync("./events").filter((file: string) => file.endsWith(".ts"));

for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for(const file of eventFiles)
{
    const event = require(`./events/${file}`);

    if(event.once)
    {
        client.once(event.name, (...args) => event.exectue(...args, client));
    }
    else
    {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

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
