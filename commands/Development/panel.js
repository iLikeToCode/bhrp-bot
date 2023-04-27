const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('btntest')
    .setDescription('Testing Buttons'),
	async execute(interaction) {


		const test = new ButtonBuilder()
			.setCustomId('cclicker')
			.setLabel('Cookie Clicker')
			.setStyle(ButtonStyle.Primary);

		const row = new ActionRowBuilder()
			.addComponents(test)
        

		await interaction.reply({
			content: `Choose an action. This is in beta.`,
			components: [row],
		});
	},
};