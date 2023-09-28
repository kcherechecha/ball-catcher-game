let catcher;
let balls = [];
let score = 0;

class Catcher {
  constructor() {
    this.width = 100;
    this.height = 10;
    this.x = width / 2 - this.width / 2;
    this.y = height - 30;
    this.xdir = 0;
  }

  display() {
    fill(0);
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.xdir * 5;
    this.x = constrain(this.x, 0, width - this.width);
  }

  setDir(dir) {
    this.xdir = dir;
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.radius * 2);
  }

  move() {
    this.y += 5;
  }

  intersects(catcher) {
    let ballTop = this.y - this.radius;
    let ballBottom = this.y + this.radius;
    let ballLeft = this.x - this.radius;
    let ballRight = this.x + this.radius;

    let catcherTop = catcher.y;
    let catcherBottom = catcher.y + catcher.height;
    let catcherLeft = catcher.x;
    let catcherRight = catcher.x + catcher.width;

    return (
      ballBottom >= catcherTop &&
      ballTop <= catcherBottom &&
      ballRight >= catcherLeft &&
      ballLeft <= catcherRight
    );
  }
}

function draw() {
  background(220);
  catcher.display();
  catcher.move();

  for (let i = balls.length - 1; i >= 0; i--) {
    balls[i].display();
    if (balls[i]) {
      balls[i].move();
      if (balls[i].intersects(catcher)) {
        balls.splice(i, 1);
        score++;
      }
      if (balls[i] && balls[i].y > height) {
        balls.splice(i, 1);
      }
    }
  }
  textSize(24);
  text(`Рахунок: ${score}`, 10, 30);
}

function generateBall() {
  let x = random(width);
  let y = 0;
  let ball = new Ball(x, y);
  balls.push(ball);
}

function setup() {
  createCanvas(400, 400);
  catcher = new Catcher();
  setInterval(generateBall, 1000);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    catcher.setDir(-1);
  } else if (keyCode === RIGHT_ARROW) {
    catcher.setDir(1);
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    catcher.setDir(0);
  }
}
