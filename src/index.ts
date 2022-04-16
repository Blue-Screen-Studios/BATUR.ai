//Package Imports
import { config } from 'dotenv';
import { Client, Collection, Intents, Message, DiscordAPIError } from 'discord.js';
import { cwd } from 'process';
import * as fs from 'fs';

//Configure dotenv
config(); 

//Component Function Imports
import * as  consoleFormatting from './modules/consoleFormatting'
import * as msgFormatting from './components/msgFormatting';

const client = new Client({
    intents: [ //Tells discord what kind of information you need sent
        Intents.FLAGS.GUILDS, //Intends to interact with GUILDS
        Intents.FLAGS.GUILD_MESSAGES //Intends to read GUILD_MESSAGES
    ]
});

client.login(process.env.DISCORD_API_KEY); //Login using discord secure token

client.cmdPrefix = "$";
client.commands = new Collection();

const commandFiles = fs.readdirSync("./src/commands/").filter((file: string) => file.endsWith('.js'));
const eventFiles = fs.readdirSync("./src/events/").filter((file: string) => file.endsWith(".js"));

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
