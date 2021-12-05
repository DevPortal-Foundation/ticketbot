import { Message, MessageEmbed } from "discord.js"
import { Sanae } from "../core/bot"

const prefix = require('../../config.json').prefix;

export default class Help
{
    constructor(private client: Sanae) {}

    public description = "Afficher les commandes du bot."

    public run = async (message: Message, args: string[]) =>
    {

        let cmds: string[] = []
        this.client.commands.forEach((e: any, f: any) =>
            cmds.push(f)
        )

        const passed = args[0].toLowerCase()
    
        if (!args && !(cmds.includes(passed)))
        {
            const embed = new MessageEmbed()
                .setTitle("Liste des commandes")
                .setColor(0x76D3E0)
                .setThumbnail(`${this.client.user?.displayAvatarURL()}`)
        
            this.client.commands.forEach((e: any, f: any) =>
                embed.addField(f, e.description)
            )

            await message.channel.send({ embeds: [embed] })
        }
        else
        {
            const embed = new MessageEmbed()
                .setTitle(passed)
                .setDescription(this.client.commands.get(passed).description)
                .addField("Utilisation: ", `${prefix}${passed}`)
                .setColor(0x76D3E0)

            await message.channel.send({ embeds: [embed] })
        }
    }
}
