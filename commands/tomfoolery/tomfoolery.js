const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require(`discord.js`);
const { doge, monkey } = require('../../whitelist.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`tomfoolery`)
        .setDescription(`Doge Command`)
        .addSubcommandGroup(command =>
            command
                .setName('of')
                .setDescription('of')
                .addSubcommand(command =>
                    command
                        .setName('dogery')
                        .setDescription('Doge Command (ConstantinDavid1234)')
                )
                .addSubcommand(command =>
                    command
                        .setName('monkeys')
                        .setDescription('Monkey Command (4D_Bullets)')
                )
        )

        .setDMPermission(false),
    async execute(interaction) {
        command = interaction.options.getSubcommand()

        switch (command) {

            case "dogery":
                const failEmbed = new EmbedBuilder()
                    .setTitle('You do not have the required permissions to run **/tomfoolery of dogery**')
                    .addFields(
                        { name: ' ', value: '**Permissions Required:** DM <@!922423247822270514> or <@!844951775106433024> for access.' }
                    )
                const dogeembed = new EmbedBuilder()
                    .addFields(
                        { name: ' ', value: ' **__Tomfoolery of Dogery__**' },
                        { name: 'Doge 1', value: '🐶', inline: true },
                        { name: 'Doge 2', value: '🐕', inline: true },
                        { name: 'Doge 3', value: '🐩', inline: true },
                        { name: '\u200b', value: '\u200b', inline: true },
                        { name: 'Doge 4', value: '🐕‍🦺', inline: true },
                        { name: '\u200b', value: '\u200b', inline: true },
                    )




                if (doge.includes(Number(interaction.user.id))) {
                    return await interaction.reply({ embeds: [dogeembed] })
                } else if (!whitelist.includes(interaction.user.id)) {
                    console.log(`Json raw: ${monkey}, Whitelist: ${whitelist}`)
                    await interaction.reply({ embeds: [failEmbed] })
                    return console.log(`\u001b[31mThe person above does not have the correct permissions to use this command\u001b[0m`)
                }

            case "monkeys":
                const monkeyfail = new EmbedBuilder()
                    .setTitle('You do not have the required permissions to run /monkey')
                    .addFields(
                        { name: ' ', value: '**Permissions Required:** DM <@!751230703936733235> or <@!844951775106433024> for access.' }
                    )
                const monke = new EmbedBuilder()
                    .addFields(
                        { name: 'MONKEY MONKEY MONKEY MONKEY', value: ' ' },
                        { name: 'MONKEY 1', value: '🐒', inline: true },
                        { name: 'MONKEY 2', value: '🐵', inline: true },
                        { name: 'MONKEY 3', value: '🙊', inline: true },
                        { name: 'MONKEY 4', value: '🙉', inline: true },
                        { name: '\u200b', value: '\u200b', inline: true },
                        { name: 'MONKEY 5', value: '🙈', inline: true },
                    )




                if (monkey.includes(Number(interaction.user.id))) {
                    return await interaction.reply({ embeds: [monke] })
                } else if (!whitelist.includes(interaction.user.id)) {
                    console.log(`Json raw: ${monkey}, Whitelist: ${whitelist}`)
                    await interaction.reply({ embeds: [monkeyfail] })
                    return console.log(`\u001b[31mThe person above does not have the correct permissions to use this command\u001b[0m`)
                }
        }

    }
}