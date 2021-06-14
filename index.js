require('dotenv').config();

const Discord = require("discord.js");

const client = new Discord.Client();
client.login(process.env.DiscordTOKEN);

const prefix = './';

client.on("message", function(message){
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const commando = args.shift().toLowerCase();
    
    if(commando === "ping"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply('pog! xd ow o ping '+timeTaken+' ms.');
    }
});


