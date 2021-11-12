const {
	MessageType,
	Presence
} = require("@adiwajshing/baileys");
const fs = require("fs");

const { getBuffer, sleep } = require ("../lib/functions")
let setting = JSON.parse(fs.readFileSync('./setting.json'));
let { botName } = setting
const welcome = JSON.parse(fs.readFileSync("./database/welcome.json"))

module.exports = async(Ardy, anj) => {
  const isWelcome = welcome.includes(anj.jid)
  const mdata = await Ardy.groupMetadata(anj.jid)
  const groupName = mdata.subject
  if(anj.announce == 'false'){
teks = ` [ Group Opened ] \n\n_Group telah dibuka oleh admin_\n_Sekarang semua member bisa mengirim pesan_`
Ardy.sendMessage(mdata.id, teks, MessageType.text)
console.log(`- [ Group Opened ] - In ${mdata.subject}`)
}
else if(anj.announce == 'true'){
teks = ` [ Group Closed ] \n\n_Group telah ditutup oleh admin_\n_Sekarang hanya admin yang dapat mengirim pesan_`
Ardy.sendMessage(mdata.id, teks, MessageType.text)
console.log(` [ Group Closed ]  In ${mdata.subject}`)
}
else if(!anj.desc == ''){
tag = anj.descOwner.split('@')[0] + '@s.whatsapp.net'
teks = ` [ Group Description Change ] \n\nDeskripsi Group telah diubah oleh Admin @${anj.descOwner.split('@')[0]}\n• Deskripsi Baru : ${anj.desc}`
Ardy.sendMessage(mdata.id, teks, MessageType.text, {contextInfo: {"mentionedJid": [tag]}})
console.log(`- [ Group Description Change ] - In ${mdata.subject}`)
  }
else if(anj.restrict == 'false'){
teks = ` [ Group Setting Change ] \n\nEdit Group info telah dibuka untuk member\nSekarang semua member dapat mengedit info Group Ini`
Ardy.sendMessage(mdata.id, teks, MessageType.text)
console.log(`- [ Group Setting Change ] - In ${mdata.subject}`)
  }
else if(anj.restrict == 'true'){
teks = `- [ Group Setting Change ] -\n\nEdit Group info telah ditutup untuk member\nSekarang hanya admin group yang dapat mengedit info Group Ini`
Ardy.sendMessage(mdata.id, teks, MessageType.text)
console.log(`- [ Group Setting Change ] - In ${mdata.subject}`)
}
}