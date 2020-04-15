////new p5( (sketch) => {

////  let x = 100;
////  let y = 100;

////  sketch.setup = () => {
////    sketch.createCanvas(200, 200);
////  };

////  sketch.draw = () => {
////    sketch.background(0);
////    sketch.fill(255);
////    sketch.rect(x,y,50,50);
////  };
////}, document.getElementById('p5sketch'));

////let myp5 = new p5(s);


////var bgcolor;
////var button;
////var slider;
////var input;
////var nameP;

////function setup() {
////  canvas = createCanvas(200, 200);
////  bgcolor = color(200);
////  nameP = createP('Your name!');
////  button = createButton('go');
////  button.mousePressed(changeColor);

////  slider = createSlider(10, 100, 86);
////  input = createInput('type your name');
////}

////function changeColor() {
////  bgcolor = color(random(255));
////}

////function draw() {
////  background(bgcolor);
////  fill(255, 0, 175);
////  ellipse(100, 100, slider.value(), slider.value());
////  nameP.html(input.value());
////  text(input.value(), 10, 20);
////}


//var paragraphs;
//var paragraph;

//function setup() {
//  createCanvas(100, 100);
//  background(0);
//  // createP("This is a random number " + random(100));

//  paragraph = select('#unicorn');

//  for (var i = 0; i < 100; i++) {
//    var par = createP('rainbow');
//    par.position(random(500), random(500));
//  }
  
  
  
  
  
//  paragraphs = selectAll('p');
//  // paragraphs = selectAll('.rainbow');

//  for (i in paragraphs) {
//    paragraphs[i].mouseOver(highlight);
//    paragraphs[i].mouseOut(unhighlight);
//  }

//  // paragraph = select('#unicorn');
//  // paragraph.mouseOver(highlight);
//  // paragraph.mouseOut(unhighlight);
//}

//function highlight() {
//  this.style('padding', '16pt');
//  this.style('background-color', '#F0F');
//}

//function unhighlight() {
//  this.style('padding', '0pt');
//  this.style('background-color', '#FFF');
//}

//function setup() {
//  drawingContext.shadowOffsetX = 5;
//  drawingContext.shadowOffsetY = -5;
//  drawingContext.shadowBlur = 10;
//  drawingContext.shadowColor = "black";
//  background(200);
//  ellipse(width/2, height/2, 50, 50);
//}


function setup() {
  background(200);
}
function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
