'use strict';

const Command = require("../../structure/Command.js");

class ReloadCommand extends Command {
    constructor() {
        super({
            name: 'reload-cmd',
            category: 'utils',
            description: 'reload-cmd Commands',
            usage: 'reload-cmd <command-file-name-without-.js>',
            example: ['reload-cmd help','reload-cmd ping'],
            perms: "owner"
        });
    }

    async run(client, message, args) {
        if(!args[1]) {
            message.channel.send("> No command specified!");
        } else {
            client.reloadCommand(args[1]).then(async res => {
                await message.channel.send(res);
            });
        }
    }
}

module.exports = new ReloadCommand;