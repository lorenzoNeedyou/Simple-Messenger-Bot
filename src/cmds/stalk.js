module.exports = {
eurix: {
  name: "stalk",
  version: "1.0.0",
  permission: 0,
  credits: "Eugene Aguilar",
  description: "Get info using UID/mention/reply to a message.",
usages: "stalk [uid/mention/reply]",
cooldown: 9,
},
execute: async function ({api, event, args , reply}) {
  try {
      const axios = require('axios');
      const fs = require("fs-extra");
      const request = require("request");
      const { threadID, senderID, messageID } = event;

      let id;
      if (args.join().indexOf('@') !== -1) {
          id = Object.keys(event.mentions)[0];
      } else {
          id = args[0] || event.senderID;
      }

      if (event.type === "message_reply") {
          id = event.messageReply.senderID;
      }

      const res = await axios.post(`https://eurixapi.onrender.com/stalk`, { uid: id });

      const { name, gender, relationship, love, link, followers, birthday, hometown, location, avatar } = res.data;

      const ok = `❯ Name: ${name}\n❯ ID: ${id}\n❯ Birthday: ${birthday}\n❯ Gender: ${gender}\n❯ Hometown: ${hometown}\n❯ Location: ${location}\n❯ Relationship: ${relationship} with ${love}\n❯ Followers: ${followers}\n❯ Link: ${link}`;


      const imageStream = fs.createWriteStream(__dirname + `/cache/image.png`);
      request(encodeURI(avatar)).pipe(imageStream);
      imageStream.on("close", () => {
          reply({
              body: `${ok}`,
              attachment: fs.createReadStream(__dirname + `/cache/image.png`)
          }, () => fs.unlinkSync(__dirname + `/cache/image.png`));
      });
  } catch (error) {
reply(`error na bai maya naman`);
      console.error(error);
  }
}
}; 