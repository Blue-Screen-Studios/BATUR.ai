import { AsyncHook, HookCallbacks } from "async_hooks";
import { callbackify } from "util";

const fs = require('fs');
const path = require('path');

const commandsDirectory: string =  path.join(__dirname, './../../src/commands/');

export async function readCommandAsync(name: string)
{
    console.log("SearchInDirectory: " + commandsDirectory);

    return await fs.promises.readFile(commandsDirectory + name, 'utf8');
}