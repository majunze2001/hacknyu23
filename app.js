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

    socket.emit('init', { chartData: data.getChartData(), initIndex: data.dINDEX + 1 });

    socket.on('choice', ({ choice, change }) => {
        console.log(choice);
        data.addCarbon(change);
        socket.broadcast.emit('carbon', {
            newData: data.getLastCarbon(),
            carbonFactor: carbonFactor(data.getGlobalCarbon())
        });
    })

    socket.on('disconnect', () => {
        if (!io.sockets.sockets.size) {
            data.reset();
        }
    })


});

const carbonFactor = (carbon) => {
    if (carbon <= 350) {
        return 1.5;
    } else if (carbon <= 450) {
        return 1;
    } else {
        return 0.5;
    }
}

setInterval(function () {
    if (!io.sockets.sockets.size) {
        return;
    }
    data.addCarbon(-0.05);
    io.emit('carbon', {
        newData: data.getLastCarbon(),
        carbonFactor: carbonFactor(data.getGlobalCarbon())
    })
    if (data.getGlobalCarbon()>=600){
        data.reset();
    }
}, 3000);
