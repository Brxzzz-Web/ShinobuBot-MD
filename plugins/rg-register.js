//código creado x The Carlos 👑
//no olvides dejar créditos 
let handler = async (m, { conn, text, usedPrefix, command }) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  const user = global.db.data.users[m.sender]

  if (user.registered === true) {
    return conn.sendMessage(m.chat, { text: `⚠️ Ya estás registrado.\n\nUsa *${usedPrefix}perfil* para ver tus datos.` }, { quoted: m })
  }

  const regex = /^([a-zA-ZÀ-ÿñÑ\s]+)\.(\d{1,2})$/i
  if (!regex.test(text)) {
    return conn.sendMessage(m.chat, {
      text: `⚠️ Formato incorrecto. Usa:\n*${usedPrefix + command} Nombre.Edad*\n\nEjemplo:\n*${usedPrefix + command} Shinobu.21*`
    }, { quoted: m })
  }

  let [_, name, age] = text.match(regex)
  age = parseInt(age)

  if (age < 5 || age > 100) {
    return conn.sendMessage(m.chat, { text: `⚠️ Edad no válida. Debe estar entre 5 y 100 años.` }, { quoted: m })
  }

  // Datos aleatorios
  const generos = ['Masculino', 'Femenino']
  const paises = ['Bot', 'Bot', 'Bot', 'Bot']
  const afinidades = ['Exitoso', 'Exitoso', 'Exitoso', 'Exitoso', 'Exitoso', 'Exitoso', 'Exitoso']
  const gender = generos[Math.floor(Math.random() * generos.length)]
  const country = paises[Math.floor(Math.random() * paises.length)]
  const afinidad = afinidades[Math.floor(Math.random() * afinidades.length)]
  const nivelMagico = Math.floor(Math.random() * 10) + 1
  const grimorioColor = gender === 'Masculino' ? '❀ Hombre/Mujer' : '❀ Mujer/Hombre'

  // Guardar datos
  user.name = name.trim()
  user.age = age
  user.gender = gender
  user.country = country
  user.registered = true
  user.regTime = +new Date()
  user.afinidad = afinidad
  user.nivelMagico = nivelMagico

  // ANIMACIÓN 
  const frases = [
    `❀ *Verificando Registro*`,
    `❀ *en proceso*`,
    `❀ *Registró Éxitoso*`,
    `❀ *Registro completado, ${name.toUpperCase()} Soy Shinobu ${country}.*\n\n${grimorioColor}\n❐ Registro: ${afinidad}\n❖ Nivel: ${nivelMagico}`
  ]

  const { key } = await conn.sendMessage(m.chat, { text: '❀ Cargando registro' }, { quoted: m })
  for (let i = 0; i < frases.length; i++) {
    await delay(1500)
    await conn.sendMessage(m.chat, { text: frases[i], edit: key })
  }
}

handler.command = ['registrarme', 'registrar', 'reg']
export default handler