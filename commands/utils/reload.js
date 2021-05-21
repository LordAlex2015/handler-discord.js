'use strict';

const Command = require("../../structure/Command.js");

class ReloadCommand extends Command {
    constructor() {
        super({
            name: 'reload',
            category: 'owner',
            description: 'reload files',
            usage: 'reload <-all/-c/-e> <file-name-without-.js/-c/-all/-e>',
            example: ['reload -c help','reload -c ping','reload -e message', 'reload -e ready', 'reload -all -c','reload -all -e','reload -all -all'],
            perms: "owner",
            aliases: ['rl']
        });
    }

    async run(client, message, args) {
        if(!args[1]) {
            message.channel.send("> No type specified!");
        } else if(args[1] === '-all') {
            if(!args[2]) {
                client.reloadAllCommands().then(res_c => {
                    client.reloadAllEvents().then(res_e => {
                        message.channel.send(`${res_c}\n${res_e}`)
                    })
                })
            } else if(args[2] === "-c") {
                client.reloadAllCommands().then(res => {
                    message.channel.send(res)
                })
            } else if(args[2] === "-e") {
                client.reloadAllEvents().then(res => {
                    message.channel.send(res)
                })
            }
        }  else if(!args[2]) {
            message.channel.send("> No file specified!");
        } else {
            if(args[1] === '-c') {
                client.reloadCommand(args[2]).then(async res => {
                    await message.channel.send(res);
                });
            } else if(args[1] === '-e') {
                client.reloadEvent(args[2]).then(async res => {
                    await message.channel.send(res);
                });
            }

        }
    }
}

module.exports = new ReloadCommand;