var grid;
var gridPos;

var gridWidth;
var gridHeight;

function makeGrid(){
  window.gridWidth = Math.ceil(canvas.width/SIZE)+2;
  window.gridHeight = Math.ceil(canvas.height/SIZE)+2;
  grid = ctx.createImageData(gridWidth*SIZE,gridHeight*SIZE);

  for(var i = 0; i<= gridHeight; i++){
    var len = gridWidth*SIZE;
    for(var posX=0; posX<len; posX++){
      grid.data[4*(i*SIZE*len+posX)+0] = 9;
      grid.data[4*(i*SIZE*len+posX)+1] = 86;
      grid.data[4*(i*SIZE*len+posX)+2] = 141;
      grid.data[4*(i*SIZE*len+posX)+3] = 100;
    }
    if(i == gridHeight)
      continue;
    for(var j = 0; j<SIZE; j++){
      for(var posX=0;posX<=len;posX+=SIZE){
        grid.data[4*((i*SIZE+j)*len+posX)+0] = 9;
        grid.data[4*((i*SIZE+j)*len+posX)+1] = 86;
        grid.data[4*((i*SIZE+j)*len+posX)+2] = 141;
        grid.data[4*((i*SIZE+j)*len+posX)+3] = 100;
      }
    }
  }
  gridPos = {
    "x" : -SIZE,
    "y" : -SIZE
  }
}

function updateGridPos(){
  var x = Math.round(spot.x);
  var y = Math.round(spot.y);
  if(x >= 0)
    gridPos.x = (x % SIZE)-SIZE;
  else if(x <= -2*SIZE)
    gridPos.x = -((-x)%SIZE);
  else
    gridPos.x = x;

  if(y >= 0)
    gridPos.y = (y % SIZE)-SIZE;
  else if(y <= -2*SIZE)
    gridPos.y = -((-y)%SIZE);
  else
    gridPos.y = y;
}

function getGridPos(){
  updateGridPos();
  return gridPos;
}
