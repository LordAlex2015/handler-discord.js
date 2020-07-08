'use strict';
const {blue} = require('colors');
module.exports = (client) => {
    /*
      * Copyright 2020 © LordAlex2015
      * See LICENSE file
     */

    console.log(`Logged in as ${blue(`${client.user.tag}`)}`);

    const activities = [`Base Bot | !help`,'By: ArviX#8443 | Base Bot']
    setInterval(async () => {
            await client.setActivity(activities[Math.floor(Math.random() * activities.length)]);
        },
        120000);
};