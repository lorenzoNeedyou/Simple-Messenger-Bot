const axios  = require("axios");

module.exports = {
    eurix: {
        name: "eval",
        version: "1.0.0",
        description: "Evaluates JavaScript code.",
        permission: 1, 
        credits: "Eugene Aguilar",
        usages: "/eval <code>",
        cooldown: 0,
    },
    execute: async function ({ api, event, args, reply }) {
        const senderID = event.senderID;


        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            api.sendMessage(evaled, event.threadID, event.messageID);
        } catch (error) {
            console.error(error);
            api.sendMessage(`Error: ${error.message}`, event.threadID, event.messageID);
        }
    }
};