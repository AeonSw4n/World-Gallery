var outside = false;

var click = false;

var mousePos = {
  "x" : 0,
  "y" : 0
};

function getMousePosition(event){
  var rect = canvas.getBoundingClientRect();
  return {
   "x" : event.clientX - rect.left,
   "y" : event.clientY - rect.top
  };
}

$(window).resize(function(){
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

}).mousedown(function(){
  click = true;

}).mouseenter(function(){
  outside = false;

}).mouseleave(function(){
  outside = true;

}).mousemove(function(e){
  mousePos = getMousePosition(e);
  click = false;

});
