const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Make a suggestion")
    .addStringOption(option => option.setName('suggestion') .setDescription('Your Suggestion') .setRequired(true))
    .setDMPermission(false),
    async execute(interaction) {
        const suggestion = interaction.options.getString('suggestion')
        embed = new EmbedBuilder()
        .setTitle('New Suggestion')
        .setDescription(`${suggestion}`)
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
        

        await interaction.reply({
            embeds: [embed]
        });
    }
}