const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require(`discord.js`)

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`monkey`)
    .setDescription(`monkey (4D made me make it)`)
    .setDMPermission(false),
    async execute(interaction) {
        const failEmbed = new EmbedBuilder()
            .setTitle('You do not have the required permissions to run /monkey')
            .addFields(
                { name: ' ', value: '**Permissions Required:** `Administrator`'}
            )

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            interaction.reply({embeds: [failEmbed], ephemeral: true})
        }
    }
}