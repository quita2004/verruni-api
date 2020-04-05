const bCrypt = require('bcryptjs');

console.log(bCrypt.hashSync("password", bCrypt.genSaltSync(10)));

