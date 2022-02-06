import { Options } from 'discord.js'
import { Client } from 'discord.js'


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
        description: "analyze content using Google's perspective API"
    })
    
    //Global
}