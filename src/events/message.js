import { Client, Message } from "discord.js";

module.exports = {
    name: 'message',
    exectue(message, client) {
        if(message.author.bot) return;
        if(message.channel.type == 'DM') return;
        if(!message.content.startsWith(client.cmdPrefix)) return;

        const args = message.content.slice(client.cmdPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if(!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);

        try {
            command.execute(message, args, client);
        } catch (ex) {
            console.log(ex);
        }

        console.log(`${message.author} in ${message.channel.toString()} sent ${message.content}`);
    }
}