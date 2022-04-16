import { Client, Message } from "discord.js";
import * as consoleFormatting from '../modules/consoleFormatting';
import * as mongo from "../database/mongoose";

module.exports = {
    name: 'ready',
    once: true,

    exectue(client) {
        console.log(consoleFormatting.FgGreen, `${client.user.tag} has logged into discord via token...`);
        console.log(consoleFormatting.FgBlue, `${client.user.tag} is ready...`)

        mongo.dbInit();
    }
}