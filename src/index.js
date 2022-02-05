//Configure Enviroment Variables
import dotenv from 'dotenv';
dotenv.config();

//Import Google Modules (Perspective Comment API)
import google from 'googleapis'

//Import Discord modules
import DiscordJS, { Intents } from 'discord.js';

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

/**
 * Analyze attributes in a block of text
 * @param {string} text - text to analyze
 * @return {json} res - analyzed atttributes
 */
async function analyzeText(text) {
    const analyzer = google.commentanalyzer('v1alpha1');

    // This is the format the API expects
    const requestedAttributes = {};
    for (const key in attributeThresholds) {
        requestedAttributes[key] = {};
    }

    const req = {
        comment: { text: text },
        languages: ['en'],
        requestedAttributes: requestedAttributes,
    };

    const res = await analyzer.comments.analyze({
        key: process.env.PERSPECTIVE_API_KEY,
        resource: req
    },
    );

    data = {};

    for (const key in res['data']['attributeScores']) {
        data[key] =
            res['data']['attributeScores'][key]['summaryScore']['value'] >
            attributeThresholds[key];
    }
    return data;
}



const bot = new DiscordJS.Client({
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

bot.on("message", function (msg) {
    let data = analyzeText(msg.content);
    msg.channel.send(data.toString());
});