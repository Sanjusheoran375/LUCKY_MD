const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'ANDBAD-BOT;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUQ3ZnVEODBjY0RFVytXRzhTdWowV3Q4b0Z2TGlWYTQyUzJLdjBFVlRHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVNJelBWMTNBL2diSzQwRjh1NC84RXNTc1pFdFRwRk0vOWFBK1BpbjNIOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5QytnZENpOW0wK2JNZkFiRzl1MHp0aHQrTVV4MVNWWnhlTitCRENJOFhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxOU0rbnpUekw5dGRrVUJHdGduN2RIZWFEUDdVNkZqNmtPK3lmTWswazBnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklONDJnWTZpWW9wZDA5RGhDNnlnSVI3MkRhM0NOQUJIVzZhZG53STAxbWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlYxaG1rbEJtQ3VhcHpkQWFvbDVHcUdRQXEzRUpBV2ZmcDMzZFZQcmFtRWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUtIcU12U2JmMEk4NG9mZSszd1RrcDl1dy9Hak0xMGZxL2ZxcVJoOS9XND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmw1anlQYUhMT2J4VnJqSGxyU0EzZFVIQXVZRnVXa25pd2dQaVBGQ1VTYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Img1dlhCWFlWTWVUcE9BS0g4amZvKzAwTndPRHFidWNZZWJEQldQOGxZTzROaWZuS2JzNGhtWHJHTUkzaU1aRko1UnVEY3ovVC9rVE1CUGZ2eEZ5S2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcxLCJhZHZTZWNyZXRLZXkiOiJjeEpCSktZTUJWZnhVakhWK21Zck5kYlNscWw1TVRNNVFuc0VVQ2hXNStZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJucVdzWmpqNlNkbVNweUlqRFAyYTF3IiwicGhvbmVJZCI6ImFhOTc3N2QyLTljZjUtNDNkMS05YmM1LTdkOTIyZGYwN2M4NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEa0IzTmJBeGdXQ0xGMGFRc1NNbFBPN1VrZ1E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK3FaQzZaY3pQa2pLVlJYcXhUaGprdHV1bjNZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjE1UldDNUxCIiwibWUiOnsiaWQiOiI5MTk3Mjg4OTMxODc6OUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTzdHeS9VRkVPdkd2N2dHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYVJzQU1uanhaQVJkMXVYcHFiYU9tWjBWSEc0RGxuWU9Bak5vK096cG9Waz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTkozRStJZGRFVW8xUHEvTUZYNVVNMjQ3MDNyd1hQZUp5Yk9IbVFwTzhvUEgrYmxERk9uU1JQTDdIa3c2RUNHbEcwbk16NllKTS9xdjNOb2RNMTFzQVE9PSIsImRldmljZVNpZ25hdHVyZSI6Ijk4VTNQdTljTmpteVJ4N0xCaWUrbkw2S2hGZGFCVHNIKyt3bkFDdkNnM0pGZGdaalhmV0tydHBRNDVHU3VJVVVMaTlDb0ZVMVJqdUR5Vm56MmI0S2hRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE5NzI4ODkzMTg3OjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV2tiQURKNDhXUUVYZGJsNmFtMmpwbWRGUnh1QTVaMkRnSXphUGpzNmFGWiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTA5NDUyMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJb2QifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "SANJU",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "919728893187",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'SANJU MD ',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/926c7a8ad7ff624c144b7.jpg,https://telegra.ph/file/187cfa2365d88ffe98fec.jpg,',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
