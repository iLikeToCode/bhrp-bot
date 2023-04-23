const { SlashCommandBuilder } = require('discord.js');
const rolePermissions = require('../../Schemas.js/roles');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dbtest')
    .setDescription('Test Database')
    .addRoleOption(option => option.setName('role') .setDescription('Role to save')),


  async execute(interaction) {
    let roleProfile = await rolePermissions.findOne({ GuildID: interaction.guild.id, RoleID: interaction.options.getRole('role')};
    if (!roleProfile) roleProfile = new rolePermissions({
      _id: mongoose.Types.ObjectId(),
      guildID: interaction.guild.id,
      roleID: interaction.options.getRole('role'),
    }),

        
    })
  }
  
}