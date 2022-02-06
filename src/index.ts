//Package Imports
import { config } from 'dotenv';
import { Client, Intents, Interaction, Message } from 'discord.js';
import { google } from 'googleapis'

//Component Function Imports
import { analyzeText } from './components/testmsg'
import { postCommands } from './components/commands';
import { createCodeBlock } from './components/formatMessage';

config();

(async () => {

    const analyzerClient = await google.discoverAPI(process.env.DISCOVERY_URL);

    const client = new Client({
        intents: [ //Tells discord what kind of information you need sent
            Intents.FLAGS.GUILDS, //Intends to interact with GUILDS
            Intents.FLAGS.GUILD_MESSAGES //Intends to read GUILD_MESSAGES
        ]
    });

    client.login(process.env.DISCORD_API_KEY); //Login using discord secure token

    client.on("ready", async () => {
        console.log("NATUR.ai is online...");

        postCommands(client);
    })

    client.on('interactionCreate', async (interaction) => {
        if(!interaction.isCommand()) return;
        
        const { commandName, options } = interaction;
        
        if(commandName === 'analyze-content')
        {
            const content = options.getString('text')!
            let result: string = JSON.stringify(await analyzeText(analyzerClient, content));
            let response: string = createCodeBlock(result, 'json');
            
            interaction.reply({ 
                content: response,
                ephemeral: true
            })
        }
    })

    client.on("messageCreate", async msg => {
        if(msg.author == client.user) return;
        if(msg.content === "") return;
        
        let data = await analyzeText(analyzerClient, msg.content);
        msg.channel.send(JSON.stringify(data));
    });
})()