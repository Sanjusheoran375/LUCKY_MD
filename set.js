const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'ANDBAD-BOT;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0ZTOHN5bTZuUGNOZjBsS3ZtWXNPcXJZNy8zSzdlM3pMVndKc1FhcDZuQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTksyV0N1TndCZlpPbW5PZnNyTlM4ZmtRLzRjNy91clo2ZW4zcFc2ZThIdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQjV0NkRoNVFpTVhwNFdZM0lMckVLKy9McGVsalp1TXBldkl6RE4zQkdVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFcGU5Sm9ZV1pRbTg4Tno1V1U3Mno0aE0xOHFJMDlzdkVzRXRnWkhQdlNJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlBb29ESzRaWFVwRG9uMndsdUJpNnR1TEF1Z1pJSHhoS29TNGk2UEl1VTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBEZEw4bFdsalhnSFVMcndFWTJOajB3UVZtbzhxZXp1eUJtWlRyd3lxeHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUpVZzFKVTg3eFpFbDhrVG9JSlVVVUFVRUgveFJQN3BXSncxQ08xZklFMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSit6N1o1cXNxSWFyelA0cXVJcldwTFJZWFMwcW9yN2VyZVFja0lWS0ZYST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhTdjI0d0duejBFSlljTFpjeVBEOUs2Y0J3MU5WazFmd3ozaGgyVFlxZzdxQlN4VHJoWXJkUTBSZkJXeERJK3g1bE1sdlZwNlhWOEVMS29nTnJkZkNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA2LCJhZHZTZWNyZXRLZXkiOiJ4U0lodkhkV2pRMEdzZUs5RHJjNTFCNHJLWEsrVlpEUGJIUGw2Y3Vwdjd3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxOTcyODcxNDA2MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3NDE5N0RFMTc4NkZFREZDRENBNDZFM0RCRjFBNUJBRCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI4NzQ0NzE3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiItcEFWU1Q1NVRtMmpMZk9DNmdSSFF3IiwicGhvbmVJZCI6IjkwMzQxYjg3LWM4NGQtNDMwYi04YTMyLTAyZjkwNjVjZmI1ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Nlp1a2IvV1lNdzR1a3BLMW10NzNVc1NrY2c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWGtJZExsNFpMZEdCMi9kbHdYbmdVOHhsNUZnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFLRVBHNFlKIiwibWUiOnsiaWQiOiI5MTk3Mjg3MTQwNjA6MjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiVSBSIE1FTlRBTCBCVVQgSSBMSUtFIFUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xxenFlb0dFUDZacXJnR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImpWRFdPSWZxVkkrNnRSQjd3Rjg4Z29iOXB4a2xuanlTaUJra1BRaDRGeWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlhINjN1U2FIWkxMcWlha0hYYmJhN2wzVjFwMXh0eXU3UzhaRGV0SGw1RjFQV1dKMnVDeEd2L1c3bU1ZZDVDcGhHVG1yblNIcGtIM2p0VEUwYWFFU0JRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSSHJ2ZlR1MXFmYWZTRHBUdlVBRHlBK1hIcU5SVU91WFF6NCsxaXJxSW1SYTN3cXBFSVYvdFZJb3UwQXFQWUJ6RVdUYml6RzRjS2Nic3lIZUdjeVhBZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxOTcyODcxNDA2MDoyOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZMVExamlINmxTUHVyVVFlOEJmUElLRy9hY1pKWjQ4a29nWkpEMEllQmNwIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4NzQ0NzE1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURqQSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "SANJU",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "97698181121,255764182801,255752593977",              
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
