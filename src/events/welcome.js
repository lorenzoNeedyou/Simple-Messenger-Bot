const path = require("path");
const fs = require("fs");
const axios = require("axios");

async function handleWelcomeEvent(api, event) {
  try {
      const threadID = event.threadID;
      const newParticipantID = event.logMessageData.addedParticipants[0].userFbId;

      if (event.logMessageData.addedParticipants.some(i => i.userFbId === api.getCurrentUserID())) {
          await api.changeNickname(
              `》 ${global.config.prefix} 《 ❃ ➠ ${global.config.botname}`, 
              threadID, 
              api.getCurrentUserID()
          );
          await api.sendMessage(
              `Thanks for adding me to your group chat\n\nUse '${global.config.prefix}callad' to contact my owner`,
              threadID
          );
          const data = [
              "237320150420978", "237319783754348", "237320717087588", "237320883754238", 
              "237319520421041", "237318747087785", "237319140421079", "1758916757924643", 
              "755993066563418", "997309845161283", "907380497777864", "126362187548578", 
              "237317987087861", "237317540421239"
          ];
          const sticker = data[Math.floor(Math.random() * data.length)];

          await api.sendMessage({ sticker: sticker }, threadID);

      } else {
          const threadInfo = await api.getThreadInfo(threadID);
          const userInfo = await api.getUserInfo(newParticipantID);
          const name = userInfo[newParticipantID].name;
          const memberCount = threadInfo.participantIDs.length;

          const welcomeMessage = `Hello, ${name},\nWelcome to ${threadInfo.threadName}.\nYou are the ${memberCount}th member of our community; please enjoy! 🥳♥`;


const t = await axios.get(`https://join2apibyjonell-7b4fde8396f3.herokuapp.com/join2?name=${firstName}&id=${senderID}&background=${avt1}&count=${memberCount}`, { responseType: "arraybuffer"});
const avatar = t.data;

let imagePath = path.join(__dirname, "cache", `${newParticipantID}.png`);

fs.writeFileSync(imagePath, avatar);

          await api.sendMessage({body: `${welcomeMessage}`, attachment: fs.createReadStream(imagePath)}, threadID);
      }
  } catch (error) {
      console.error("Error in handleWelcomeEvent: ", error);
  }
}

module.exports = { handleWelcomeEvent };