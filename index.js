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
//metodo para repassar texto
//TODO: descobrir como hospedar o bot e manter ele ativo
bot.on("text" ,msg => {

    //define canal do discord que a mensagem será mandada
    channel = client.channels.cache.get(channelID);
    
    //formatação da data
    const d = new Date(msg.date);
    const dateFormat = formatDate(d);
    
    //envia mensagem
    var reply = msg.from.username+" ["+dateFormat+"]: "+ msg.text;
    channel.send(reply);

});

//metodo para repassar imagens
bot.on("photo" ,file => {
    console.log(file);
    //define o canal do disc que a imagem será mandada
    channel = client.channels.cache.get(channelID);
    
    //legenda da mensagem
    legenda = file.caption;

    //pega o id da imagem com melhor resolução
    image_id = file.photo.slice(-1).pop().file_id;
    
    //data e hora da mensagem
    const d = new Date(file.date);
    const dateFormat = formatDate(d);

    //gera e envia imagem para discord
    file_path = bot.getFileLink(image_id).then(fileLink=> {
        reply = file.from.username+" ["+dateFormat+"]: "+(legenda == undefined ? "":legenda);
        channel.send( reply, {files:[fileLink]});        
    });

})

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
