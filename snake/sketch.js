var score = 0;
var snake;

class Food {
  constructor(_pos, _size) {
    this.pos = _pos;
    this.size = _size;
  }

  show() {
    fill(255,0,0,100);
    stroke(255,0,0)
    circle(this.pos.x, this.pos.y, this.size);
  }

  spawn() {
    this.pos = createVector(random(width), random(height));
    this.size = random(1,50);
  }

  death() {
    this.spawn();
  }
}


class Snake {
  constructor(_pos, _vel, _acc, _size, _thic, _grow) {
    this.pos = _pos;
    this.vel = _vel;
    this.acc = _acc;
    this.size = _size;
    this.trail = [];
    this.thic = _thic;
    this.grow = _grow;
  }
  snakeFunctions(){
    this.move();
    this.show();
    this.direction();
    this.collision();
    this.consume();
    this.wallCollision();
    this.deathCollision();
    this.death();
  }

  show() {
    fill(255, 255, 255);
    noStroke();
    for (let i = 0; i < this.trail.length; i++) {
      circle(this.trail[i].x, this.trail[i].y, this.thic);
    }
    // print(this.trail);
  }

  move() {
    // print("before moving pos = "+ this.trail);
    this.trail.push(this.pos.copy());
    this.pos.add(this.vel);
    // print("after moving pos = "+ this.trail);
    if (this.trail.length > this.size) {
      this.trail.shift();
    }
  }

  direction() {
    print(key);
    if (key == 'i' && this.vel.y == 0) {
      this.vel = createVector(0, -this.vel.mag());
    }
    if (key == 'j' && this.vel.x == 0) {
      this.vel = createVector(-this.vel.mag(), 0);
    }
    if (key == 'k' && this.vel.y == 0) {
      this.vel = createVector(0, this.vel.mag());
    }
    if (key == 'l' && this.vel.x == 0) {
      this.vel = createVector(this.vel.mag(), 0);
    }
  }

  collision() {
    if (this.pos.copy().sub(food.pos.copy()).mag() < this.thic / 2 + food.size / 2) {
      return true;
    } else {
      return false;
    }
  }
  consume() {
    if (this.collision()) {
      let g = map(food.size, 1,50,this.grow,1);
      this.size += g;
      food.death();
      score++;
      this.vel.mult(1.1);
    }
  }

  wallCollision() {
    if (this.pos.x > width) { this.pos.x = this.pos.x - width; }
    if (this.pos.x < 0) { this.pos.x = width - this.pos.x; }
    if (this.pos.y > height) { this.pos.y = this.pos.y - height; }
    if (this.pos.y < 0) { this.pos.y = height - this.pos.y; }
  }

  deathCollision() {
    for (let i = 0; i < this.trail.length - 10; i++) {
      let d = this.pos.copy().sub(this.trail[i].copy()).mag();
      if (d < this.thic) {
        return true;
      } else {
        return false;
      }
    }
  }

  death() {
    if (this.deathCollision()) {
      let p = createVector(width / 2, height / 2);
      let v = createVector(1, 0);
      let a = createVector(0, 0);
      let s = 10;
      this.trail = [];
      food.death();
      this.pos = p;
      this.vel = v;
      this.acc = a;
      this.size = s;
      score = 0;
    }
  }
}

function setup() {
  createCanvas(450, 450);
  let p = createVector(width / 2, height / 2);
  let v = createVector(1, 0);
  let a = createVector(0, 0);
  let s = 10;
  snake = new Snake(p, v, a, s, 10, 30);
  let foodp = createVector(random(width), random(height));
  let foods = 10;
  food = new Food(foodp, foods);
  // frameRate(1);
}
function draw() {
  background(0);
  fill(255, 100);
  textSize(32);
  text(score, width / 2, height / 4);
  snake.snakeFunctions();
  // snake.move();
  // snake.show();
  // snake.collision();
  // snake.consume();
  // snake.wallCollision();
  // snake.deathCollision();
  // snake.death();
  food.show();
}

function keyPressed() {
  // print("key is pressed");
  snake.direction();
}