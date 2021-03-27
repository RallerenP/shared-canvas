import { pointer, addPointer, removePointer, overlay } from "./util/overlay.js";
import { onUpdate } from "./util/loop.js";
import { circle, line } from './util/canvas.js';

import Mouse from './util/mouse.js'
let socket;
const players = {};

export function connect() {
    socket = io(`${window.location.href}`);

    socket.on('CLIENT_CONNECT', id => {
        players[id] = pointer(0, 0);
        addPointer(players[id]);
    })

    socket.on('CLIENT_MOVE', (id, pos) => {
        players[id].x = pos.x;
        players[id].y = pos.y;
    })

    socket.on('CLIENT_DISCONNECT', id => {
        removePointer(players[id]);
        delete players[id];
    })

    socket.on('DRAW', (last, pos, col) => {
        circle(last, 5, col);
        line(last, pos, 10, col);
        circle(pos, 5, col);
    })

    let drawing = false;
    let last = 0;

    onUpdate(() => {
        const rect = overlay.getBoundingClientRect();
        const pos = { x: Mouse.pos.x - rect.left, y: Mouse.pos.y - rect.top };

        socket.emit('MOUSE_MOVE', pos);

        if (Mouse.isDown) {
            socket.emit('DRAW', drawing ? last : pos, pos, settings.col);
            drawing = true;
        } else {
            drawing = false;
        }

        last = pos;
    })
}
