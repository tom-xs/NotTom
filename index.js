require('dotenv').config();

const Discord = require("discord.js");
const TelegramBot = require('node-telegram-bot-api');

const client = new Discord.Client();

const bot = new TelegramBot(process.env.TelegramTOKEN,{polling: true});


client.login(process.env.DiscordTOKEN);

const prefix = './';

//________começo do telegram________
bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1]; 

  bot.sendMessage(chatId, resp);
});


//_______ começo do discord_________
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


