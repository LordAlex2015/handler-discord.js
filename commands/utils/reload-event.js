'use strict';

const Command = require("../../structure/Command.js");

class ReloadEvent extends Command {
    constructor() {
        super({
            name: 'reload-event',
            category: 'utils',
            description: 'Reload Events',
            usage: 'reload <event-file-name-without-.js>',
            example: ['reload-event message','reload-event ready'],
            perms: "owner"
        });
    }

    async run(client, message, args) {
        if(!args[1]) {
            message.channel.send("> No event specified!");
        } else {
            client.reloadEvent(args[1]).then(async res => {
                await message.channel.send(res);
            });
        }
    }
}

module.exports = new ReloadEvent;