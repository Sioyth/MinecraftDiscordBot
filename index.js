// Requirements 
const Discord = require('discord.js');
const Minecraft = require("minecraft-server-util");

// Bot Login
const bot  = new Discord.Client();
bot.login('Insert your bot token here!');

// Command Prefix
const PREFIX = '!';

var ip = "Your Ip here!";
var port = 25565;
var refreshTime = 30;

function GetServerStatus()
{
    let serverStatus;

    Minecraft(ip, port, (error, response) => 
    {
       if(error)
       {
           serverStatus = "Server Offline";
           bot.user.setActivity(serverStatus, {type: "PLAYING"});
           throw error;
       } 
       
       serverStatus = response.onlinePlayers + " of " + response.maxPlayers;
       bot.user.setActivity(serverStatus, {type: "PLAYING"});
       
    })
}

bot.on('ready', () => 
{
    console.log('Beep!');
    GetServerStatus();
    bot.setInterval(GetServerStatus, refreshTime * 1000);
});

bot.on('message', message=>
{
   
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0])
    {
        case 'ip': 
        {
            if(!ip)
                message.reply('There is no current IP!');
            else
                message.reply(ip);
            
        }
    }
})

