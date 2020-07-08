'use strict';
/*
  * Copyright 2020 © LordAlex2015
  * See LICENSE file
 */
module.exports = (client, message) => {
    if (message.author.bot || !message.channel.guild) {
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
    if(command.perms !== 'everyone') {
        if(!message.member.permission.has(command.perms)) {
            return message.channel.send('You don\'t have required permission to use that command!')
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