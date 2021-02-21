'use strict';
const {blue, green} = require('colors');
module.exports = async(client) => {

    console.log(`Logged in as ${blue(`${client.user.tag}`)}`);

    await client.user.setActivity('Base Bot is Starting...');
    console.log(`${green('[Bot]')} Playing: ${blue('Base Bot is Starting...')}`);


    const activities = [`Base Bot | !help`,'By: ArviX#8443 | Base Bot'];
    setInterval(async () => {
            await client.user.setActivity(activities[Math.floor(Math.random() * activities.length)]);
            }, 120000);
};