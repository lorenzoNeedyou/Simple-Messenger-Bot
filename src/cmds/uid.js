module.exports = {
    eurix: {
        name: "uid",
        version: "1.0.0",
        description: "Get the user ID of the mentioned user, the user in a reply message, or the sender if no user is mentioned.",
        permission: 0,
        credits: "Eugene Aguilar",
        usages: "/uid [optional: @mention or in reply to a message]",
        cooldown: 0,
    },
    execute: async function ({ api, event, args }) {
        try {
            let userID;
            let userName;

            // Check if the message is a reply to another message
            if (event.messageReply) {
                userID = event.messageReply.senderID;
                userName = event.messageReply.body || "the replied user";
            } else if (event.mentions && Object.keys(event.mentions).length > 0) {
                userID = Object.keys(event.mentions)[0];
                userName = event.mentions[userID];
            } else {
                userID = event.senderID;
                userName = "you";
            }

            if (userID) {
                let responseMessage = `The user ID of ${userName} is ${userID}.`;

                // Handle additional arguments
                if (args.length > 0) {
                    responseMessage += `\nAdditional arguments: ${args.join(' ')}`;
                }

                api.sendMessage(
                    responseMessage,
                    event.threadID,
                    event.messageID
                );
            } else {
                api.sendMessage(
                    "Please mention a user, reply to a message, or just type /uid to get your user ID.",
                    event.threadID,
                    event.messageID
                );
            }
        } catch (error) {
            console.error(error);
            api.sendMessage(
                "An error occurred while fetching the user ID.",
                event.threadID,
                event.messageID
            );
        }
    }
};