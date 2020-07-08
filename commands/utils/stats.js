'use strict';

const Command = require("../../structure/Command.js");
const { loadavg, cpus, totalmem } = require('os');
/*
  * Copyright 2020 © LordAlex2015
  * See LICENSE file
 */
class Stats extends Command {
    constructor() {
        super({
            name: 'stats',
            category: 'utils',
            description: 'Cette commande donne les stats du bot !',
            usage: 'stats',
            example: ['stats'],
            aliases: ['botinfo','botstats']
        });
    }

    async run(client, message) {
        let cpuCores = cpus().length;
        /*
          * Copyright 2020 © LordAlex2015
          * See LICENSE file
         */
        await message.channel.send({
            embed: {
                title: client.user.username,
                color: client.maincolor,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.displayAvatarURL(),
                    text: client.user.username
                },
                thumbnail: {
                    url: client.user.displayAvatarURL()
                },
                fields: [
                    {
                        name: "My users ",
                        value: "Users:" + `\`\`${client.users.cache.size}\`\``,
                        inline: true
                    },
                    {
                        name: "Processor use",
                        value: `${(loadavg()[0]/cpuCores).toFixed(2)}% / 100%`,
                        inline: true
                    },
                    {
                        name: "RAM use",
                        value: `${Math.trunc((process.memoryUsage().heapUsed) / 1000 / 1000)} MB / ${Math.trunc(totalmem() / 1000 / 1000)} MB`,
                        inline: true
                    }
                ]
            }
        });
    }
}
/*
  * Copyright 2020 © LordAlex2015
  * See LICENSE file
 */

module.exports = new Stats;