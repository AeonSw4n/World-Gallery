var object = false;

var relativeClick = false;

var workspaceButtons = document.getElementsByName("workspace");
var workspaceError = document.getElementById("myWorkspaceError");


function getRelativeClick(objectPos){
  relativeClick = {
    "x" : mousePos.x - objectPos.x,
    "y" : mousePos.y - objectPos.y
  }
}

function getObjectPosition(){
  updateObjectPosition();
  var gridPos = getGridPos();
  return {
    "x" : SIZE*Math.round((object.x + X - gridPos.x)/SIZE)+gridPos.x,
    "y" : SIZE*Math.round((object.y + Y - gridPos.y)/SIZE)+gridPos.y
  }
}

function getObjectScale(){
  return {
    "width" : SIZE * Math.round(object.width/SIZE),
    "height" : SIZE * Math.round(object.height/SIZE)
  }
}

function updateObjectPosition(){
  if(getClick() !== "object" || relativeClick === false)
    return false;
  object.x = mousePos.x - relativeClick.x - X;
  object.y = mousePos.y - relativeClick.y - Y;
}

function checkIfMouseOnObject(objectPos){
  if(mousePos.x >= objectPos.x && mousePos.x < objectPos.x + object.width)
    if(mousePos.y >= objectPos.y && mousePos.y < objectPos.y + object.height)
      return true;
  return false;
}

function checkIfImagesIntersect(){
  var objectPosition = getObjectPosition();
  var objectScale = getObjectScale();
  var IntersectException = {};
  var connected = false;
  var len = images.length;
  try {
    for(var i=0; i<len; i++) {
      var item = getImagePositionAndScale(images[i]);
      if(item.x < objectPosition.x-MAX_WIDTH*SIZE || item.x > objectPosition.x+MAX_WIDTH*SIZE)
        continue;
      if(item.y < objectPosition.y-MAX_HEIGHT*SIZE || item.y > objectPosition.y+MAX_HEIGHT*SIZE)
        continue;
      if(objectPosition.x < item.x+item.width && objectPosition.x+objectScale.width > item.x &&
          objectPosition.y < item.y+item.height && objectPosition.y+objectScale.height > item.y){
        console.log(item);
        throw IntersectException;
      }
      if(!connected){
        if((objectPosition.x == item.x+item.width || objectPosition.x+objectScale.width == item.x) &&
          objectPosition.y+objectScale.height > item.y && objectPosition.y < item.y+item.height){
            connected = true;
        } else{
          if((objectPosition.y == item.y+item.height || objectPosition.y+objectScale.height == item.y) &&
            objectPosition.x+objectScale.width > item.x && objectPosition.x < item.x+item.width){
              connected = true;
          }
        }
      }
    }
  } catch(e){
    if(e === IntersectException){
      return "Images intersect.";
    }
  }
  if(!connected){
    return "Images are not connected.";
  }
  return false;
}
