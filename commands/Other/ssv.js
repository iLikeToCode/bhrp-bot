const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { sessionRoleSchema } = require('../../Schemas.js/sessionSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("session")
        .setDescription("Starts a Sessionvote.")
        .addSubcommandGroup(command =>
            command
            .setName('set')
            .setDescription('Set Staff Role')
            .addSubcommand(command =>
                command
                .setName('staff-role')
                .setDescription('Set Staff Role for Session Pings')
            )
        )
        .addSubcommand(command =>
            command
                .setName('vote')
                .setDescription('Start an SSU Vote.')
        ),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor("#FFD700")
            .setTitle("Server Startup Vote")
            .setDescription("A SSV has occured, find more information below.")
            .addFields(
                { name: "Information", value: "If you vote, you must join!" },
                { name: "Votes", value: "5 Votes are needed to complete the Session Vote" },
                { name: "Timeframe", value: "If the 5 Votes are not done within 15 minutes this message will be deleted." },
            )

        const voting = new ButtonBuilder()
            .setLabel('Vote for SSU')
            .setCustomId('ssvvote')
            .setStyle(ButtonStyle.Success)

        const row = new ActionRowBuilder()
            .addComponents(voting)





        const secondembed = new EmbedBuilder()
            .setTitle('Amount of votes')
            .setDescription('We have no votes yet, we are waiting!')
            .setImage('https://cdn.discordapp.com/attachments/1098608469109649490/1101885220803846285/Thanks_for_Voting_1.png')
            .setColor('Green')

        const thirdembed = new EmbedBuilder()
            .setTitle('SSU Guidlines')
            .setDescription('An SSU will begin if a staff member is available.\nThank you for voting for our server to start!')
            .setColor('Blue')


        const response = await interaction.reply({ content: '@everyone', embeds: [embed, secondembed], components: [row] })

        let votes = 0
        let voted = []
        let votednames = []
        while (votes < 5) {
            try {
                const confirmation = await response.awaitMessageComponent({ filter: null });


                if (confirmation.customId === 'ssvvote') {
                    if (voted.includes(confirmation.user.id)) return await confirmation.reply({ content: `You have already voted!`, ephemeral: true })
                    voted.push(confirmation.user.id)
                    votednames.push(confirmation.user.tag)
                    console.log(`${votednames}`)
                    votes += 1
                    secondembed.setDescription(`We have: ${votes} votes so far`);
                    secondembed.addFields(
                        { name: `Voter ${votes}: ${confirmation.user.tag}`, value: ' ' }
                    )
                    await confirmation.update({ embeds: [embed, secondembed], components: [row] });
                }


            } catch (e) {
                await interaction.editReply({ content: `Error: ${e}`, embeds: [], components: [] });
                console.log(`${e}`)
            }
        }
        secondembed.setDescription('Thanks for voting, Our goal of 5 votes has been achieved')
        secondembed.setImage('https://cdn.discordapp.com/attachments/1098608469109649490/1101885901761675394/Thanks_for_Voting_3.png')
        await interaction.editReply({ content: '', embeds: [secondembed], components: [] })


        sessionRoleSchema.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
            if (err) throw err;

            if (data) {
                console.log(data)

                const role = data.roleID;
                const guild = data.guildID;
                
                await interaction.editReply({ content: `<@&${role}>`, embeds: [thirdembed, secondembed] })

            }
        })

    }
}