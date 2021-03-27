import { onDraw } from "./loop.js";

const canvas = document.getElementById('draw-layer');
const ctx = canvas.getContext('2d');

export function circle(pos, size, col) {
    ctx.fillStyle = col
    ctx.fillCircle(pos.x, pos.y, size)
}

export function line(a, b, size, col) {
    ctx.strokeStyle = col
    ctx.line(a.x, a.y, b.x, b.y, size)
}
