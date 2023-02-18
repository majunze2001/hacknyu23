import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import data from './modules/data.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);
server.listen(process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {
    console.log('connected', socket.id);

    socket.emit('init', { chartData: data.chartData, initIndex: 11 });

});

