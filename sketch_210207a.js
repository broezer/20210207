const Y_AXIS = 1;
const X_AXIS = 2;
let c1, c2, c3;
let b1, b2, b3;
let l1, l2;

let cols, rows;
let scl = 20;
let w = 800;
let h = 800;

let flying = 0;

let terrain = [];



function setup() {
   createCanvas(400, 400, WEBGL);
   
   
   c1 = color(126, 245, 255);
   c2 = color(13, 232, 250);
   c3 = color(0, 94, 116);
   
   b1 = color(0, 9, 28);
   b2 = color(0, 35, 108);
   b3 = color(157, 189, 255);

   
   l1 = color(237, 252, 255);
   l2 = color(116,228,2255);
   
   cols = w / scl;
   rows = h / scl;

   for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
   
}


function draw() {
  flying -= 0.1;
  var yoff = flying;
  for (let y = 0; y < rows; y++) {
    var xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 20);
      xoff += 4;
    }
    yoff += 2;
  }
  
 
  setGradient(-width*0.5, height * -0.5 , width, height * 0.5, c3, c2, l1, Y_AXIS);
  setGradient(-width*0.5,0, width, height*0.8, l1, c2, c1,Y_AXIS);
  
  push();
  translate( width * 0.2 , height * 0.1);
  rotateZ(PI);
  setTriangle( 0 , 0, width * 0.4, c1, c2,c3);
  scale(0.9);
  translate( width * 0.025 , height * 0.1 )
  setTriangle( 0 , 0, width * 0.4, c1, c2,c3);
  
  scale(1.1);
  setTriangle( width * -0.45 , 0, width * 0.4, c1, c2,c3);
  setTriangle( width * 0.4, 0 , width * 0.4, c1, c2,c3);
  
  scale(0.9);
  translate( 0 , height * 0.1 )
  setTriangle( width * -0.475 , 0, width * 0.4, c1, c2,c3);
  setTriangle( width * 0.475, 0 , width * 0.4, c1, c2,c3);
  

  rotateZ(-PI);
  translate(0, height * 0.1 , -width);
  rotateX(PI / 2);
  noFill();
  stroke(l1);
  translate(-w / 2,  height* 1, width * - 0.1);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    
    for (let x = 0; x < cols; x++) {
      fill(c2);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
 
  
 

  
  save("20210207.png");
  noLoop();
  
  
}

function setGradient(x, y, w, h, c1, c2, c3, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, (y + h) - ((h/2)), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (y + h) - ((h/2)) ,  y + h , 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(x, i, x + w, i);
      
      if ( i <= (y + h) - ((h/2))){
        stroke(c);
        line(x, i, x + w, i);
      }else{
        stroke(p);
        line(x, i, x + w, i);
      }
      
      
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x,(x + w) - (w/2), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (x + w) - (w/2), x + w, 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(i, y, i, y + h);
      if ( i <= (x + w) - (w/2)){
        stroke(c);
        line(i, y, i, y + h);
      }else{
        stroke(p);
        line(i, y, i, y + h);
      }
      
    }
  }
}
function setCircle(x, y, d, c1, c2, c3) {
 let c = 100;
 //circle(x,y,d);
 
 
 for (let i=0; i<c; i++) {
   let col = lerpColor(c1, c2, (i/c)*2 );
   let col02 = lerpColor(c2, c3, ((i - (c/2))/(c/2)));
   let a = lerp(PI, 0, i/c);
   
   if ( i <= c/2){
      fill(col);
      noStroke();
      arc(x, y, d, d, -a, a, CHORD);
    }else{
      fill(col02);
      noStroke();
      arc(x, y, d, d, -a, a, CHORD);
    }   

 }
}

function setTriangle(x, y, h, c1, c2, c3 ){
  d = h;
  push();
  //translate( d * 0.2, d*0.2);
  for (let i = y; i <= y + d; i++) {
    let inter = map(i, y, (y + d) - (d/2), 0, 1);
    let c = lerpColor(c1, c2, inter);
    
    let inter02 = map(i, (y + d) - (d/2) ,  y + d , 0, 1);
    let p = lerpColor(c2, c3, inter02);
    
    //line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i);    
    if ( i <= (y + d) - (d/2)){
      stroke(c);
      
      
      if( i >= ( (y + d) -  (d * 0.6)) && i <= ( (y + d) -  (d * 0.5)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.7)) && i <= ( (y + d) -  (d * 0.62)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.77)) && i <= ( (y + d) -  (d * 0.72)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.82)) && i <= ( (y + d) -  (d * 0.79)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.86)) && i <= ( (y + d) -  (d * 0.84)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.9)) && i <= ( (y + d) -  (d * 0.88)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.92)) && i <= ( (y + d) -  (d * 0.91)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.94)) && i <= ( (y + d) -  (d * 0.93)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.96)) && i <= ( (y + d) -  (d * 0.95)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
        
       if( i >= ( (y + d) -  (d * 0.98)) && i <= ( (y + d) -  (d * 0.97)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
        
       if( i >= ( (y + d) -  (d * 1)) && i <= ( (y + d) -  (d * 0.99)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
      
    }else{
      stroke(p);
      if(i >= ((y + d) - (d * 0.48)) && i <= ((y + d) - (d * 0.25)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i);
      }
      
      if (i >= ((y + d) - (d * 0.25)) && i <= ((y + d) - (d * 0.15))){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i);
      }
      
      if (i >= ((y + d) - (d * 0.15)) && i <= (y + d)){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i);
      }
    }
  }
}
