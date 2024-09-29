const canvas = document.getElementById("downloadCanvas");
let canvasStats = canvas.getBoundingClientRect();
canvas.width = canvasStats.width;
canvas.height = canvasStats.height;

let ctx = canvas.getContext('2d');

let mouse = {
    x: 0,
    y: 0,
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
        console.log(this.x + " circle x");
        console.log(mouse.x+" mouse x");
        const angle = Math.atan2(this.y - newY, this.x - newX);
        const distance = Math.sqrt(Math.pow(this.x - newX, 2) + Math.pow(this.y - newY, 2));
        this.x -= Math.cos(angle) * (distance / 25);
        this.y -= Math.sin(angle) * (distance / 25);
    }

    updateRadius(mouseX, mouseY){
        this.r2 = 150-Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2))*2;
    }
}



let circle = new gradientCircle(mouse.x, mouse.y, 1, 300, ["rgba(255,255,255,0.35)", "rgba(255,255,255,0.1)", "transparent"]);

const downloadButton = document.getElementById("downloadBtn");

circle.setCoordinates(0, 0);

downloadButton.addEventListener("mousemove", (e) => {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    canvasStats = canvas.getBoundingClientRect();
    mouse.x = e.clientX- canvasStats.x;
    mouse.y = e.clientY- canvasStats.y;
    for(let i = 0; i < 10; i++){
        setTimeout(animate, i * 200);
    }


    console.log(circle.r2);
    circle.draw(ctx);

});

function animate(){
    circle.setCoordinates(mouse.x , mouse.y);
    circle.updateRadius(mouse.x, mouse.y);
}

downloadButton.addEventListener("mouseleave", (e) => {
    setTimeout(function(){
        circle.r2 = 0;
    }, 1000);
});