// Dependencies
const Discord = require('discord.js');
const Minecraft = require("minecraft-server-util");
const PublicIp = require('public-ip');
const config = require("./config.json")
const Fs = require('fs-extra')
const Git = require('simple-git');

// Bot Login
const Bot  = new Discord.Client();
Bot.login(config.token);

function GetServerStatus()
{
    let serverStatus;

    Minecraft(config.ip, config.port, (error, response) => 
    {
       if(error)
       {
           serverStatus = "Server Offline";
           Bot.user.setActivity(serverStatus, {type: "PLAYING"});
           throw error;
       } 
       
       serverStatus = response.onlinePlayers + " of " + response.maxPlayers;
       Bot.user.setActivity(serverStatus, {type: "PLAYING"});
       
    })
}

async function GetIp()
{
    return await PublicIp.v4();
}

Bot.on('ready', () => 
{
    console.log('Beep!');
    CheckVersion();
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

function CheckVersion()
{
    Fs.readJson('./package.json', (err, packageObj) => 
    {
        if (err) console.error(err)
        console.log(packageObj.version)
    })
}