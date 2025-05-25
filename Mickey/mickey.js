let time = 0;

function epicycles(x, y, fourier) {
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
    if(i!=0)
    ellipse(prevx, prevy, radius*2);
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
  for( let i = 0; i < data.length; i++ )
      objectSketch(pathData[i]);

}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  getFourierArray();
  for(let i = 0; i < data.length; i++){
    pathData[i] = [];
  }
}
function draw() {
  background(0);

  getVertex();  //run epic(depend time) get vertex -> path -> sketching

  stroke(206, 185, 164); //path color
  strokeWeight(1);
  drawingContext.shadowBlur = 0;

  sketching();

  const dt = TWO_PI/fourierData[0].length;
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

