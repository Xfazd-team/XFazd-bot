const {
    WAConnection: _WAConnection,
    MessageType,
    Presence,
    MessageOptions,
    Mimetype,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    WA_MESSAGE_STUB_TYPE,
    ReconnectMode,
    ProxyAgent, 
    GroupSettingChange,
    ChatModification,
    waChatKey,
    WA_DEFAULT_EPHEMERAL,
    mentionedJid, 
    WAMessageProto,
    prepareMessageFromContent 
} = require('@adiwajshing/baileys')
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta").locale("id");
const { exec, spawn } = require("child_process");
const speed = require('performance-now')
const fetch = require('node-fetch');
const util = require("util")
const ffmpeg = require("fluent-ffmpeg");
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, sleep} = require('../lib/functions')
const { color } = require("../lib/color");
const request = require('request');
const ms = require('parse-ms')
const toMs = require('ms')
const axios = require("axios")
const fs = require("fs")
const setting = JSON.parse(fs.readFileSync("./setting.json"))
const qrcodes = require('qrcode');
const { isTicTacToe, getPosTic } = require("../lib/tictactoe");
const tictac = require("../lib/tictac");

const { TiktokDownloader } = require("../lib/gakguna.js");
const { fetchJson, fetchText , kyun} = require('../lib/fetcher')

// stickwm
const Exif = require('../lib/exif')
const exif = new Exif()


// db
const antilink = JSON.parse(fs.readFileSync("./database/antilink.json"))
const welcome = JSON.parse(fs.readFileSync("./database/welcome.json"))
let tictactoe = [];

const {
  botName,
  autoRead,
  ArdyKey
} = setting

mode = "public"
multi = true
nopref = false
prefa = "#" 

    const {
        smsg
    } = require('../lib/simple')

    const _scommand = JSON.parse(fs.readFileSync("./connect/scommand.json"))
    const mess = JSON.parse(fs.readFileSync('./connect/mess.json'));

    const ownerNumber = ["6285757306288@s.whatsapp.net", "6287863200063@s.whatsapp.net", "6281233962128@s.whatsapp.net", "628871746203@s.whatsapp.net"]
    //const ownerName = ""
    //const botName = "XFazd Bot"

const addCmd = (id, command) => {
    const obj = { id: id, chats: command }
    _scommand.push(obj)
    fs.writeFileSync('./connect/scommand.json', JSON.stringify(_scommand))
}

const getCommandPosition = (id) => {
    let position = null
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

const getCmd = (id) => {
    let position = null
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return _scommand[position].chats
    }
}


