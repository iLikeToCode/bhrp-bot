const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;
        if (!message.guildId) return dmlogger()

        function dmlogger() {
            const dmlogs = client.channels.cache.find(channel => channel.id === '1101164382139973763')
            console.log(`${message.author.tag} (${message.author.id}) [DMs] > ${message.content}`)
            embed = new EmbedBuilder()
            .setTitle('New Direct Message Received')
            .setDescription('I have received a new DM')
            .setColor('#00FF00')
            .setAuthor({
                name: `${message.author.tag}`,
                iconURL: message.author.displayAvatarURL()
            })

            
            if (message.content.includes('http')) {
                embed.addFields(
                    { name: 'New DM (Image Link Included): ', value: `${message.content}`, inline: true },
                    { name: 'Message Author:', value: `<@!${message.author.id}>`, inline: true }
                )
                embed.setImage(`${message.content.split(" ")[0]}`)
            } else if (message.content) {
                embed.addFields(
                    { name: 'DM Content: ', value: `${message.content}`, inline: true },
                    { name: 'Message Author:', value: `<@!${message.author.id}>`, inline: true }
                )
                message.reply('Your DM has been logged. Wait for a BHRP HR to check it.')
            } else if (message.attachments.size === 1) {
                embed.addFields(
                    { name: 'New File sent in DMs (Linked Below): ', value: `\u200b`, inline: true },
                    { name: 'Message Author:', value: `<@!${message.author.id}>`, inline: true }
                )
                message.reply('Your DM has been logged. Wait for a BHRP HR to check it.')
                dmlogs.send({ embeds: [embed] })
                return dmlogs.send({ content: `${message.attachments.first().url}`})
            } else if (message.attachments.size > 1) {
                return message.reply('I can only handle one attachment at a time!')
            }

            dmlogs.send({ embeds: [embed] })
        }
    }
}