var scaleBoxes = false;

$(window).mousemove(function(){
  if(!workspaceMode)
    return false;
  if(!steady())
    return false;
  var box = checkIfMouseOnScaleBoxes();
  if(box !== false){
    box = scaleBoxes[box];
    if(typeof getClick() === "string")
      box.color = "rgba(0,0,0,0.75)";
  }
  else if(typeof getClick() === "string" || relativeClick === false){
    scaleBoxes.forEach(function(item){
      item.color = "rgba(0,0,0,0.5)";
    });
  }
  updateScaleBoxes();
});

function updateScaleBoxes(){
  var i = getClick();
  if(typeof i === "string" || relativeClick === false)
    return false;
  var box = scaleBoxes[i];
  var xDis = mousePos.x - relativeClick.x - scaleBoxes[i].x;
  //console.log(i + " " + mousePos.x + " " + relativeClick.x + " " + scaleBoxesPositions[i]);
  if(Math.abs(xDis) > SIZE/2){
    scaleBoxes[i].x += Math.sign(xDis)*SIZE;
    scaleBoxes[box.xRel].x += Math.sign(xDis)*SIZE;
    if(scaleBoxes[1].x - scaleBoxes[0].x < SIZE || scaleBoxes[1].x - scaleBoxes[0].x > MAX_WIDTH * SIZE){
      scaleBoxes[i].x -= Math.sign(xDis)*SIZE;
      scaleBoxes[box.xRel].x -= Math.sign(xDis)*SIZE;
    }
  }

  var yDis = mousePos.y - relativeClick.y - scaleBoxes[i].y;

  if(Math.abs(yDis) > SIZE/2){
    scaleBoxes[i].y += Math.sign(yDis)*SIZE;
    scaleBoxes[box.yRel].y += Math.sign(yDis)*SIZE;
    if(scaleBoxes[2].y - scaleBoxes[0].y < SIZE || scaleBoxes[2].y - scaleBoxes[0].y > MAX_HEIGHT * SIZE){
      scaleBoxes[i].y -= Math.sign(yDis)*SIZE;
      scaleBoxes[box.yRel].y -= Math.sign(yDis)*SIZE;
    }
  }

  object.x = scaleBoxes[0].x + SCALE_BOX_SIZE/2 - X;
  object.y = scaleBoxes[0].y + SCALE_BOX_SIZE/2 - Y;
  object.width = scaleBoxes[1].x - scaleBoxes[0].x;
  object.height = scaleBoxes[2].y - scaleBoxes[0].y;
  //console.log(object.height);
}

function setScaleBoxes(){
  scaleBoxes = [
    {
      "x" : 0,
      "y" : 0,
      "color" : "rgba(0,0,0,0.5)",
      "id" : 0,
      "xRel" : 2,
      "yRel" : 1
    },{
      "x" : 0,
      "y" : 0,
      "color" : "rgba(0,0,0,0.5)",
      "id" : 1,
      "xRel" : 3,
      "yRel" : 0
    },{
      "x" : 0,
      "y" : 0,
      "color" : "rgba(0,0,0,0.5)",
      "id" : 2,
      "xRel" : 0,
      "yRel" : 3
    },{
      "x" : 0,
      "y" : 0,
      "color" : "rgba(0,0,0,0.5)",
      "id" : 3,
      "xRel" : 1,
      "yRel" : 2
    }
  ];
  updateScaleBoxesPositions();
  scaleBoxes.forEach(function(item){
    item.x -= SCALE_BOX_SIZE/2;
    item.y -= SCALE_BOX_SIZE/2;
  });
}
