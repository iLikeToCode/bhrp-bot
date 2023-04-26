const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require(`discord.js`)

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`mass-unban`)
    .setDescription(`Mass Unban Command`)
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

        await interaction.deferReply()

        const { options, guild } = interaction;
        const users = await interaction.guild.bans.fetch();
        const ids = users.map(u => u.user.id)

        for (const id of ids) {
            await guild.members.unban(id)
            .catch(err => {
                return interaction.editReply({ content: `${err.rawError}`});
            })
        }

        const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('Sucessfully unbanned users.')
        .setDescription(`:white_check_mark:  ${ids.length} members have been **unbanned** from this server.`)
        
        await interaction.editReply({ content: '', embeds: [embed] })
    }
}