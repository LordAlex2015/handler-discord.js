'use strict';
/*
  * Copyright 2020 © LordAlex2015
  * See LICENSE file
 */
module.exports = (client, message) => {
    if (!message.channel.guild) {
        return ;
    }

    const data = message.content;

    const args = data.slice(client.prefix.length).trim().split(/ +/g);


    if (!data.startsWith(client.prefix)) {
        return;
    }

    const command = client.commands.find(cmd => cmd.aliases.includes(args[0])) || client.commands.get(args[0]);
    if (!command) {
        return ;
    }
    if(command.botNotAllowed && message.author.bot) {
        return;
    }

    if(command.perms === "owner") {
        if(!client.config.owners.includes(message.author.id)) {
            return message.channel.send('You don\'t have required permission to use that command!');
        }
    }
     else if(command.perms !== 'everyone') {
        if(!message.member.permission.has(command.perms)) {
            return message.channel.send('You don\'t have required permission to use that command!');
        }
    }
     if(command.botPerms !== []) {
         for(botPerm of command.botPerms) {
             if(!message.guild.members.cache.get(client.user.id).hasPermission(botPerm)) {
                 return message.channel.send(`I don\'t have required permission to execute that command!\nMissing Permission: ${botPerm}`);
             }
         }
     }
    /*
      * Copyright 2020 © LordAlex2015
      * See LICENSE file
     */
    try {
        command.run(client, message, args)
    } catch (err) {
       client.emit('error',err);
    }
};
