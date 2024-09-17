const canvas = document.getElementById("downloadCanvas");
let canvasStats = canvas.getBoundingClientRect();
canvas.width = canvasStats.width;
canvas.height = canvasStats.height;

let ctx = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined,
}


class gradientCircle{
    constructor(x, y, r1, r2, colors){
        this.x = x;
        this.y = y;
        this.r1 = r1;
        this.r2 = r2;
        this.colors = colors;
    }

    draw(ctx){

        const gradient = ctx.createRadialGradient(
            this.x,
            this.y,
            this.r1,
            this.x,
            this.y,
            this.r2
        );

        for(let i = 0; i < this.colors.length; i++)
            gradient.addColorStop(i / this.colors.length, this.colors[i]);

        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,canvas.width,canvas.height);

    }

    setCoordinates(newX, newY){
        this.x = newX;
        this.y = newY;
    }
}

let circle = new gradientCircle(mouse.x, mouse.y, 1, 300, ["rgba(255,255,255,0.35)", "rgba(255,255,255,0.1)", "transparent"]);

const downloadButton = document.getElementById("downloadBtn");

downloadButton.addEventListener("mousemove", (e) => {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    canvasStats = canvas.getBoundingClientRect();
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    circle.setCoordinates(mouse.x - canvasStats.x, mouse.y - canvasStats.y );

    circle.draw(ctx);

})
