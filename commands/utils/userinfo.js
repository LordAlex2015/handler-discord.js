'use strict';

const Command = require("../../structure/Command.js");
const moment = require('moment')
class Userinfo extends Command {
    constructor() {
        super({
            name: 'userinfo',
            category: 'utils',
            description: 'Get user stats',
            usage: 'userinfo [@user]',
            example: ['userinfo', 'userinfo @user'],
            aliases: ['ui']
        });
    }
    async run(client, message) {
        const membre = message.mentions.members.first() || message.author;

        await message.channel.send({
            embed: {
                color: client.colors.default,
                title: `Stats of **${membre.tag}**`,
                thumbnail: {
                    url: membre.displayAvatarURL()
                },
                fields: [
                    {
                        name: 'ID :',
                        value: membre.id
                    },
                    {
                        name: 'Created at :',
                        value: `${moment(membre.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`
                    }
                ],
                footer: {
                    text: `Informations de l'utilisateur ${membre.username}`
                }
            }
        });

    }
}


module.exports = new Userinfo();