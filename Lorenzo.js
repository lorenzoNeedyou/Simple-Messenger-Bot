
const login = require("fb-chat-api-temp");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require('chalk');
const cron = require("node-cron");
const moment = require("moment-timezone");
const crypto = require('crypto');
const appstate = require("./appstate.json");
const config = require("./config.json");
const { handleWelcomeEvent } = require("./src/events/welcome");
const { handleLeaveEvent } = require("./src/events/leave");



global.config = config;
const commands = new Map();
const commandsPath = path.join(__dirname, "src", "cmds");

fs.readdirSync(commandsPath).forEach((file) => {
    if (file.endsWith(".js")) {
        try {
            const command = require(path.join(commandsPath, file));


            const eurix = command.eurix;

            if (!eurix.name || !eurix.description || !eurix.credits || !eurix.usages || !eurix.version  || !command.execute) {
                console.error(`Invalid command file: ${file}`);
                return;
            }

            commands.set(eurix.name, command);
            global.commands = commands;
        } catch (error) {
            console.error(`Error loading command file: ${file}`, error);
        }
    }
});


console.log(chalk.bold.yellow('=== Messenger Bot Intro ==='));
console.log(chalk.bold.blue('Title: Simple Messenger Bot'));
console.log(chalk.bold.green('This bot was made by Lorenzo'));
console.log(chalk.bold.magenta('Contact The Owner on Facebook: https://www.facebook.com/100082342305590'));

for (let command of commands.values()) {
    console.log(`- ${command.eurix.name}`);
}
console.log(chalk.bold(`Loaded ${commands.size} commands successfully.`));



login({ appState: appstate }, (err, api) => {
    if (err) {
        console.error("Login error: ", err);
        return;
    }
    api.setOptions(global.config.opt);

    api.listenMqtt(async (err, event) => {
        let tid = event.threadID, mid = event.messageID;
        if (err) {
            console.error("Listening error: ", err);
            return;
        }

        if (
            event.type === "event" &&
            event.logMessageType === "log:subscribe"
        ) {
            await handleWelcomeEvent(api, event);
            return;
        }

        if (
            event.type === "event" &&
            event.logMessageType === "log:unsubscribe"
        ) {
            await handleLeaveEvent(api, event);
            return;
        }



        if (event.type === "message" || event.type === "message_reply") {
            handleMessageEvent(api, event);
            return;
        }
    });

    const currentTime = moment().tz("Asia/Manila").format("HH:mm:ss");
    api.sendMessage(
        `Bot has been activated at ${currentTime}`,
        global.config.admins[0],
    );

    cron.schedule(
        "0 * * * *",
        () => {
            const time = moment.tz("Asia/Manila").format("h:mm A dddd");
            api.changeBio(
                `❒ [ + ] PREFIX:
                ${global.config.prefix}\n
                ❒ [ + ] Owner:@[100082342305590:999:Lorenzo]\n
❒ Active: ${time}`,
            );
        },
        {
            scheduled: true,
            timezone: "Asia/Manila",
        },
    );

    cron.schedule(
        "0 */5 * * *",
        async () => {
            const threadList = await api.getThreadList(20, null, ["INBOX"]);
            threadList.forEach((thread) => {
                api.sendMessage(`Tubig Kaba ? Kase Isda ako mamamatay Ako pag wla ka ;<`, thread.threadID);
            });
        },
        {
            scheduled: true,
            timezone: "Asia/Manila",
        }
    );

    cron.schedule(
        "0 8 * * *",
        async () => {
            const threadList = await api.getThreadList(20, null, ["INBOX"]);
            threadList.forEach((thread) => {
                api.sendMessage(
                    `Good morning everyone! 🌞 I'm here to assist you.`,
                    thread.threadID
                );
            });
        },
        {
            scheduled: false,
            timezone: "Asia/Manila",
        }
    );

    cron.schedule(
        "0 12 * * *",
        async () => {
            const threadList = await api.getThreadList(20, null, ["INBOX"]);
            threadList.forEach((thread) => {
                api.sendMessage(
                    `Good afternoon everyone! 🌅 I'm here to assist you.`,
                    thread.threadID
                );
            });
        },
        {
            scheduled: false,
            timezone: "Asia/Manila",
        }
    );

    cron.schedule(
        "0 18 * * *",
        async () => {
            const threadList = await api.getThreadList(20, null, ["INBOX"]);
            threadList.forEach((thread) => {
                api.sendMessage(
                    `Good evening everyone! 🌙 I'm here to assist you.`,
                    thread.threadID
                );
            });
        },
        {
            scheduled: false,
            timezone: "Asia/Manila",
        }
    );

    cron.schedule(
        "0 7 * * *",
        async () => {
            const threadList = await api.getThreadList(20, null, ["INBOX"]);
            threadList.forEach((thread) => {
                api.sendMessage(
                    `Good morning! ☕️ Don't forget to have your breakfast!`,
                    thread.threadID
                );
            });
        },
        {
            scheduled: true,
            timezone: "Asia/Manila",
        }
    );

    cron.schedule(
        "0 13 * * *",
        async () => {
            const threadList = await api.getThreadList(20, null, ["INBOX"]);
            threadList.forEach((thread) => {
                api.sendMessage(
                    `Hey there! 🍽 It's lunchtime!`,
                    thread.threadID
                );
            });
        },
        {
            scheduled: false,
            timezone: "Asia/Manila",
        }
    );

    cron.schedule(
        "0 19 * * *",
        async () => {
            const threadList = await api.getThreadList(20, null, ["INBOX"]);
            threadList.forEach((thread) => {
                api.sendMessage(
                    `Hey! 🍴 It's dinner time!`,
                    thread.threadID
                );
            });
        },
        {
            scheduled: false,
            timezone: "Asia/Manila",
        }
    );
cron.schedule(
    "0 21 * * *",
    async () => {
        const threadList = await api.getThreadList(20, null, ["INBOX"]);
        threadList.forEach((thread) => {
            api.sendMessage(`Good night! 😴 Have a restful sleep!`, thread.threadID);
        });
    },
    {
        scheduled: false,
        timezone: "Asia/Manila",
    }
);

cron.schedule(
    "0 5 * * *",
    async () => {
        const threadList = await api.getThreadList(20, null, ["INBOX"]);
        threadList.forEach((thread) => {
            api.sendMessage(`Good morning! ☀️ Rise and shine!`, thread.threadID);
        });
    },
    {
        scheduled: false,
        timezone: "Asia/Manila",
    }
);
cron.schedule(
    "0 */5 * * *",
    async () => {
        const threadList = await api.getThreadList(20, null, ["INBOX"]);
        threadList.forEach((thread) => {
            api.sendMessage(`Life update namimis na kita balik kana 🥺`, thread.threadID);
        });
    },
    {
        scheduled: false,
        timezone: "Asia/Manila",
    }
);

cron.schedule(
    "0 12 * * *",
    async () => {
        const threadList = await api.getThreadList(20, null, ["INBOX"]);
        threadList.forEach((thread) => {
            api.sendMessage(`Life update: Malapit na mamatay!`, thread.threadID);
        });
    },
    {
        scheduled: false,
        timezone: "Asia/Manila",
    }
);

cron.schedule(
    "0 18 * * *",
    async () => {
        const threadList = await api.getThreadList(20, null, ["INBOX"]);
        threadList.forEach((thread) => {
            api.sendMessage(`Life update: Namimiss na kita!`, thread.threadID);
        });
    },
    {
        scheduled: false,
        timezone: "Asia/Manila",
    }
);
});


