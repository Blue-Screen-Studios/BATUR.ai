import { Options } from 'discord.js'
import { Client } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';


export async function postCommands(client: Client)
{
    //GUILD
    const guildID = "929815024158003280"
    const testGuild = client.guilds.cache.get(guildID);

    let commands

    if(testGuild)
    {
        commands = testGuild?.commands;
    }
    else
    {
        commands = client.application?.commands;
    }
    
    commands?.create({
        name: "analyze-content",
        description: "analyze content using Google's perspective API",
        options: [
            {
                name: "text",
                description: "the text you want to be analyzed",
                required: true,
                type: ApplicationCommandOptionTypes.STRING
            }
        ]
    })

    //Global
}