const fs = require('fs');
const path = require('path');

const commandsDirectory: string =  path.join(__dirname, './../../src/commands/');
const commandFiles = fs.readdirSync(commandsDirectory);

export interface CommandHash { [key: string]: string }
let hashedCommandData: CommandHash = {}

export async function hashCommands()
{
    for(const file of commandFiles)
    {
        hashedCommandData[file] = await getCommandJSON(file);
    }

    return hashedCommandData;
}

async function getCommandJSON(name: string)
{
    return await fs.promises.readFile(commandsDirectory + name, 'utf8');
}