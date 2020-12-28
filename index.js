// Dependencies
const Discord = require('discord.js');
const Minecraft = require("minecraft-server-util");
const PublicIp = require('public-ip');
const config = require("./config.json")

// Bot Login
const Bot  = new Discord.Client();

Bot.login(config.token);

function GetServerStatus()
{
    var serverStatus;

    Minecraft.status(config.ip, { port: config.port }) // port is default 25565
        .then((response) => 
        {
            serverStatus = response.onlinePlayers + " of " + response.maxPlayers;
            Bot.user.setActivity(serverStatus, {type: "PLAYING"});
        })
        .catch((error) => 
        {
            serverStatus = "Server Offline";
            Bot.user.setActivity(serverStatus, {type: "PLAYING"});
            throw error;
        });
}

async function GetIp()
{
    return await PublicIp.v4();
}

Bot.on('ready', () => 
{
    console.log('Beep!');
    GetServerStatus();
    Bot.setInterval(GetServerStatus, config.intervalTime * 1000);
});

Bot.on('message', message =>
{
    let args = message.content.substring(config.prefix.length).split(" ");

    switch(args[0])
    {
        case 'ip': 
            GetIp().then(ip => message.reply(ip));
            break;
    }
});
