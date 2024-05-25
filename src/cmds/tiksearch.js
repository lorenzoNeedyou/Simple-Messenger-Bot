const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports = {
  eurix: {
    name: "tiksearch",
    version: "9.0.1",
    permission: 0,
    credits: "Eugene Aguilar",
    description: "Search for Tiktok videos",
    usages: "[search]",
    cooldown: 10,
  },

  execute: async function ({ api, event, args, reply }) {
    try {
      const search = args.join(" ");
      if (!search) {
        reply(`${global.config.prefix}tiksearch [search]`);
        return;
      }

      reply(`🕥 searching TikTok for ${search}`);

      const response = await axios.get(`https://eurixapi.onrender.com/tiksearch?search=${encodeURIComponent(search)}`);
      const videoUrl = response.data.data.videos[0].play;
      const username = response.data.data.videos[0].author.unique_id;
      const nickname = response.data.data.videos[0].author.nickname;
      const title = response.data.data.videos[0].title;

      let videoPath = path.join(__dirname, "cache", "tiksearch.mp4");

      const video = await axios.get(videoUrl, { responseType: "arraybuffer" });

      fs.writeFileSync(videoPath, Buffer.from(video.data, "binary"));

      await reply({ body: `Username: ${username}\nNickname: ${nickname}\nTitle: ${title}`, attachment: fs.createReadStream(videoPath) });
    } catch (error) {
      reply(`${error.message}`);
      console.log(error);
    }
  }
};