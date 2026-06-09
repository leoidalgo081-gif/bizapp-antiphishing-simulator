const fs = require('fs');
let data = fs.readFileSync('server.js', 'utf8');
data = data.replace(/ style="cursor:pointer; border-bottom: 1px dotted red;"/g, '');
fs.writeFileSync('server.js', data);
