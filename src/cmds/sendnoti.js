module.exports = {
eurix: {
  name: "sendnoti",
  version: "9.0.2",
  credits: "Eugene Aguilar",
  description: "Send notifications to all thread users",
  permission: 2,
  usages: "sendnoti [text]",
  version: "2.1.0",
  cooldown: 8,
},
  execute: async function ({ api, event, args }) {
    try {
      const threadList = await api.getThreadList(100, null, ["INBOX"]);

      if (args.length === 0) {
        return api.sendMessage(
          "Please provide a message to send.",
          event.threadID
        );
      }

      const message = args.join(" ");

      for (let thread of threadList) {
        await api.sendMessage(
          `Notification from admin\n\n${message}\n\nThread: ${thread.name}`,
          thread.threadID
        );
      }

      api.sendMessage("Notification sent to all threads.", event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage(
        "An error occurred while sending notifications.",
        event.threadID
      );
    }
  }
};