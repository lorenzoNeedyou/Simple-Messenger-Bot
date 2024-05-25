const path = require("path");
const axios = require("axios");
const fs = require("fs");

module.exports = {
eurix: {
  name: "eabab",
  version: "9",
  credits: "Eugene Aguilar",
  description: "Generate random shoti 😝",
  permission: 0,
  usages: "[eabab]",
  cooldown: 10,
},
execute: async function ({ api, event, react, reply }) {
  try {
    react("🕥");

      const response = await axios.post(`https://shotiapi.onrender.com/api/request/f`);

      const video = response.data.data.eurixmp4;
      const username = response.data.data.username;
      const nickname = response.data.data.nickname;
      const title = response.data.data.title;

      const videoPath = path.join(__dirname, "cache", "eabab.mp4");

      const videoResponse = await axios.get(video, { responseType: "arraybuffer" });

      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data));


        react("✅");


      await reply(
        {
          body: `nag liliyab na bilat 💥\nUsername: ${username}\nNickname: ${nickname}\nTitle: ${title}`,
          attachment: fs.createReadStream(videoPath),
        });
  } catch (error) {
    reply(`error: ${error.message}`);
    console.log(error);
  }
}
};