import { Client, Message } from "discord.js";

module.exports = {
    name: 'ready',
    once: true,

    exectue(client) {
        console.log(`${client.user} has logged into discord via token...`);
    }
}