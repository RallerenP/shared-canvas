class Mouse {
    pos = {x: 0, y: 0}
    isDown = false;

    constructor() {
        window.addEventListener("mousemove", (e) => {
            this.pos = {x: e.clientX, y: e.clientY}
        })

        window.addEventListener("mousedown", (e) => {
            this.isDown = true;
        })

        window.addEventListener("mouseup", (e) => {
            this.isDown = false;
        })
    }

}

export default new Mouse()
