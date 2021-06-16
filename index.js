require('dotenv').config();

const Discord = require("discord.js");
const TelegramBot = require('node-telegram-bot-api');

const client = new Discord.Client();

//Acessando os TOKENS das api's
const bot = new TelegramBot(process.env.TelegramTOKEN,{polling: true});
client.login(process.env.DiscordTOKEN);

//Prefixo dos comandos no discord
const prefix = './';
var channelID = "797398583338205194";


//________começo do telegram________
//comando /toDisc manda mensagem para o discord, para o canal do id acima
bot.onText(/\/toDisc(.+)/ ,(msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1]; 
    
    //Envia mensagem para o discord
    channel = client.channels.cache.get(channelID);
    const d = new Date(msg.date);
    const dateFormat = formatDate(d);
    var reply = msg.from.username+" ["+dateFormat+"]: "+resp;
    channel.send(reply);

    
    bot.sendMessage(chatId, resp);
});

//_______ começo do discord_________
client.on("message", function(message){
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const commando = args.shift().toLowerCase();
    
    if(commando == "settelchan"){
        //define o canal de texto como o canal principal das mensagens
        //console.log(message.channel.id);
        channelID = message.channel.id;
    }
    if(commando === "ping"){
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply('pog! xd ow o ping '+timeTaken+' ms.');
    }
});
function formatDate(d){
    return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+" "+("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" +d.getFullYear(); 
}

//client.once("ready" ,msg =>{
//    console.log(client.channels.cache)
//})
