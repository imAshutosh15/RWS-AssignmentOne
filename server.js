//----------import dependencies start -------------------------------------------
const http = require('http');
const app = require('./backend/app');
require('dotenv').config();
process.env.TZ = 'Asia/Calcutta'
const port = process.env.PORT || 3080 ;
//----------import dependencies end ---------------------------------------------
const server = http.createServer(app);
server.listen(port);