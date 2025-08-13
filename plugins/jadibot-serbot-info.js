// código creado x The Carlos 👑
async function handler(m, { conn: stars, usedPrefix }) {
  const maxSubBots = 500

  const conns = Array.isArray(global.conns) ? global.conns : []

  const getNumFromJid = (jidLike) => {
    const raw = String(jidLike || '')
    return raw.replace(/\D/g, '')
  }

  const isConnOpen = (c) => {
    try {
      if (c?.ws?.socket?.readyState === 1) return true
    } catch {}
    return !!c?.user?.id
  }

  const unique = new Map()
  for (const c of conns) {
    if (!c || !c.user) continue
    if (!isConnOpen(c)) continue
    const jidRaw = c.user.id || c.user.jid || ''
    const num = getNumFromJid(jidRaw)
    if (!num) continue
    unique.set(num, c)
  }

  const users = [...unique.values()]
  const totalUsers = users.length
  const availableSlots = Math.max(0, maxSubBots - totalUsers)

  const packname = global.packname || '🤖 𝙱𝙾𝚃'
  const title = `⭑『 𝗦𝗨𝗕𝗕𝗢𝗧𝗦 𝗖𝗢𝗡𝗘𝗖𝗧𝗔𝗗𝗢𝗦 』⭑`
  const barra = '━━━━━━━━━━━━━━━━'

  let responseMessage = ''

  if (totalUsers === 0) {
    responseMessage = `╭═⬣ ${title}
┃ 🔢 Total conectados: *0*
┃ 🟢 Espacios disponibles: *${availableSlots}*
╰═${barra}⬣

No hay subbots conectados por ahora.`
  } else if (totalUsers <= 15) {
    const listado = users.map((v, i) => {
      const jidRaw = v?.user?.id || v?.user?.jid || ''
      const num = getNumFromJid(jidRaw)
      const nombre = v?.user?.name || v?.user?.pushName || '👤 𝚂𝚄𝙱-𝙱𝙾𝚃'
      return `╭╼⟪ ${packname} ⟫╾╮
┃ #${i + 1} 👾 @${num}
┃ 🌐 Link: wa.me/${num}
┃ 🧠 Nombre: ${nombre}
╰╼▣`
    }).join('\n\n')

    responseMessage = `╭═⬣ ${title}
┃ 🔢 Total conectados: *${totalUsers}*
┃ 🟢 Espacios disponibles: *${availableSlots}*
╰═${barra}⬣

${listado}`.trim()
  } else {
    responseMessage = `╭═⬣ ${title}
┃ 🔢 Total conectados: *${totalUsers}*
┃ 🟢 Espacios disponibles: *${availableSlots}*
╰═${barra}⬣

⚠️ Hay muchos subbots conectados, no se muestra la lista detallada.`
  }

  responseMessage += `

—
Creador The Carlos 👑`

  const imageUrl = 'https://files.catbox.moe/1jkle5.jpg' // Cambia si quieres

  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      contactMessage: {
        displayName: "Subbot",
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;Subbot;;;\nFN:Subbot\nEND:VCARD"
      }
    }
  }

  // Fallback si parseMention no existe
  const mentions = typeof stars.parseMention === 'function'
    ? stars.parseMention(responseMessage)
    : [...new Set((responseMessage.match(/@(\d{5,16})/g) || [])
        .map(v => v.replace('@', '') + '@s.whatsapp.net'))]

  try {
    await stars.sendMessage(
      m.chat,
      { image: { url: imageUrl }, caption: responseMessage, mentions },
      { quoted: fkontak }
    )
  } catch (e) {
    console.error('❌ Error enviando listado de subbots:', e)
    // Mensaje de texto simple como respaldo
    await stars.sendMessage(
      m.chat,
      { text: responseMessage, mentions },
      { quoted: fkontak }
    )
  }
}

handler.command = ['listjadibot', 'bots']
handler.help = ['bots']
handler.tags = ['jadibot']
export default handler