const fs = require('fs');
const path = require('path');

const commandsDirectory: string =  path.join(__dirname, './../../src/commands/');

export async function readCommand(name: string)
{
    console.log("SearchInDirectory: " + commandsDirectory);

    fs.readFile(commandsDirectory + name, 'utf8', (err: Error, data: string) => {
        if(err) {
            console.error("ERROR: " + err);
        }

        return data; //This returns data (it is string when returned)
    })
}