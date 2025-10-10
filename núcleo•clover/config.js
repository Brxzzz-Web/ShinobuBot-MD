import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─✞─ CONFIGURACIÓN GLOBAL ─✞─*

// BETA: Número del bot
global.botNumber = ''; // Ejemplo: 525568138672
//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.owner = [
  ['51971285104', '🜲 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 👻', true],
  ['5217971289909'],
  ['5217971282613', '', false], // Espacios opcionales
  ['', '', false],
  ['', '', false]
];
global.mods = ['51971285104'];
global.suittag = ['51971285104'];
global.prems = ['51971285104'];

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.libreria = 'Baileys';
global.baileys = 'V 6.7.9';
global.languaje = 'Español';
global.vs = '2.2.0';
global.vsJB = '5.0';
global.nameqr = 'ShinobuBot-MD';
global.sessions = 'ShinoSession';
global.jadi = 'blackJadiBot';
global.blackJadibts = true;

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.packsticker = `
  sʜɪɴᴏʙᴜ-ᴏғɪᴄɪᴀʟ ᚲ`;

global.packname = 'sʜɪɴᴏʙᴜ-ʙᴏᴛ ᴏғᴄ';

global.author = `
⇝ 📆 ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}
⇝ ⏰ ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}
♾━━━━━━━━━━━━━━━♾`;
//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.wm = 'sʜɪɴᴏʙᴜ-ʙᴏᴛ ᴏғᴄ';
global.titulowm = 'sʜɪɴᴏʙᴜ-ʙᴏᴛ ᴏғᴄ';
global.igfg = '❀⃟𝑺𝒉𝒊𝒏𝒐𝒃𝒖-𝑶𝒇𝒄'
global.botname = '⏤͟͟͞͞sʜɪɴᴏʙᴜ-ʙᴏᴛ ᴏғᴄ⏤͟͟͞͞❀'
global.dev = '© ᴘᴏᴡᴇʀᴇᴅ ʙʏ sʜɪɴᴏʙᴜ ᴏғᴄ ❀'
global.textbot = 'sʜɪɴᴏʙᴜ, ᴍᴀᴅᴇ ᴡʜɪᴛᴇ ʙʏ sʜɪɴᴏʙᴜ-ᴏғᴄ'
global.gt = '𝑺𝒉𝒊𝒏𝒐𝒃𝒖-𝒐𝒇𝒄';
global.namechannel = '=͟͟͞𝗡𝗲𝘇𝘂𝗸𝗼 - 𝗢𝗳𝗶𝗰𝗶𝗮𝗹 𝗖𝗵𝗮𝗻𝗻𝗲𝗹⏤͟͟͞͞★'
// Moneda interna
global.monedas = 'monedas';

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
global.gp1 = 'https://chat.whatsapp.com/KdpLokuBZuKHx0DvNzuAes';
global.gp2 = 'https://chat.whatsapp.com/KdpLokuBZuKHx0DvNzuAes';
global.comunidad1 = 'https://chat.whatsapp.com/KdpLokuBZuKHx0DvNzuAes';
global.channel = 'https://whatsapp.com/channel/0029Vb5l5w1CHDyjovjN8s2V';
global.channel2 = 'https://whatsapp.com/channel/0029Vb5l5w1CHDyjovjN8s2V';
global.cn = global.channel;
global.yt = 'https://www.youtube.com/';
global.md = 'https://github.com/';
global.correo = 'jxxlznexe@gmail.com';

global.catalogo = fs.readFileSync(new URL('../src/catalogo.jpg', import.meta.url));
global.photoSity = [global.catalogo];

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.estilo = { 
  key: {  
    fromMe: false, 
    participant: '0@s.whatsapp.net', 
  }, 
  message: { 
    orderMessage: { 
      itemCount : -999999, 
      status: 1, 
      surface : 1, 
      message: global.packname, 
      orderTitle: 'Bang', 
      thumbnail: global.catalogo, 
      sellerJid: '0@s.whatsapp.net'
    }
  }
};

global.ch = { ch1: "120363401983007420@newsletter" };
global.rcanal = global.ch.ch1;

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*

global.multiplier = 69;
global.maxwarn = 3;

//*─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─✞─ׄ─ׅ─ׄ─*
const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'núcleo•clover/config.js\''));
  import(`${file}?update=${Date.now()}`);
});
