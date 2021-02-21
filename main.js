'use strict'; // Defines that JavaScript code should be executed in 'strict mode'.

const { token } = require('./config.json'),
 { Client, Collection } = require('discord.js'),
  { readdirSync } = require('fs'),
    { join } = require("path"),
    {green,red, blue} = require('colors'),
    {text} = require('figlet'),
    {loadavg, cpus, totalmem} = require("os");
/*
  * Copyright 2020 © LordAlex2015
  * See LICENSE file
 */
class Class extends Client {
    constructor(token) {
        super({messageCacheMaxSize: 15 /* Here you can add PARTIALS */});
        this.config = require('./config.json');
        this.prefix = '!';
        this.colors = {
            red: 16711680,
            green: 32560,
            default: 3092790 //Discord Color
        }
        this.footer = 'Base Bot Footer'
        //Reload Command Function
        /**
         * @param {String} reload_command - Command file name without .js
         * @return {Promise<String>}
         */
        this.reloadCommand = function(reload_command) {
            return new Promise((resolve) => {
                const folders = readdirSync(join(__dirname, "commands"));
                for (let i = 0; i < folders.length; i++) {
                    const commands = readdirSync(join(__dirname, "commands", folders[i]));
                    if (commands.includes(`${reload_command}.js`)) {
                        try {
                            delete require.cache[require.resolve(join(__dirname, "commands", folders[i], `${reload_command}.js`))]
                            const command = require(join(__dirname, "commands", folders[i], `${reload_command}.js`));
                            this.commands.delete(command.name)
                            this.commands.set(command.name, command);
                            console.log(`${green('[Commands]')} Reloaded ${reload_command}`)
                            resolve(`> \`${reload_command}\` has been reloaded`)
                        } catch (error) {
                            console.log(`${red('[Commands]')} Failed to load command ${reload_command}: ${error.stack || error}`)
                            resolve(`> \`${reload_command}\` had a problem on reloading!`)
                        }
                    }
                }
                resolve("> Command not found!")
            })
        }
        /**
         * @param {String} reload_event - Event file name without .js
         * @return {Promise<String>}
         */
        this.reloadEvent = function(reload_event) {
            return new Promise((resolve) => {
                const files = readdirSync(join(__dirname, "events"));
                files.forEach((e) => {
                    try {
                        const fileName = e.split('.')[0];
                        if(fileName === reload_event) {
                            const file = require(join(__dirname, "events", e));
                            const res = this.listeners(fileName)
                            this.off(fileName, res[0]);
                            this.on(fileName, file.bind(null, this));
                            delete require.cache[require.resolve(join(__dirname, "events", e))];
                            resolve(`> Reloaded \`${reload_event}\``)
                        }
                    } catch (error) {
                        throw new Error(`${red('[Events]')} Failed to load event ${e}: ${error.stack || error}`)
                    }
                });
                resolve(`> Event named: \`${reload_event}\` not found`)
            })
        }
        try {
            this.launch().then(() => { console.log(blue('All is launched, Connecting to Discord..')); })
        } catch (e) {
            throw new Error(e)
        }
        this.login(token);
    }

    async launch() {
        console.log(blue("Starting the bot"));
        this.commands = new Collection();
        this._commandsHandler();
        this._eventsHandler();
        this._processEvent();
        this._startingMessage();
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

    _startingMessage() {
        const cpuCores = cpus().length;
        //Custom Starting Message
        text('Handler-Discord.js', {
            font: "Standard"
        }, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            const data2 = data;
            text('By: ArviX', {
            }, function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log("================================================================================================================================"+"\n"+
                                data2+"\n\n"+ data +"\n"+
                            "================================================================================================================================"+ "\n"+
                                `CPU: ${(loadavg()[0]/cpuCores).toFixed(2)}% / 100%` + "\n" +
                                `RAM: ${Math.trunc((process.memoryUsage().heapUsed) / 1000 / 1000)} MB / ${Math.trunc(totalmem() / 1000 / 1000)} MB` + "\n" +
                                //`Discord WebSocket Ping: ${this.ws.ping}` + "\n" +
                            "================================================================================================================================"
                );
            });

        });
    }

    _processEvent() {
        process.on('unhandledRejection', error => {
            if(error.code === 50007) return
            console.error(green('✅ An Error has occured : ') + red(error.stack));
            let details = `\`\`\`\nName : ${error.name}\nMessage : ${error.message}`
            if (error.path) details += `\nPath : ${error.path}`
            if (error.code) details += `\nError Code : ${error.code}`
            if (error.method) details += `\nMethod : ${error.method}`
            if (this.users) this.users.cache.get(this.config.owner.id).send({
                embed: {
                    description: `🔺 **An Error has occured:**\n\`\`\`js\n${error}\`\`\``,
                    color: this.maincolor,
                    fields: [
                        {
                            name: "🔺 Details :",
                            value: `${details}\`\`\``
                        }
                    ]
                }
            })
        });
    }
}

module.exports = new Class(token);

