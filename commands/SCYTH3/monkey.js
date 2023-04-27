const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require(`discord.js`);
const { monkey } = require('../../whitelist.json')
const whitelist = monkey.map(m => m)

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`monkey`)
    .setDescription(`monkey (4D made me make it)`)
    .setDMPermission(false),
    async execute(interaction) {
        const failEmbed = new EmbedBuilder()
            .setTitle('You do not have the required permissions to run /monkey')
            .addFields(
                { name: ' ', value: '**Permissions Required:** DM <@!751230703936733235> or <@!844951775106433024> for access.'}
            )
        const monke = new EmbedBuilder()
            .addFields(
                { name: 'MONKEY MONKEY MONKEY MONKEY', value: ' ' },
                { name: 'MONKEY 1', value: '🐒', inline: true },
                { name: 'MONKEY 2', value: '🐵', inline: true },
                { name: 'MONKEY 3', value: '🙊', inline: true },
                { name: 'MONKEY 4', value: '🙉', inline: true },
                { name: '\u200b', value: '\u200b', inline: true },
                { name: 'MONKEY 5', value: '🙈', inline: true },
            )

        
        

        if (whitelist.includes(interaction.user.id)) {
            await interaction.reply({ embeds: [monke] })
        } else {
            await interaction.reply({embeds: [failEmbed]})
            return console.log(`\u001b[31mThe person above does not have the correct permissions to use this command\u001b[0m`)
        }

    }
}