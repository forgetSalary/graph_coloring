export function Dot(x,y) {
    this.x = x;
    this.y = y;
}

export function clear(canvas,context){
    context.clearRect(0,0, canvas.width, canvas.height);
}

export function canvas_line(context, fromx, fromy, tox, toy, r, color){
    context.beginPath();
    context.moveTo(fromx,fromy);
    context.lineTo(tox,toy);
    context.strokeStyle = color;
    context.lineWidth = r;
    context.stroke();
}

export function canvas_arrow(context, fromx, fromy, tox, toy, r, color){
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);

    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));

    context.strokeStyle = color;
    context.lineWidth = r;
    context.stroke();
}