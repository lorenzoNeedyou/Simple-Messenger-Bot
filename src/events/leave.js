const path = require("path");
const fs = require("fs");
const axios = require("axios");

async function handleLeaveEvent(api, event) {
    try {
        const threadID = event.threadID;
        const leftParticipantID = event.logMessageData.leftParticipantFbId;
        const adminID = event.author;

        const userInfo = await api.getUserInfo(leftParticipantID);
        const adminInfo = await api.getUserInfo(adminID);

        const userName = userInfo[leftParticipantID]?.name || 'Unknown User';
        const adminName = adminInfo[adminID]?.name || 'Unknown Admin';

        const threadInfo = await api.getThreadInfo(threadID);

        let leaveMessage;
        if (adminID === leftParticipantID) {
            leaveMessage = `${userName} has left the ${threadInfo.threadName}. Goodbye! 👋`;
        } else {
            leaveMessage = `${userName} was removed by ${adminName} from ${threadInfo.threadName}.`;
        }

        const memberCount = threadInfo.participantIDs.length;

        const response = await axios.get(`https://leavecanvasapibyjonell-5715724d201c.herokuapp.com/leave?name=${firstName}&id=${event.logMessageData.leftParticipantFbId}&background=${avt1}&count=${memberCount}`, { responseType: "arraybuffer" });
        const img = response.data;

        const imgPath = path.join(__dirname, "cache", `${leftParticipantID}.png`);

        fs.writeFileSync(imgPath, img);

        api.sendMessage({ body: leaveMessage, attachment: fs.createReadStream(imgPath) }, threadID);
    } catch (error) {
        console.error("Error in handleLeaveEvent: ", error);
    }
}

module.exports = { handleLeaveEvent };