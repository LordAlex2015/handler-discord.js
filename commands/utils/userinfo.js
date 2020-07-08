'use strict';
/*
  * Copyright 2020 © LordAlex2015
  * See LICENSE file
 */
const Command = require("../../structure/Command.js");
const moment = require('moment')
class Userinfo extends Command {
    constructor() {
        super({
            name: 'userinfo',
            category: 'utils',
            description: 'Cette commande donne des informations sur des utilisateurs !',
            usage: 'userinfo [@user]',
            example: ['userinfo', 'userinfo @user'],
            aliases: ['ui']
        });
    }
    /*
      * Copyright 2020 © LordAlex2015
      * See LICENSE file
     */
    async run(client, message) {
        const membre = message.mentions.members.first() || message.author;
        // if (!membre) { return message.channel.send('Veuillez mentionner un utilisateur !'); }

        await message.channel.send({
            embed: {
                color: 0xe43333,
                title: `Statistiques du l'utilisateur **${membre.tag}**`,
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
/*
  * Copyright 2020 © LordAlex2015
  * See LICENSE file
 */

module.exports = new Userinfo();