'use strict'; // Defines that JavaScript code should be executed in 'strict mode'.

const { token } = require('./config.json'),
 { Client, Collection } = require('discord.js'),
  { readdirSync } = require('fs'),
    { join } = require("path"),
    {green,red, blue} = require('colors'),
    {text} = require('figlet');
/*
  * Copyright 2020 © LordAlex2015
  * See LICENSE file
 */
class Class extends Client {
    constructor(token) {
        super({messageCacheMaxSize: 15 /* Here you can add PARTIALS */});
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
                    "================================================================================================================================"

                );
            });

        });
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

