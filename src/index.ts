import { config } from 'dotenv';
import { Client, Intents, Message, User } from 'discord.js';
import { google } from 'googleapis';
import { Endpoint } from 'googleapis-common';

config();

const attributeThresholds = {
    'TOXICITY': 0.75,
    'SEVERE_TOXICITY': 0.75,
    'IDENTITY_ATTACK': 0.75,
    'INSULT': 0.75,
    'PROFANITY': 0.75,
    'THREAT': 0.75,
    'SEXUALLY_EXPLICIT': 0.75,
    'FLIRTATION': 0.75,
    'SPAM': 0.75,
    'ATTACK_ON_AUTHOR': 0.75,
    'ATTACK_ON_COMMENTER': 0.75,
    'INCOHERENT': 0.75,
    'INFLAMMATORY': 0.75,
    'OBSCENE': 0.75,
    'UNSUBSTANTIAL': 0.75
};

const defaultRequestedAttributes: { [key: string]: any; } = {};
for (const key in attributeThresholds) {
    defaultRequestedAttributes[key] = {};
}

/**
 * Analyze attributes in a block of text
 * @param {string} text - text to analyze
 * @return {json} res - analyzed attributes
 */
async function analyzeText(client: Readonly<Endpoint>, text: string) {

    const analyzeRequest = {
        comment: { text: text },
        languages: ['en'],
        requestedAttributes: defaultRequestedAttributes,
    };
    // @ts-ignore
    const result = await client.comments.analyze({
        key: process.env.PERSPECTIVE_API_KEY,
        resource: analyzeRequest,
    });

    // This is the format the API expects

    const data: { [key: string]: any; } = {};

    for (const key in result['data']['attributeScores']) {
        data[key] =
            result['data']['attributeScores'][key]['summaryScore']['value'] >
            attributeThresholds[key as never];
    }
    return data;
}

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
    })

    bot.on("message", async function (msg) {
        if(msg.author == bot.user) return;
        
        let data = await analyzeText(analyzerClient, msg.content);
        msg.channel.send(JSON.stringify(data));
    });
})()