const default_pointer = new Image();
default_pointer.src = '/assets/default_pointer.png'

export class Pointer {
    constructor(x, y, ctx) {
        this.cursor = default_pointer;
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    }

    draw() {
        const { ctx, cursor, x, y } = this;

        ctx.save()
        ctx.drawImage(cursor, x, y)
        ctx.restore();
    }
}
