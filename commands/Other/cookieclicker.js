const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const count = 0

module.exports = {
	data: new SlashCommandBuilder()
    .setName('cookieclicker')
    .setDescription('Testing Buttons'),
	async execute(interaction) {


		const test = new ButtonBuilder()
			.setCustomId('cclicker')
			.setLabel('Cookie Clicker')
			.setStyle(ButtonStyle.Success);

		const row = new ActionRowBuilder()
			.addComponents(test)


        const response = await interaction.reply({
            content: `${interaction.user.username}#${interaction.user.tag} has not clicked the button yet`,
            components: [row],
        });
        


        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter });
        

            if (confirmation.customId === 'cclicker') {
                count = count + 1
                await response.update({ content: `${interaction.user.username}#${interaction.user.tag} has clicked the button ${count} times`, components: [row] });
            }


        } catch (e) {
            await response.editReply({ content: 'Error.', components: [] });
        }





	},
};
