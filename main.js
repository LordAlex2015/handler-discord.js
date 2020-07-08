'use strict'; // Defines that JavaScript code should be executed in 'strict mode'.

const { token } = require('./config.json'),
 { Client, Collection } = require('discord.js'),
  { readdirSync } = require('fs'),
    { join } = require("path"),
    {green,red, blue} = require('colors');
/*
  * Copyright 2020 © LordAlex2015
  * See LICENSE file
 */
class Class extends Client {
    constructor(token) {
        super({messageCacheMaxSize: 15});
        this.bot = this;
        this.config = require('./config.json');
        this.maincolor = 11007;
        this.prefix = '!';
        this.red = 16711680;
        this.green = 32560;
        this.footer = 'Base Bot Footer'
        try {
            this.launch().then(() => { console.log(blue('All is launched, Connecting to Discord..')); })
        } catch (e) {
            throw new Error(e)
        }
        this.login(token);
    }
    /*
      * Copyright 2020 © LordAlex2015
      * See LICENSE file
     */
    async launch() {
        console.log(blue("Starting the bot"));
        this.commands = new Collection();
        this._commandsHandler();
        this._eventsHandler();
    }

    _commandsHandler() {
        let count = 0;
        const folders = readdirSync(join(__dirname, "commands"));
        for (let i = 0; i < folders.length; i++) {
            const commands = readdirSync(join(__dirname, "commands", folders[i]));
            count = count + commands.length;
            for(const c of commands){
                try {
                    const command = require(join(__dirname, "commands", folders[i], c));
                    this.commands.set(command.name, command);
                } catch (error) {
                    console.log(`${red('[Commands]')} Failed to load command ${c}: ${error.stack || error}`)
                }
            }
        }
        console.log(`${green('[Commands]')} Loaded ${this.commands.size}/${count} commands`)
    }
    /*
      * Copyright 2020 © LordAlex2015
      * See LICENSE file
     */
    _eventsHandler() {
        let count = 0;
        const files = readdirSync(join(__dirname, "events"));
        files.forEach((e) => {
            try {
                count++;
                const fileName = e.split('.')[0];
                const file = require(join(__dirname, "events", e));
                this.on(fileName, file.bind(null, this));
                delete require.cache[require.resolve(join(__dirname, "events", e))];
            } catch (error) {
                throw new Error(`${red('[Events]')} Failed to load event ${e}: ${error.stack || error}`)
            }
        });
        console.log(`${green('[Events]')} Loaded ${count}/${files.length} events`)
    }
    /*
      * Copyright 2020 © LordAlex2015
      * See LICENSE file
     */

}

module.exports = new Class(token);

