import { Client, Message } from "discord.js";
import * as consoleFormatting from '../modules/consoleFormatting';

module.exports = {
    name: 'interactionCreate',
    once: true,

    exectue(interaction, client) {

        if(interaction.isCommand())
        {
            console.log(consoleFormatting.BgBlue, `A command interaction: [${interaction}] was induced!`);

            const { commandName, options } = interaction;

            /*if(commandName === "")
            {

            }*/
        }
    }
}