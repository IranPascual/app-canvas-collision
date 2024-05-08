const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "Black";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillStyle = "White";
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.draw(context);

        if ((this.posX + this.radius) > window_width) {
            this.dx = -this.dx;
        }

        if ((this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY - this.radius) < 0) {
            this.dy = -this.dy;
        }

        if ((this.posY + this.radius) > window_height) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }

}
function getDistance(posx1, posy1, posx2, posy2) {
    let result = Math.sqrt(Math.pow(posx2 - posx1, 2) + Math.pow(posy2 - posy1, 2));
    return result;
}

let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomRadius = Math.floor(Math.random() * 100 + 30);

/* let miCirculo = new Circle(100, 100, 50, "blue", "1", 1);
let miCirculo2 = new Circle(250, 150, 80, "blue", "2", 1);


console.log(getDistance(miCirculo.posX, miCirculo.posY, miCirculo2.posX, miCirculo2.posY));

miCirculo.draw(ctx);
miCirculo2.draw(ctx); */

let arrayCircle = [];
let NumeroCirculos = 10;

for (let i = 0; i < NumeroCirculos; i++) {

    let randomX = Math.random() * (window_width - 200) + 100;
    let randomY = Math.random() * (window_height - 200) + 100;
    let randomRadius = Math.floor(Math.random() * 100 + 25);
    let randomSpeed = Math.floor(Math.random() * 10) + 1;

    let miCirculo = new Circle(randomX, randomY, randomRadius, 'Blue', i + 1, randomSpeed);

    arrayCircle.push(miCirculo);
}

/* let updateCircle = function () {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);
    miCirculo.update(ctx);
    miCirculo2.update(ctx);

    if (getDistance(miCirculo.posX, miCirculo.posY, miCirculo2.posX, miCirculo2.posY) < (miCirculo.radius + miCirculo2.radius)) {
        miCirculo.color = "red";
        console.log("Colision")
    }
    else {
        miCirculo.color = "blue";
    }
}; */

function detectarColision(circulo1, circulo2) {
    let distancia = getDistance(circulo1.posX, circulo1.posY, circulo2.posX, circulo2.posY);
    return distancia < (circulo1.radius + circulo2.radius);
}

function updateCircle() {
    ctx.clearRect(0, 0, window_width, window_height);

    arrayCircle.forEach(circle => {
        circle.color = "white";
    });

    for (let i = 0; i < arrayCircle.length; i++) {
        let circle = arrayCircle[i];
        for (let j = i + 1; j < arrayCircle.length; j++) {
            let otherCircle = arrayCircle[j];
            if (detectarColision(circle, otherCircle)) {
                circle.color = "red";
                otherCircle.color = "red";
                
                let angle = Math.atan2(otherCircle.posY - circle.posY, otherCircle.posX - circle.posX);
                
                let overlap = circle.radius + otherCircle.radius - getDistance(circle.posX, circle.posY, otherCircle.posX, otherCircle.posY);
                
                circle.posX -= overlap * Math.cos(angle) / 2;
                circle.posY -= overlap * Math.sin(angle) / 2;
                otherCircle.posX += overlap * Math.cos(angle) / 2;
                otherCircle.posY += overlap * Math.sin(angle) / 2;
                
                let normalX = Math.cos(angle);
                let normalY = Math.sin(angle);
                let tangentX = -normalY;
                let tangentY = normalX;
                
                let circleSpeedNormal = circle.dx * normalX + circle.dy * normalY;
                let circleSpeedTangent = circle.dx * tangentX + circle.dy * tangentY;
                let otherCircleSpeedNormal = otherCircle.dx * normalX + otherCircle.dy * normalY;
                let otherCircleSpeedTangent = otherCircle.dx * tangentX + otherCircle.dy * tangentY;
                
                let circleSpeedNormalAfter = otherCircleSpeedNormal;
                let otherCircleSpeedNormalAfter = circleSpeedNormal;
                
                circle.dx = circleSpeedNormalAfter * normalX + circleSpeedTangent * tangentX;
                circle.dy = circleSpeedNormalAfter * normalY + circleSpeedTangent * tangentY;
                otherCircle.dx = otherCircleSpeedNormalAfter * normalX + otherCircleSpeedTangent * tangentX;
                otherCircle.dy = otherCircleSpeedNormalAfter * normalY + otherCircleSpeedTangent * tangentY;
            }
        }
    }
    arrayCircle.forEach(circle => {
        circle.update(ctx);
    });

    requestAnimationFrame(updateCircle);
}

updateCircle();








/* function updateCircle() {
    ctx.clearRect(0, 0, window_width, window_height);

    arrayCircle.forEach(circle => {
        circle.update(ctx);
    });
    if (getDistance(miCirculo.posX, miCirculo.posY, miCirculo2.posX, miCirculo2.posY) < (miCirculo.radius + miCirculo2.radius)) {
        miCirculo.color = "red";
        console.log("Colision")
    }
    else {
        miCirculo.color = "blue";
    }

    requestAnimationFrame(updateCircle);
}


updateCircle(); */