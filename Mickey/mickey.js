let time = 0;

function epicycles(x, y, fourier, state) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let frequency = fourier[i].frequency;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos( frequency * time + phase );
    y += radius * sin( frequency * time + phase );
    
    stroke(218, 177, 218, 150);  //cycle color
    noFill();
    if(state!=0 && i!=0)
    ellipse(prevx, prevy, radius * 2);
    stroke(129, 162, 177);    //vector color
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

function objectSketch(path){
  beginShape();
  for (let i = 0; i < path.length-1; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();
}

function sketching(){
  objectSketch(path1);
  objectSketch(path2);
  objectSketch(path3);
  objectSketch(path4);
  objectSketch(path5);
  objectSketch(path6);
  objectSketch(path7);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  getFourierArray();
}

function draw() {
  background(0);

  getVertex();

  stroke(206, 185, 164); //path color
  strokeWeight(1);
  drawingContext.shadowBlur = 0;
  sketching();

  const dt = TWO_PI/fourierX.length;
  time = time + dt;

  if (time > TWO_PI) {
    background(0);
    stroke(206, 185, 164); //path color
    strokeWeight(1);
    sketching();

    let intervalId, started = false;
    let smooth = 1, blur_smooth = 0;
    let count =0, maxRuns = 4;
    if (!started) {
    started = true;

    intervalId = setInterval(() => {
    
    strokeWeight(smooth);
    drawingContext.shadowColor = "rgb(206, 185, 164, 1";
    drawingContext.shadowBlur = blur_smooth;
    sketching();
    
    blur_smooth = blur_smooth+20;
    smooth = smooth+0.5;
    count++;

    if (count >= maxRuns) {
      console.log(blur_smooth);
      clearInterval(intervalId);
    }
    }, 1000/20); 
  }
    noLoop();
  }
}

