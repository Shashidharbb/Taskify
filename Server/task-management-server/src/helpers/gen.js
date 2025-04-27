const crypto = require('crypto');
const key = crypto.randomBytes(32).toString('hex');
console.log(key);
//this is the key to be used in the .env file as JWT_SECRET
//node helpers/gen.js