const checkSCommand = (id) => {
    let status = false
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            status = true
        }
    })
    return status
}

    module.exports = async (fazd, xfazd, blocked) => {
            try {
                const m = await smsg(fazd, xfazd)
                const content = JSON.stringify(m.message)
                const from = m.key.remoteJid
                const type = Object.keys(m.message)[0]
                const {
                    text,
                    extendedText,
                    contact,
                    location,
                    liveLocation,
                    image,
                    video,
                    sticker,
                    document,
                    audio,
                    product
                } = MessageType

                const { menu } = require("./help")

                const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
                const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')
                const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')
                const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')
                const cmd = (type === 'conversation' && m.message.conversation) ? m.message.conversation : (type == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (type == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (type == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
                body = (type === 'conversation' && m.message.conversation) ? m.message.conversation : (type == 'imageMessage') && m.message[type].caption ? m.message[type].caption : (type == 'videoMessage') && m.message[type].caption ? m.message[type].caption : (type == 'extendedTextMessage') && m.message[type].text ? m.message[type].text : (type == 'listResponseMessage') && m.message[type].singleSelectReply.selectedRowId ? m.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && m.message[type].selectedButtonId ? m.message[type].selectedButtonId : (type == 'stickerMessage') && (getCmd(m.message[type].fileSha256.toString('base64')) !== null && getCmd(m.message[type].fileSha256.toString('base64')) !== undefined) ? getCmd(m.message[type].fileSha256.toString('base64')) : ""
                budy = (type === 'conversation') ? m.message.conversation : (type === 'extendedTextMessage') ? m.message.extendedTextMessage.text : ''
                const command = body.toLowerCase().split(' ')[0] || ''
                if (multi) {
                  var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(command) ? command.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
                } else {
                  if (nopref) {
                    prefix = ""
                  } else {
                    prefix = prefa
                  }
                }
                const args = body.split(" ")
                const isCmd = body.startsWith(prefix)
                const q = body.slice(command.length + 1, body.length)
                
                const totalchat = await fazd.chats.all()
                const botNumber = fazd.user.jid
                const isGroup = from.endsWith('@g.us')
                const sender = m.key.fromMe ? fazd.user.jid : isGroup ? m.participant : m.key.remoteJid
                const senderNumber = sender.split("@")[0]
                const groupMetadata = isGroup ? await fazd.groupMetadata(from) : ''
                const groupName = isGroup ? groupMetadata.subject : ''
                const groupDesc = isGroup ? groupMetadata.desc : ''
                const groupId = isGroup ? groupMetadata.jid : ''
                const groupMembers = isGroup ? groupMetadata.participants : ''
                const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
                const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
                const isGroupAdmins = groupAdmins.includes(sender) || false
                const isOwner = ownerNumber.includes(sender)
                const conts = m.key.fromMe ? fazd.user.jid : fazd.contacts[sender] || {
                    notify: jid.replace(/@.+/, '')
                }
                const pushname = m.key.fromMe ? fazd.user.name : conts.notify || conts.vname || conts.name || '-'
                //const q = args.join(' ')
                
                const isAntiLink = isGroup ? antilink.includes(from) : false
                const isWelcome = isGroup ? welcome.includes(from) : false

                const isUrl = (url) => {
                    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
                }

                function parseMention(text = '') {
                    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
                }
                const reply = (teks) => {
                    fazd.sendMessage(from, teks, text, {
                        quoted: xfazd
                    })
                }
                const sendMess = (hehe, teks) => {
                    fazd.sendMessage(hehe, teks, text)
                }
                const sendText = (from, teks) => {
                        fazd.sendMessage(from, teks, text)
                 }
                const mentions = (teks, memberr, id) => {
                    (id == null || id == undefined || id == false) ? fazd.sendMessage(from, teks.trim(), extendedText, {
                        contextInfo: {
                            "mentionedJid": memberr
                        }
                    }): fazd.sendMessage(from, teks.trim(), extendedText, {
                        quoted: xfazd,
                        contextInfo: {
                            "mentionedJid": memberr
                        }
                    })
                }
                const sendStickerUrl = async(to, url) => {
console.log(color(time, 'magenta'), color(moment.tz('Asia/Jakarta').format('HH:mm:ss'), "gold"), color('Downloading sticker...'))
var names = getRandom('.webp')
var namea = getRandom('.png')
var download = function (uri, filename, callback) {
request.head(uri, function (err, res, body) {
request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
download(url, namea, async function () {
let filess = namea
let asw = names
require('../lib/exif.js')
exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
exec(`webpmux -set exif ./stickers/data.exif ${asw} -o ${asw}`, async (error) => {
let media = fs.readFileSync(asw)
fazd.sendMessage(from, media, sticker, {quoted:xfazd})
console.log(color(time, 'magenta'), color(moment.tz('Asia/Jakarta').format('HH:mm:ss'), "gold"), color('Succes send sticker...'))
});
});
});
}

                const runtime = function(seconds) {
                    seconds = Number(seconds);
                    var d = Math.floor(seconds / (3600 * 24));
                    var h = Math.floor(seconds % (3600 * 24) / 3600);
                    var m = Math.floor(seconds % 3600 / 60);
                    var s = Math.floor(seconds % 60);
                    var dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " hari, ") : "";
                    var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " jam, ") : "";
                    var mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " menit, ") : "";
                    var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " detik") : "";
                    return dDisplay + hDisplay + mDisplay + sDisplay;
                }
                
                if (budy.startsWith("$")) {
                  if (!budy.slice(2) || !isOwner) return
                  console.log(color("[EXEC] FROM OWNER"))
                  exec(budy.slice(2), async (err, stdout) => {
                    if (err) return reply(err)
                    reply(stdout)
                  })
                }
                
                if (budy.startsWith(">")) {
                  if (!budy.slice(2) || !isOwner) return
                  console.log("[EVAL] FROM OWNER")
                  try {
                    let jsoneval = await eval(`;(async () => { return ${budy.slice(2)} })();`)
                    reply(jsonformat(jsoneval))
                  } catch (e) {
                    reply(e)
                  }
                }
                
                if (budy.startsWith("=>")) {
                  if (!isOwner || !budy.slice(2)) return
                  var konsol = budy.slice(2)
                  Return = (sul) => {
                    var sat = JSON.stringify(sul, null, 2)
                    bang = util.format(sat)
                    if (sat === undefined) {
                      bang = util.format(sul)
                    }
                    return reply(bang)
                  }
                  try {
                    reply(util.format(eval(`;(async () => { ${konsol} })()`)))
                    console.log("[EVAL ASYNC] Dari Owner")
                  } catch (e) {
                    reply (e)
                  }
               }
                
                if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins) {
                  if (budy.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                    reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                    fazd.groupRemove(from, [sender])
                  }
                }
                
                if (mode === "self") {
                  if (!m.key.fromMe && !isOwner) return
                }
                
                if (autoRead) {
                  await fazd.chatRead(from, "read")
                }

                colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
                const isImage = (type === 'imageMessage')
                const isVideo = (type === 'videoMessage')
                const isSticker = (type == 'stickerMessage')                
                const isMedia = (type === 'imageMessage' || type === 'videoMessage')
                const isQuotedMsg = type === 'extendedTextMessage' && content.includes('Message')
                const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
                const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
                const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
                const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

                // CMD
                if (isCmd && !isGroup)
                    console.log(color('[ FAZD ]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'Dari', color(pushname))

                if (isCmd && isGroup)
                    console.log(color('[ FAZD ]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'Dari', color(pushname), 'Di', color(groupName))

                function monospace(string) {
                    return '```' + string + '```'
                }

                function jsonformat(string) {
                    return JSON.stringify(string, null, 2)
                }

                function randomNomor(angka) {
                    return Math.floor(Math.random() * angka) + 1
                }
                const nebal = (angka) => {
                    return Math.floor(angka)
                }
                
                
                //anonymous
                function _0x1592(){const _0x37a83f=['includes','test','348AbakLW','map','27558HtZJks','Lanjut','anonymous','12294msZJRg','\x5c$&','isArray','.leave','string','msg','CHATTING','430888ToiRVi','Stop','copyNForward','quoted','2271447uXzGrC','values','replace','@s.whatsapp.net','.stop','25445190DvRTfI','sender','.next','fromMe','exec','endsWith','find','text','1253jkfPpR','1krovBc','chat','6182195iMfJMT','Cari\x20Partner','8537592THMCNK','.start'];_0x1592=function(){return _0x37a83f;};return _0x1592();}const _0x2b2986=_0x4ea8;(function(_0x5bd027,_0x4f0bdb){const _0xd05060=_0x4ea8,_0x47e768=_0x5bd027();while(!![]){try{const _0x54d467=-parseInt(_0xd05060(0x8b))/0x1*(-parseInt(_0xd05060(0x79))/0x2)+parseInt(_0xd05060(0x6f))/0x3*(parseInt(_0xd05060(0x6d))/0x4)+-parseInt(_0xd05060(0x8d))/0x5+-parseInt(_0xd05060(0x72))/0x6*(parseInt(_0xd05060(0x8a))/0x7)+-parseInt(_0xd05060(0x8f))/0x8+-parseInt(_0xd05060(0x7d))/0x9+parseInt(_0xd05060(0x82))/0xa;if(_0x54d467===_0x4f0bdb)break;else _0x47e768['push'](_0x47e768['shift']());}catch(_0x5eb5bf){_0x47e768['push'](_0x47e768['shift']());}}}(_0x1592,0x9b5c1));function _0x4ea8(_0x5eeee7,_0x4e55d6){const _0x1592e5=_0x1592();return _0x4ea8=function(_0x4ea856,_0x4e7eae){_0x4ea856=_0x4ea856-0x6a;let _0x31c475=_0x1592e5[_0x4ea856];return _0x31c475;},_0x4ea8(_0x5eeee7,_0x4e55d6);}const str2Regex=_0x570bde=>_0x570bde[_0x2b2986(0x7f)](/[|\\{}()[\]^$+*?.]/g,_0x2b2986(0x73)),match=(prefix instanceof RegExp?[[prefix['exec'](m['text']),prefix]]:Array[_0x2b2986(0x74)](prefix)?prefix[_0x2b2986(0x6e)](_0x236870=>{const _0x3de517=_0x2b2986;let _0x5e088a=_0x236870 instanceof RegExp?_0x236870:new RegExp(str2Regex(_0x236870));return[_0x5e088a[_0x3de517(0x86)](m[_0x3de517(0x89)]),_0x5e088a];}):typeof prefix===_0x2b2986(0x76)?[[new RegExp(str2Regex(prefix))[_0x2b2986(0x86)](m[_0x2b2986(0x89)]),new RegExp(str2Regex(prefix))]]:[[[],new RegExp()]])[_0x2b2986(0x88)](_0x32f074=>_0x32f074[0x1]);if(match&&m[_0x2b2986(0x8c)][_0x2b2986(0x87)](_0x2b2986(0x80))&&!isCmd){this[_0x2b2986(0x71)]=this[_0x2b2986(0x71)]?this[_0x2b2986(0x71)]:{};let room=Object[_0x2b2986(0x7e)](this[_0x2b2986(0x71)])[_0x2b2986(0x88)](_0x1e2eb7=>[_0x1e2eb7['a'],_0x1e2eb7['b']]['includes'](m[_0x2b2986(0x83)])&&_0x1e2eb7['state']===_0x2b2986(0x78));if(room){if(/^.*(next|leave|start)/[_0x2b2986(0x6c)](m[_0x2b2986(0x89)]))return;if([_0x2b2986(0x84),_0x2b2986(0x75),_0x2b2986(0x81),_0x2b2986(0x6a),_0x2b2986(0x8e),'Keluar',_0x2b2986(0x70),_0x2b2986(0x7a)][_0x2b2986(0x6b)](m[_0x2b2986(0x89)]))return;let other=[room['a'],room['b']][_0x2b2986(0x88)](_0x18aa5e=>_0x18aa5e!==m['sender']);m[_0x2b2986(0x7b)](other,!![],m[_0x2b2986(0x7c)]&&m[_0x2b2986(0x7c)][_0x2b2986(0x85)]?{'contextInfo':{...m[_0x2b2986(0x77)]['contextInfo'],'forwardingScore':0x0,'isForwarded':!![],'participant':other}}:{});}return!0x0;}
                
                // tictactoe
                if (isTicTacToe(from, tictactoe)) tictac(body, prefix, tictactoe, from, sender, reply, mentions)
                
                /*<--------Batas------->*/
                switch (command) {
                  case "prefix":
                  case "cekprefix":{
                    reply(`Multi Prefix : ${multi ? "Yes" : "No"}
No Prefix : ${nopref ? "Yes" : "No"}
Single Prefix : ${!multi && !nopref ? "Yes" : "No"}
Current Prefix : ${multi ? "•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-," : nopref ? "None" : prefa}`)
                  }
                  
                  case prefix + "menu":
                  case prefix + "help":
                    reply(menu(prefix, botName))
                  break

                  case prefix + "runtime":{
                    reply(runtime(process.uptime()))
                  }
                  break

                  case prefix + "autoread":
                    if (!isOwner) return reply(mess.OnlyOwner)
                    if (args.length < 2) return reply(`Masukkan options : [on/off]`)
                    if (q == "on") {
                      setting.autoRead = true
                      fs.writeFileSync("./setting.json", JSON.stringify(setting))
                      reply("Berhasil Mengubah Auto Read Ke On")
                    } else if (q == "off") {
                      setting.autoRead = false
                      fs.writeFileSync("./setting.json", JSON.stringify(setting))
                      reply("Berhasil Mengubah Auto Read Ke Off")
                    } else {
                      reply(`Masukkan options : [on/off]`)
                    }
                  break
                  case prefix + "antidelete":
                    if (!isOwner) return reply(mess.OnlyOwner)
                    if (args.length < 2) return reply(`Masukkan options : [on/off]`)
                    if (q == "on") {
                      setting.antiDelete = true
                      fs.writeFileSync("./setting.json", JSON.stringify(setting))
                      reply("Berhasil Mengubah Antidelete Ke On")
                    } else if (q == "off") {
                      setting.antiDelete = false
                      fs.writeFileSync("./setting.json", JSON.stringify(setting))
                      reply("Berhasil Mengubah Antidelete Ke Off")
                    } else {
                      reply(`Masukkan options : [on/off]`)
                    }
                  break
                  case prefix + "glitch":
                  if (!q) return reply(`Example : ${command} fazd|bot`)
                  reply(mess.wait)
                  yo = q.split('|')[0]
                  ye = q.split('|')[1]
                  ane = await getBuffer(`https://app.ardyapi.rf.gd/api/glitch?apikey=${ArdyKey}&text1=${yo}&text2=${ye}`)
                  fazd.sendMessage(from, ane, image, `NIH KAK`)
                  break
                  case prefix + "shadow":
                  case prefix + "romantic":
                  case prefix + "smoke":
                  case prefix + "butterfly":
                  case prefix + "naruto":
                  case prefix + "burnpapper":
                  case prefix + "coffecup":
                  case prefix + "lovetext":
                  case prefix + "lovemsg":
                  case prefix + "msggrass":
                  case prefix + "doubleheart":
                  if (!q) return reply(`Example : ${command} fazd|bot`)
                  reply(mess.wait)
                  ani = await getBuffer(`https://app.ardyapi.rf.gd/api/${nopref ? command : command.split(prefix)[1]}?apikey=${ArdyKey}&text=${q}`)
                  fazd.sendMessage(from, ani, image, `NIH KAK`)
                  break
                 
                  case prefix + "mode":{
                    if (args.length < 2) return reply(`Masukkan options : [self / public]`)
                    if (q == "self") {
                    mode = "self"
                    reply ("Berhasil Mengganti Mode Ke Self")                    
                    } else if (q == "public") {
                    mode = "public"
                    reply ("Berhasil Mengganti Mode Ke Public")                    
                    }
                  }
                  break
                  case prefix + "setprefix":
                    if (!isOwner) return reply(mess.OnlyOwner)
                    if (args.length < 2) return reply(`Masukkan prefix\nOptions :\n≻ multi\n≻ nopref`)
                    if (q == "multi") {
                      nopref = false
                      multi = true
                      reply("Berhasil Ganti Prefix Ke Multi")
                    } else if (q == "nopref") {
                      nopref = true
                      multi = false
                      reply("Berhasil Ganti Prefix Ke Nopref")
                    } else {
                      nopref = false
                      multi = false
                      prefa = q
                      reply("Berhasil Ganti Prefix Ke "+q)
                    }
                  break

                  case prefix + "owner":
                  case prefix + "creator":
                  case prefix + "developer":{
                    let ini_list = []
                    for (let i of ownerNumber) {
                      const vname = fazd.contacts[i] != undefined ? fazd.contacts[i].vname || fazd.contacts[i].notify : undefined
                      ini_list.push({
                        "displayName": "FAZD BOT",
                        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Fazd;Bot;;;\nFN:${vname ? `${vname}` : `${fazd.user.name}`}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                      })
                    }
                    hehe = await fazd.sendMessage(from, {
                      "displayName": `${ini_list.length} kontak`,
                      "contacts": ini_list
                    }, 'contactsArrayMessage', {quoted: xfazd})
                    fazd.sendMessage(from, "Ini Owner Ku^_^", text, {quoted: hehe})
                  }
                  break
                  case prefix+'bisakah':
					const bisa = ['Tentu Saja Bisa! Kamu Adalah Orang Paling Homky', 'Gak Bisa Ajg Aowkwowk', 'Hmm Gua Gak Tau Yaa, tanya ama bapakau', 'Ulangi Tod Gua Ga Paham']
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					fazd.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + keh, text, { quoted: xfazd })
					break
					case prefix+'kapankah':
					const kapan = ['Besok', 'Lusa', 'Tadi', '4 Hari Lagi', '5 Hari Lagi', '6 Hari Lagi', '1 Minggu Lagi', '2 Minggu Lagi', '3 Minggu Lagi', '1 Bulan Lagi', '2 Bulan Lagi', '3 Bulan Lagi', '4 Bulan Lagi', '5 Bulan Lagi', '6 Bulan Lagi', '1 Tahun Lagi', '2 Tahun Lagi', '3 Tahun Lagi', '4 Tahun Lagi', '5 Tahun Lagi', '6 Tahun Lagi', '1 Abad lagi', '3 Hari Lagi']
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					fazd.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + koh, text, { quoted: xfazd })
					break
				case prefix+'apakah':
					const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'Ulangi bro gak paham']
					const kah = apa[Math.floor(Math.random() * apa.length)]
					fazd.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + kah, text, { quoted: xfazd })
					break
				case prefix+'rate':
					const ra = ['4', '9', '17', '28', '34', '48', '59', '62', '74', '83', '97', '100', '29', '94', '75', '82', '41', '39']
					const te = ra[Math.floor(Math.random() * ra.length)]
					fazd.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + te + '%', text, { quoted: xfazd })
					break
				case prefix+'hobby':
					const hob = ['Desah Di Game', 'Ngocokin Doi', 'Stalking sosmed nya mantan', 'Kau kan gak punya hobby awokawok', 'Memasak', 'Membantu Atok', 'Mabar', 'Nobar', 'Sosmedtan', 'Membantu Orang lain', 'Nonton Anime', 'Nonton Drakor', 'Naik Motor', 'Nyanyi', 'Menari', 'Bertumbuk', 'Menggambar', 'Foto fotoan Ga jelas', 'Maen Game', 'Berbicara Sendiri']
					const by = hob[Math.floor(Math.random() * hob.length)]
					fazd.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + by, text, { quoted: xfazd })
					break
				case prefix+'cekbapak': 
					const bapak = ['Wah Mantap Lu Masih Punya Bapack\nPasti Bapack Nya Kuli :v\nAwowkwokwwok\n#CandabOs', 'Aowkwwo Disini Ada Yteam :v\nLu Yteam Bro? Awowkwowk\nSabar Bro Ga Punya Bapack\n#Camda', 'Bjir Bapack Mu Ternyata Sudah Cemrai\nSedih Bro Gua Liatnya\nTapi Nih Tapi :v\nTetep Ae Lu Yteam Aowkwowkw Ngakak :v', 'Jangan #cekbapak Mulu Broo :v\nKasian Yang Yteam\nNtar Tersinggung Kan\nYahahaha Hayyuk By : Ramlan ID']
					const cek = bapak[Math.floor(Math.random() * bapak.length)]
					fazd.sendMessage(from, cek, text, { quoted: xfazd })
					break

                  case prefix + "antilink": {
                    if (!isGroup) return reply(mess.OnlyGrup)
                    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                    if (args.length === 1) return reply(`Pilih on atau off`)
                    if (args[1].toLowerCase() == "on") {
                      if (isAntiLink) return reply(`Udah aktif`)
                      antilink.push(from)
                      fs.writeFileSync("./database/antilink.json", JSON.stringify(antilink))
                      reply("Anti link di group ini aktif")
                    } else if (args[1].toLowerCase() == "off") {
                      //if (!isAntiLink) return reply("Anti link di group ini belum pernah aktif")
                      let anu = antilink.indexOf(from)
                      antilink.splice(anu, 1)
                      fs.writeFileSync("./database/antilink.json", JSON.stringify(antilink))
                      reply("Anti link di group ini mati")
                    } else {
                      reply(`Pilih on atau off`)
                    }
                  }
                  break