function reply(api, msg, threadID, messageID) {
    api.sendMessage(msg, threadID, messageID);
}


const cooldowns = new Map();

async function handleMessageEvent(api, event) {
    const senderID = event.senderID;
    const message = event.body;

    try {
        if (message === "prefix" || message === "ano prefix" || message === "Prefix") {
            return api.sendMessage(`Yoo This Is My Prefix [ ${global.config.prefix} ]`, event.threadID, event.messageID);
        }

        const userInfo = await api.getUserInfo(senderID);
        const name = userInfo[senderID]?.name;
        console.log(`User: ${name} - Message: ${message}`);

        if (!message.startsWith(global.config.prefix)) return;

        const args = message.slice(global.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = commands.get(commandName);

        if (!command) {
            return api.sendMessage(`Command not found. Use ${global.config.prefix}help to See all commands.`, event.threadID, event.messageID);
        }

        if (command.eurix.permission && !global.config.admins.includes(senderID)) {
            return api.sendMessage("⚠️ You do not have permission to use this command.", event.threadID, event.messageID);
        }

        if (!cooldowns.has(commandName)) {
            cooldowns.set(commandName, new Map()); 
        }

        const now = Date.now();
        const timestamps = cooldowns.get(commandName);

        if (timestamps.has(senderID)) {
            const expirationTime = timestamps.get(senderID) + command.eurix.cooldown * 1000;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                const time = timeLeft.toFixed(0);
                return api.sendMessage(`Please wait ${time} seconds. 🕖`, event.threadID, event.messageID);
            }
        }

        timestamps.set(senderID, now);
        setTimeout(() => timestamps.delete(senderID), command.eurix.cooldown * 1000);


        command.execute({
            api,
            event,
            args,
            reply: (msg) => api.sendMessage(msg, event.threadID, event.messageID), react: (emoji) => api.setMessageReaction(emoji, event.messageID, (err) => {}, true)
        });
    } catch (error) {
        console.error("Error in command execution: ", error);
        api.sendMessage("There was an error executing the command.", event.threadID);
    }
}