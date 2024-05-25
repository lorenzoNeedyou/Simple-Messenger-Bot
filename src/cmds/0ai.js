const axios = require('axios');

module.exports = {
  eurix: {
      name: "ai",
     version: "9.0.2",
      description: "Chat gpt4",
      credits: "Unknown",
      permission: 0,
      usages: "ai [ ask ]",
      cooldown: 2,
  },
    execute: async function ({ api, event, args, reply })  {
        try {
            const ask = args.join(" ");
            if (!ask) {
                return reply(`${global.config.prefix}ai [ ask ]`);
            }
            const response = await axios.get(`https://akhiro-rest-api.onrender.com/api/gpt4?q=${encodeURIComponent(ask)}`);
            const answer = response.data.content;
            reply(answer);
        } catch (error) {
            console.error(error);
            reply("An error occurred while processing your request.");
        }
    }
};