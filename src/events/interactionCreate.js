module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isButton()) return await Buttons(interaction, client);
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return

        let subcommand = interaction.options._subcommand || "";
        let subcommandGroup = interaction.options._subcommandGroup || "";
        let commandArgs = interaction.options._hoistedOptions || [];
        let args = `${subcommandGroup} ${subcommand} ${commandArgs.map(arg => arg.value).join(" ")}`.trim();
        console.log(`${interaction.user.tag} (${interaction.user.id}) > /${interaction.commandName} ${args}`);
        
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: 'There was an error while executing this command!', 
                ephemeral: true
            });
        }

        
        async function Buttons(interaction, client) {

            console.log(`${interaction.user.tag} (${interaction.user.id}) > [${interaction.customId}]`);

            if (interaction.isButton()) {
                const btn_id = interaction.customId;
                if (btn_id == "test") {
                    interaction.reply({content: 'Test', ephemeral: true})
                } else if (btn_id == 'reload') {
                    interaction.reply({content: `Reloading Commands Now`, ephemeral: true})
                    require('../../functions/handelCommands')(client);
                    interaction.editReply({content: `Reloaded commands!` });
                }
            }
        }

    },
    


};