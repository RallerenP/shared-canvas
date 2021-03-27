import { Pointer } from "../objects/pointer.js";
import { onDraw } from "./loop.js";

export const overlay = document.getElementById('overlay-layer');
const o_ctx = overlay.getContext('2d');

let pointers = [];

export function pointer(x, y) {
    return new Pointer(x, y, o_ctx)
}

export function addPointer(pointer) {
    if (!pointers.find(_pointer => pointer === _pointer)) {
        pointers.push(pointer)
    }
}

export function removePointer(pointer) {
    pointers = pointers.filter(_pointer => pointer !== _pointer)
}

onDraw(draw)

function clear() {
    o_ctx.clearRect(0, 0, o_ctx.canvas.width, o_ctx.canvas.height);
}

function draw() {
    clear();
    pointers.forEach(pointer => pointer.draw())
}
