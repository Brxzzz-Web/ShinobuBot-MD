var handler = async (m, { conn, args, text, usedPrefix, command }) => {

let who 
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
let name = await conn.getName(m.sender)        
let user = global.db.data.users[who]
let nom = conn.getName(m.sender)
if (!global.db.data.settings[conn.user.jid].restrict) return conn.reply(m.chat, `❐ *Este comando está deshabilitado por mi creador*`, m) 
if (!text) return m.reply(`❀ Ingrese el número de la persona que quieres añadir a este grupo.\n\n❍ Ejemplo:\n*${usedPrefix + command}* 66666666666`)
if (text.includes('+')) return m.reply(`❖ Ingrese el número todo junto sin el *(+)*`)
if (isNaN(text)) return m.reply(`❀ El número debe ser solo en dígitos`)

let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
let jid = text.replace(/\D/g, '') + '@s.whatsapp.net'

await conn.reply(jid, `*❀ Hola! soy shinobu, una persona te ha invitado a su grupo.*\n\n*Link de invitación:*\n${link}`, m, { mentions: [m.sender] })
let fecha = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
let tiempo = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
await m.reply(`❀ *Enviando la invitación al privado de ${nom}*\n\n*📅 ${fecha}*\n⏰ *${tiempo}*`) 

}
handler.help = ['add']
handler.tags = ['grupo']
handler.command = ['add', 'agregar', 'añadir']
handler.group = true
handler.admin = true
handler.fail = null

export default handler