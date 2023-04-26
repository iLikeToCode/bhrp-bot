const { SlashCommandBuilder } = require('discord.js');
const rolePermissions = require('../../Schemas.js/roles');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('Save roles')
    .addRoleOption(option => option.setName('role') .setDescription('Role to save.'))
    .addBooleanOption(option => option.setName('override') .setDescription('Override the current database save.')),


  async execute(interaction) {
    rolePermissions.findOne({ GuildID: interaction.guild.id}, async (err, data) => {
      if (err) throw err;

      if(!data) {
        rolePermissions.create({
          GuildID: interaction.guild.id,
          RoleID: interaction.options.getRole('role')
        })
        interaction.reply({content: `Role for this guild was set to <@&${data.RoleID}>`})
      } else if (data) {
          if (interaction.options.getBoolean('override') === true) {
            rolePermissions.deleteOne({GuildID: interaction.guild.id})
            rolePermissions.create({
              GuildID: interaction.guild.id,
              RoleID: interaction.options.getRole('role')
            })
          }
          else {
            interaction.reply({content: `Role for this guild has already been set to <@&${data.RoleID}>`})
          }
      }
    })
        
    }
}