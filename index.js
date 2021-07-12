require('dotenv').config();

const Discord = require("discord.js");
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const client = new Discord.Client();


// Criar servidor
const app = express();

app.get("/", (req, res) => res.send("dale man "));

app.listen(3000, () => console.log("ouvindo "));


// Acessando os TOKENS das api's
const bot = new TelegramBot(process.env.TelegramTOKEN, { polling: true });
client.login(process.env.DiscordTOKEN);

// Prefixo dos comandos no discord
const prefix = './';
var channelID = "797398583338205194";


//________começo do telegram________



bot.on("text", msg => {
	// Pega informação
	const [username, channel, dateFormat] = getInfos(msg,channelID);

	// Repassa mensagem
	var reply = username + " [" + dateFormat + "]: " + msg.text;
	channel.send(reply);
});

bot.on("photo", msg => {
	// Pega informação
	const [username, channel, dateFormat] = getInfos(msg,channelID);

	// Adiciona legenda para imagem
	legenda = msg.caption;

	// Pega o id da imagem com melhor resolução
	image_id = msg.photo.slice(-1).pop().file_id;

	// Gera e envia imagem para discord
	bot.getFileLink(image_id).then(fileLink => {
		reply = username + " [" + dateFormat + "]: " + (legenda == undefined ? "" : legenda);
		channel.send(reply, { files: [fileLink] });
	});	
});

// Printa mensagens de erro no console
bot.on("polling_error", console.log);

//_______ começo do discord_________
client.on("message", function (message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const commando = args.shift().toLowerCase();

	if (commando === "settelchan") {
		// Define o canal de texto como o canal principal das mensagens
		message.reply('este é o novo canal de texto do bot');
		channelID = message.channel.id;

	}
	if (commando === "ping") {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply('pog! xd ow o ping ' + timeTaken + ' ms.');
	}
});

// Pega usuario, client do Discord que vai receber a mensagem e sua data/hora
function getInfos(msg, channelID){
	// Define o objeto canal com o respectivo ID
	channel = client.channels.cache.get(channelID);

	// Trata username
	const username = msg.from.username == undefined ? (msg.from.last_name != undefined? msg.from.first_name+" "+msg.from.last_name :msg.from.first_name): msg.from.username;


	// Formatação da data
	const d = new Date(msg.date*1000);
	const dateFormat = formatDate(d);

	// Repassa mensagem
	return [username, channel, dateFormat];
	
	if("text" in msg){
		// Repassa mensagem(s) de texto
		
		var reply = username + " [" + dateFormat + "]: " + msg.text;
		channel.send(reply);
	}else{
		// Repassa mensagems(s) com imagem(s)
		if("photo" in msg){
					
		}else{
			console.log(msg);
		}
	}
}
function formatDate(d) {
	return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + " " + ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();}
