const { SlashCommandBuilder, EmbedBuilder } = require ('discord.js')
const resultsSchema = require('../../Schemas.js/resultsSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('accept')
    .addSubcommand(command => command.setName('staff') .setDescription('Accept someone for staff.') .addUserOption(option => option.setName))
}