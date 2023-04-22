const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('prompanel')
    .setDescription('Dev Panel for Bot'),
	async execute(interaction) {
		if (!interaction.user.id) return console.log("${interaction.user} attempted to use /panel")

		const reload = new ButtonBuilder()
			.setCustomId('reloado')
			.setLabel('Reload Commands')
			.setStyle(ButtonStyle.Primary);

		const test = new ButtonBuilder()
			.setCustomId('testo')
			.setLabel('Test')
			.setStyle(ButtonStyle.Success);

		const row = new ActionRowBuilder()
			.addComponents(reload)
			.addComponents(test)
        
        const row2 = new ActionRowBuilder()
            .addComponents(test)

		await interaction.reply({
			content: `Choose an action. This is in beta.`,
			components: [row, row2],
		});
	},
};

