const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Say")
    .addSubcommand(command =>
            command
			.setName('embed')
			.setDescription('Send an Embed'))
            .addStringOption(options => options.setName('title') .setDescription('Title') .setRequired(true))
            .addStringOption(options => options.setName('content') .setDescription('Content') .setRequired(true))
	.addSubcommand(command =>
		    command
			.setName('msg')
			.setDescription('Send an MSG'))
            .addStringOption(options => options.setName('message') .setDescription('Message to Send') .setRequired(true))
    .setDMPermission(false),
    async execute(interaction) {



        const title = interaction.options.getString('title')
        const description = interaction.options.getString('content')

        const message = interaction.options.getString('message')

        embed = new EmbedBuilder()
        .setTitle(`${title}`)
        .setDescription(`${description}`)
        
        await interaction.reply({ content: 'Sent', ephemeral: true })

        const command = interaction.options.getSubcommand();

        switch(command) {


        
        case "embed" : {
            await interaction.channel.send({
                embeds: [embed]
            });
        }
        case "msg" : {
            await interaction.channel.send({
                content: `${message}`
            })
        }
    }

    }

}