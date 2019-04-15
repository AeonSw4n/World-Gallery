var position = false;
var accelerate = false;
var velocity = {
  "x" : 0,
  "y" : 0
};
var spot = {
  "x" : 0,
  "y" : 0
};

var X;
var Y;

function getDist(x, y){
  return Math.sqrt(x*x + y*y);
}

$(window).mousedown(function(e){
  if(getClick() === "window"){
    accelerate = true;
    position = getMousePosition(e);
  }
}).mouseup(function(){
  accelerate = false;
  position = false;
});

function physics(dt){
  if(accelerate){
    velocity.x *= DRAG_FRICTION;
    velocity.y *= DRAG_FRICTION;
  } else {
    velocity.x *= RELEASE_FRICTION;
    velocity.y *= RELEASE_FRICTION;
  }
  if(velocity.x*velocity.x+velocity.y*velocity.y < STOP_DISTNACE){
    velocity.x = 0;
    velocity.y = 0;
  }
  if(accelerate){
    var dist = getDist(mousePos.x-position.x, mousePos.y-position.y);
    if(dist === 0)
      return;
    var sin = (mousePos.y-position.y)/dist;
    var cos = (mousePos.x-position.x)/dist;
    var aMag = 2*dist/(T*T);
    var aY = aMag*sin;
    var aX = aMag*cos;
    if(velocity.x*velocity.x + velocity.y*velocity.y < MAX_VELOCITY){
      velocity.x += aX*dt;
      velocity.y += aY*dt;
    }
  }
  position.x += velocity.x*dt;
  position.y += velocity.y*dt;
  spot.x += velocity.x*dt;
  spot.y += velocity.y*dt;
  X = Math.round(spot.x);
  Y = Math.round(spot.y);
}

function steady(){
  if(velocity.x !=0 || velocity.y !=0)
    return false;
  return true;
}
