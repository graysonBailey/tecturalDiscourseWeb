export class particleSystem {
  constructor(p5, position) {
    this.p5 = p5;
    this.origin = position.copy();
    this.particles = [];
  }
  addParticle() { // add a particle instance onto the system particle array
    this.particles.push(new particle(this.p5, this.origin));
  }
  run() { // make every particle run, and return all the particles on the system that are not dead
    this.particles = this.particles.filter(particle => {
      particle.run();
      return !particle.isDead();
    });
  }
}

export class particle {
  constructor(p5, position) {
    this.p5 = p5;
    this.acceleration = this.p5.createVector(0, 0.05);
    this.velocity = this.p5.createVector(this.p5.random(-1, 1), this.p5.random(-1, 0));
    this.position = position.copy();
    this.lifespan = 255;
  }
  run() {
    this.update();
    this.display();
  }
  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }
  // Method to display
  display() {
    this.p5.stroke(200, this.lifespan);
    this.p5.strokeWeight(2);
    this.p5.fill(127, this.lifespan);
    this.p5.ellipse(this.position.x, this.position.y, 12, 12);
  }
  // Is the particle still useful?
  isDead() {
    return this.lifespan < 0;
  }
}