case prefix + 'addcmd': 
case prefix + 'setcmd':
if (isQuotedSticker) {
if (!q) return reply(`Penggunaan : ${command} cmdnya dan tag stickernya`)
var kodenya = xfazd.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
addCmd(kodenya, q)
reply("Done Bwang")
} else {
reply('tag stickenya')
}
break

case prefix + 'delcmd':
if (!isQuotedSticker) return reply(`Penggunaan : ${command} tagsticker`)
var kodenya = xfazd.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
_scommand.splice(getCommandPosition(kodenya), 1)
fs.writeFileSync('./connect/scommand.json', JSON.stringify(_scommand))
reply("Done Bwang")
break


case prefix + 'listcmd':
let teksnyee = `\`\`\`「 LIST STICKER CMD 」\`\`\``
let cemde = [];
for (let i of _scommand) {
cemde.push(i.id)
teksnyee += `\n\n*•> ID :* ${i.id}\n*•> Cmd :* ${i.chats}`
}
reply(teksnyee)
break

                  case prefix + "welcome": {
                    if (!isGroup) return reply(mess.OnlyGrup)
                    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                    if (args.length === 1) return reply(`Pilih on atau off`)
                    if (args[1].toLowerCase() == "on") {
                      if (isWelcome) return reply(`Udah aktif`)
                      welcome.push(from)
                      fs.writeFileSync("./database/welcome.json", JSON.stringify(welcome))
                      reply("Welcome di group ini aktif")
                    } else if (args[1].toLowerCase() == "off") {
                      //if (!isAntiLink) return reply("Anti link di group ini belum pernah aktif")
                      let anu = welcome.indexOf(from)
                      welcome.splice(anu, 1)
                      fs.writeFileSync("./database/welcome.json", JSON.stringify(welcome))
                      reply("Welcome di group ini mati")
                    } else {
                      reply(`Pilih on atau off`)
                    }
                  }
                  break

                  case prefix+'stickerwm': case prefix+'swm': case prefix+'take': case prefix+'takesticker': case prefix+'takestick':{
                if (args.length < 2) return reply(`Penggunaan ${command} nama|author`)
                let packname1 = q.split('|')[0] ? q.split('|')[0] : q
                let author1 = q.split('|')[1] ? q.split('|')[1] : ''
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(xfazd).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : xfazd
                    let media = await fazd.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					exif.create(packname1, author1, `stickwm_${sender}`)
                    await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.api)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                                    if (error) return reply(mess.error.api)
									fazd.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: xfazd})
                                    fs.unlinkSync(media)	
									fs.unlinkSync(`./sticker/${sender}.webp`)	
                                    fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
                } else if ((isVideo && xfazd.message.videoMessage.fileLength < 10000000 || isQuotedVideo && xfazd.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(xfazd).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : xfazd
                    let media = await fazd.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					exif.create(packname1, author1, `stickwm_${sender}`)
                    reply(mess.wait)
						await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								let tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(mess.error.api)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return reply(mess.error.api)
									fazd.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: xfazd})
                                    fs.unlinkSync(media)
									fs.unlinkSync(`./sticker/${sender}.webp`)
                                    fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
                } else if (isQuotedSticker) {
                    let encmedia = JSON.parse(JSON.stringify(xfazd).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				    let media = await fazd.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    exif.create(packname1, author1, `takestick_${sender}`)
                    exec(`webpmux -set exif ./sticker/takestick_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                        if (error) return reply(mess.error.api)
                        fazd.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: xfazd})
                        fs.unlinkSync(media)
                        fs.unlinkSync(`./sticker/takestick_${sender}.exif`)
                    })
                }else {
                    reply(`Kirim gambar/video dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
                }
            }
                break

            case prefix+'sc':
            case prefix+'sourcecode': {
              reply(`Bot ini menggunakan sc dari : https://github.com/Xfazd-team/XFazd-bot`)
            }
            break

            case prefix+'sticker':
            case prefix+'stiker':
            case prefix+'s':
            case prefix+'stickergif':
            case prefix+'sgif':{
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(xfazd).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : xfazd
                    let media = await fazd.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.api)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                  if (error) return reply(mess.error.api)
									fazd.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: xfazd})
                  fs.unlinkSync(media)	
									fs.unlinkSync(`./sticker/${sender}.webp`)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
                } else if ((isVideo && xfazd.message.videoMessage.fileLength < 10000000 || isQuotedVideo && xfazd.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(xfazd).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : xfazd
                    let media = await fazd.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
				           	reply(mess.wait)
                    await ffmpeg(`${media}`)
							      .inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								let tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(mess.error.api)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return reply(mess.error.api)
									fazd.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: xfazd})
                  fs.unlinkSync(media)
									fs.unlinkSync(`./sticker/${sender}.webp`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
                } else {
                    reply(`Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
                }
            }
                break
case prefix+'doge':
case prefix+'domge':
case prefix+'stickdoge':
case prefix+'dogestick':
var ano = await fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/anjing')
var wifegerak = ano.split('\n')
var wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
sendStickerUrl(from, wifegerakx)
break

case prefix+'patrick':
case prefix+'patrik':
case prefix+'patrickstick':
var ano = await fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/patrik')
var wifegerak = ano.split('\n')
var wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
sendStickerUrl(from, wifegerakx)
break
                    
                  
                  //---------------------------------< Downloader Media By Dinata Gamteng >---------------------
                        // Note kalau mau ganti" ngotak bree salah dikit aja fatal , jan asal copas   
                                        
                  case prefix + "tiktok":{
                    if (args.length === 1) return reply(`Penggunaan ${command} link`)                  
                    var data = await TiktokDownloader(`${q}`)
                    fazd.sendMessage(from, {
                              url: data.result.link.watermark
                              }, video, {                    
                             sendEphemeral: true,
                             caption: `Bilang makacih kak`
                    })           
                  }
                  break     
                  case prefix + "tiktoknowm":{
                    if (args.length === 1) return reply(`Penggunaan ${command} link`)                  
                    var data = await TiktokDownloader(`${q}`)
                    fazd.sendMessage(from, {
                              url: data.result.link.nowatermark
                              }, video, {                    
                             sendEphemeral: true,
                             caption: `Bilang makacih kak`
                    })           
                  }
                  break  

case prefix + 'anonymous': {
if (isGroup) return reply('Fitur Tidak Dapat Digunakan Untuk Group!')
this.anonymous = this.anonymous ? this.anonymous : {}
sendMess(m.chat, `Welcome To Anonymous Chat\n\n${prefix}start - Search Partner\n${prefix}leave - Keluar Sesi Anonymous\n${prefix}next - Skip Sesi Anonymous\n${prefix}menu - All Menu`)
				}
break
case prefix + 'keluar': case prefix + 'leave': {
if (isGroup) return reply('Fitur Tidak Dapat Digunakan Untuk Group!')
this.anonymous = this.anonymous ? this.anonymous : {}
let room = Object.values(this.anonymous).find(room => room.check(m.sender))
if (!room) {
	await sendMess(m.chat, `_*Kamu tidak sedang berada di anonymous chat..*_`)
	throw false
}
m.reply('_Ok_')
let other = room.other(m.sender)
if (other) await sendMess(other, `_*Partner meninggalkan chat..*_`)
delete this.anonymous[room.id]
if (command === 'leave') break
				}
case prefix + 'mulai': case prefix + 'start': {
if (isGroup) return reply('Fitur Tidak Dapat Digunakan Untuk Group!')
this.anonymous = this.anonymous ? this.anonymous : {}
if (Object.values(this.anonymous).find(room => room.check(m.sender))) {
	await sendMess(m.chat, `_*Kamu masih berada di dalam anonymous chat, menunggu partner...*_`)
	throw false
}
let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
if (room) {
	await sendMess(room.a, `_*Partner Ditemukan!!*_`)
	room.b = m.sender
	room.state = 'CHATTING'
	await sendMess(room.b, `_*Partner Ditemukan!!*_`)
} else {
	let id = + new Date
	this.anonymous[id] = {
		id,
		a: m.sender,
		b: '',
		state: 'WAITING',
		check: function (who = '') {
			return [this.a, this.b].includes(who)
		},
		other: function (who = '') {
			return who === this.a ? this.b : who === this.b ? this.a : ''
		},
	}
	await sendMess(m.chat, `_*Menunggu Partner...*_`)
}
break
				}
				case prefix + 'next': case prefix + 'lanjut': {
if (isGroup) return reply('Fitur Tidak Dapat Digunakan Untuk Group!')
this.anonymous = this.anonymous ? this.anonymous : {}
let romeo = Object.values(this.anonymous).find(room => room.check(m.sender))
if (!romeo) {
	await sendText(m.chat, `_*Kamu sedang tidak berada di dalam anonymous chat...*_`, m)
	throw false
}
let other = romeo.other(m.sender)
if (other) await sendText(other, `_*Partner meninggalkan chat...*_`, m)
delete this.anonymous[romeo.id]
let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
if (room) {
	await sendText(room.a, `_*Partner Ditemukan!!*_`, m)
	room.b = m.sender
	room.state = 'CHATTING'
	await sendText(room.b, `_*Partner Ditemukan!!*_`, m)
} else {
	let id = + new Date
	this.anonymous[id] = {
		id,
		a: m.sender,
		b: '',
		state: 'WAITING',
		check: function (who = '') {
			return [this.a, this.b].includes(who)
		},
		other: function (who = '') {
			return who === this.a ? this.b : who === this.b ? this.a : ''
		},
	}
	await sendText(m.chat, `_*Menunggu Partner...*_`, m)
}
break
				}
				
				
// game

case prefix + 'tictactoe': case prefix + 'ttt': case prefix + 'ttc':
	if (!isGroup)return reply('Hanya bisa di grup')
	if (isTicTacToe(from, tictactoe)) return reply(`Masih ada game yg blum selesai`)
	if (args.length < 1) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
	if (xfazd.message.extendedTextMessage === undefined || xfazd.message.extendedTextMessage === null) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
	let mentioned = xfazd.message.extendedTextMessage.contextInfo.mentionedJid
	if (mentioned.length !== 0){
			if (mentioned[0] === sender) return reply(`Sad amat main ama diri sendiri`)
			let h = randomNomor(100)
			mentions(monospace(`@${sender.split('@')[0]} menantang @${mentioned[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/T) untuk bermain`), [sender, mentioned[0]], false)
			tictactoe.push({
				id: from,
				hadiah: h,
				penantang: sender,
				ditantang: mentioned[0],
				TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
			})
	} else {
		reply(`Kirim perintah *${prefix}tictactoe* @tag`)
	}
	break
case prefix + 'delttt':
case prefix + 'delttc':
	if (!isGroup)return reply('Hanya bisa di grup')
	if (!isTicTacToe(from, tictactoe)) return reply(`Tidak ada sesi game tictactoe di grup ini`)
	tictactoe.splice(getPosTic(from, tictactoe), 1)
	reply(`Berhasil menghapus sesi tictactoe di grup ini`)
	break
                                    

                    default:
                    if (isGroup && budy != undefined) {} else {
                        console.log(color('[TEXT]', 'red'), 'XFazd-Team', color(sender.split('@')[0]))
                    }
                }
                } catch (e) {
                    console.log(color('[ERROR]', 'red'), e)
                } 
         }
