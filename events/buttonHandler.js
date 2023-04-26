module.exports = {
    async buttonHandler(interaction, client) {

            console.log(`${interaction.user.tag} (${interaction.user.id}) > [${interaction.customId}]`);

            const btn_id = interaction.customId;
            if (btn_id == "test") {
                interaction.reply({content: 'Test', ephemeral: true})
                } else if (btn_id == "reload") {
                    require('../functions/handelCommands')(client);
                    interaction.reply({ content: `Reloaded commands!` });
            }
    }
}