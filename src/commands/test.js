import { Client, Message } from "discord.js";

module.exports = {
    name: "ping",
    description: "get the pingtime of the bot",
    execute(message, args, client)
    {
        message.channel.send(`${client.ping} ms`);
    }
}