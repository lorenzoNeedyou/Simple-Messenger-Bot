const path = require("path");
const fs = require("fs");
const configPath = path.join(__dirname, "../../config.json");

module.exports = {
eurix: {
    name: "admin",
    credits: "Eugene Aguilar",
    description: "Admin commands",
    usages: "admin [ add | remove | list ]",
    permission: 1,
    version: "1.0.0",
    cooldown: 0,
},
    execute: async function ({ api, event, args }) {
        const senderID = event.senderID;

        if (!args.length) {
            api.sendMessage(
                "Usage: admin [ add | remove | list ]",
                event.threadID,
                event.messageID,
            );
            return;
        }

        const subCommand = args[0].toLowerCase();

        if (subCommand === "add") {
            let newAdminID;

         
            if (Object.keys(event.mentions).length > 0) {
                newAdminID = Object.keys(event.mentions)[0];
            } else {
                newAdminID = args[1];
            }

            if (!newAdminID) {
                api.sendMessage(
                    "Please provide the user ID or mention the new admin.",
                    event.threadID,
                    event.messageID,
                );
                return;
            }

            let config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
            if (!config.admins.includes(newAdminID)) {
                config.admins.push(newAdminID);
                fs.writeFileSync(
                    configPath,
                    JSON.stringify(config, null, 2),
                    "utf-8",
                );
                api.sendMessage(
                    `User ${newAdminID} has been added as an admin.`,
                    event.threadID,
                    event.messageID,
                );
            } else {
                api.sendMessage(
                    `User ${newAdminID} is already an admin.`,
                    event.threadID,
                    event.messageID,
                );
            }
        } else if (subCommand === "remove") {
            let removeAdminID;

         
            if (Object.keys(event.mentions).length > 0) {
                removeAdminID = Object.keys(event.mentions)[0];
            } else {
                removeAdminID = args[1];
            }

            if (!removeAdminID) {
                api.sendMessage(
                    "Please provide the user ID or mention the admin to remove.",
                    event.threadID,
                    event.messageID,
                );
                return;
            }

            let config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
            const index = config.admins.indexOf(removeAdminID);
            if (index > -1) {
                config.admins.splice(index, 1);
                fs.writeFileSync(
                    configPath,
                    JSON.stringify(config, null, 2),
                    "utf-8",
                );
                api.sendMessage(
                    `User ${removeAdminID} has been removed from admins.`,
                    event.threadID,
                    event.messageID,
                );
            } else {
                api.sendMessage(
                    `User ${removeAdminID} is not an admin.`,
                    event.threadID,
                    event.messageID,
                );
            }
        } else if (subCommand === "list") {
            let config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
            const adminList = config.admins.join("\n");

            
            const names = [];
            for (const adminID of config.admins) {
                const userInfo = await api.getUserInfo(adminID);
                names.push(userInfo[adminID].name);
            }
            const name = names.join("\n");

            api.sendMessage(
                `Admin list\n\n${name}\n\n${adminList}`,
                event.threadID,
                event.messageID,
            );
        } else {
            api.sendMessage(
                "Unknown subcommand. Use one of: add, remove, list",
                event.threadID,
                event.messageID,
            );
        }
    },
};