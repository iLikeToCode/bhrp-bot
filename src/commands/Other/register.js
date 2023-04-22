const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register the commands on the fly'),
    async execute(interaction, client) {
        await interaction.deferReply({content: `Reloading commands - Please wait ...`, ephemeral: true})
        require('../../functions/handelCommands')(client);
        await interaction.editReply({content: `Reloaded commands!` });
    },
};