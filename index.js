const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Partials } = require(`discord.js`);
const fs = require('fs');
const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMessages, 
            GatewayIntentBits.MessageContent, 
            GatewayIntentBits.DirectMessages
        ],
        partials: [
            Partials.Channel,
            Partials.Message
        ]
     }
    );



const express = require('express')


app = express()

app.set('view engine', 'hbs')
app.use(express.static("./views"));
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())




client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

app.get("/",function(req,res){
    res.render("index");
});

app.get('/say',(req,res)=>{
    res.render('say');
});

app.post("/say", (req, res) => {    
    const { message, channel } = req.body
    res.render('say')
    if (!Number(channel) === NaN) {
        let channeltosend = client.channels.cache.find(chnl => chnl.id === channel)
        channeltosend.send({content: `${message}`})
        console.log(`${message}, ${channeltosend.name}`)
    } else if (channel === "BHRP Staff Chat") {
        let channeltosend = client.channels.cache.find(chnl => chnl.id === '1092318140949614671')
        channeltosend.send({content: `${message}`})
        console.log(`${message}, ${channeltosend.name}`)
    } else if (channel === "BHRP General Chat") {
        let channeltosend = client.channels.cache.find(chnl => chnl.id === '1092318141117370433')
        channeltosend.send({content: `${message}`})
        console.log(`${message}, ${channeltosend.name}`)
    }

    
})


app.listen(8080, function() { 
    console.log('Server running on port 8080'); 
});




(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./events");
    
    // Omitted because it is consquently called in the require just above
    //require(`./functions/handelCommands.js`)(client);

    console.log(`Logging in ...`);
    client.login(process.env.token)
})();

