const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const clientId = '1088524174529675375'; 

module.exports = (client) => {
    
    console.log('Started refreshing application (/) commands.');

    const commandFolders = fs.readdirSync("./src/commands").filter(file => !file.includes('.'))
    let commandArray = [];

    if (typeof client === 'undefined') return console.log(`Error: client is undefined - Aborting ...`);
    
    // Flush cache for new commands
    client.commands.clear();
    
    for (folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            try {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            } catch (error) {
                console.log(`Error loading command ${file}!`);
                console.log(error.stack);
            }
        }
    }

    const rest = new REST({
        version: '10'
    }).setToken(process.env.token);

    ( async () => {
        try {

            await rest.put(
                Routes.applicationCommands(clientId), {
                    body: commandArray
                },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error.stack);
        }
    })();
};