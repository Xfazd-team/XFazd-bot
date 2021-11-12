const {
    MessageType,
    Presence
} = require("@adiwajshing/baileys");
const moment = require("moment-timezone");
const fs = require("fs");

let setting = JSON.parse(fs.readFileSync('./setting.json'));

let {
    antiDelete
} = setting

module.exports = async (Ardy, m) => {
    if (antiDelete === false) return
    if (m.key.remoteJid == 'status@broadcast') return
    if (!m.key.fromMe && m.key.fromMe) return
    m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
    const jam = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let d = new Date
    let locale = 'id'
    let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
    let week = d.toLocaleDateString(locale, {
        weekday: 'long'
    })
    let calender = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    console.log(`Antidelete [${jam} ${week} ${calender}] : ${m.participant.split("@")[0]}`)
    const type = Object.keys(m.message)[0]
    Ardy.sendMessage(m.key.remoteJid, `\`\`\`「 Anti Delete 」\`\`\`
•> Nama : @${m.participant.split("@")[0]}
•> Waktu : ${jam} ${week} ${calender}
•> Type : ${type}`, MessageType.text, {
        quoted: m.message,
        contextInfo: {
            "mentionedJid": [m.participant]
        }
    })
    Ardy.copyNForward(m.key.remoteJid, m.message)
}