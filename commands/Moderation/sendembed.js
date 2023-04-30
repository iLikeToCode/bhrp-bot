const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require(`discord.js`)

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`send-embed`)
    .setDescription(`Do not use, in progess`)
    .setDMPermission(false),
    async execute(interaction) {
        const failEmbed = new EmbedBuilder()
        .setTitle('You do not have the required permissions to run /mass-unban')
        .addFields(
            { name: ' ', value: '**Permissions Required:** `Administrator`'}
        )

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({embeds: [failEmbed], ephemeral: true})
        }
    }
}