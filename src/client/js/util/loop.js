let updates = [];
let draws = [];

export function loop(target) {
    let lastTime;
    let requiredElapsed = 1000 / target;

    requestAnimationFrame(inner)

    function inner(now) {
        requestAnimationFrame(inner);

        if (!lastTime) {
            lastTime = now;
        }

        const elapsed = now - lastTime;

        if (elapsed > requiredElapsed) {
            update();
            draw();

            lastTime = now;
        }
    }
}

export function onUpdate(fn) {
    if (!updates.find(update => update === fn)) {
        updates.push(fn);
    }
}

export function offUpdate(fn) {
    updates = updates.filter(update => update !== fn)
}

export function onDraw(fn) {
    if (!draws.find(draw => draw === fn)) {
        draws.push(fn);
    }
}

export function offDraw(fn) {
    draws = draws.filter(draw => draw !== fn)
}

function update() {
    updates.forEach(update => update());
}

function draw() {
    draws.forEach(draw => draw());
}
