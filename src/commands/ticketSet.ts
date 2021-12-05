import { Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js"
import { Sanae } from "../core/bot"

export default class Ticket
{
    constructor(private client: Sanae) {}

    public aliases = ["setticket"]
    public description = "Definir le panel de tickets"

    public run = async (message: Message, args: string[]) =>
    {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("ticketSupportButton")
                    .setLabel("Support")
                    .setStyle("PRIMARY")
                    .setEmoji("🎧"),
                new MessageButton()
                    .setCustomId("ticketCommandButton")
                    .setLabel("Passer commande")
                    .setStyle("PRIMARY")
                    .setEmoji("🎟️")
            )

        const embed = new MessageEmbed()
            .setTitle("Ticket")
            .setDescription(`Cliquer sur le boutton pour ouvrir un ticket !`)
            .setColor(0x81E0DA)

        const msg = await message.channel.send({ embeds: [embed], components: [row] })

        const pins = await message.channel.messages.fetchPinned()
        pins.forEach(a => 
            {
                if (a.author.id === this.client?.user?.id) a.unpin()
            })

        await msg.pin()
    }
}