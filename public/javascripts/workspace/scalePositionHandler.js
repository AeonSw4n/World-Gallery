function getScaleBoxesPoitions(){
  var arr = [];
  //updateScaleBoxes();
  updateScaleBoxesPositions();
  scaleBoxes.forEach(function(item){
    arr.push({
      "x" : item.x,
      "y" : item.y,
      "color" : item.color
    })
  });
  return arr;
}

function updateScaleBoxesPositions(){
  var object = getObjectPosition();
  var objectScale = getObjectScale();
  scaleBoxes[0].x = object.x;
  scaleBoxes[0].y = object.y;

  scaleBoxes[1].x = object.x + objectScale.width;
  scaleBoxes[1].y = object.y;

  scaleBoxes[2].x = object.x;
  scaleBoxes[2].y = object.y + objectScale.height;

  scaleBoxes[3].x = object.x + objectScale.width;
  scaleBoxes[3].y = object.y + objectScale.height;

  scaleBoxes.forEach(function(item){
    item.x -= SCALE_BOX_SIZE/2;
    item.y -= SCALE_BOX_SIZE/2;
  });
}

function checkIfMouseOnScaleBoxes(){
  var scaleBoxesPositions = getScaleBoxesPoitions();
  for(var i=0;i<scaleBoxes.length;i++){
    var item = scaleBoxesPositions[i];
    if(mousePos.x >= item.x && mousePos.x < item.x + SCALE_BOX_SIZE)
      if(mousePos.y >= item.y && mousePos.y < item.y + SCALE_BOX_SIZE){
        return i;
      }
  }
  return false;
}
