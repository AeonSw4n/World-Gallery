var inter = false;

var workspaceMode = false;

var parentImage = false;

var freeze = true;

var canvas = document.getElementById("myCanvas");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

var now, dt, last;
var fpsmeter = new FPSMeter({ decimals: 0, graph: true, theme: 'dark', right: '5px', left: 'auto' });

function frame(){
  fpsmeter.tickStart();
  now = timestamp();
  dt = Math.min(1, (now - last) / SECOND);
  if(!freeze){
    physics(dt);
    drawImages();
  }
  last = now;
  fpsmeter.tick();
  requestAnimationFrame(frame);
}
