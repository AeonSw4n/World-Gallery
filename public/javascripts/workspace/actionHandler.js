var workspaceButtons = document.getElementsByName("workspace");
var workspaceError = document.getElementById("myWorkspaceError");

$("#myTickButton").click(function(){
  var intersection = checkIfImagesIntersect();
  if(intersection){
    workspaceError.innerHTML = intersection+"<br>Fix image position.";
  } else{
    var position = getObjectPosition();
    var scale = getObjectScale();
    var imagePositionAndScale = getImagePositionAndScale(parentImage);
    object.chunk = parentImage.chunk;
    object.x = (position.x - imagePositionAndScale.x)/SIZE;
    object.y = (position.y - imagePositionAndScale.y)/SIZE;
    object.width = scale.width/SIZE;
    object.height = scale.height/SIZE;
    freeze = true;
    console.log(object);
    post('/r/', object);
  }
});

$("#myToeButton").click(function(){
  destroyWorkspace();
});

$(window).mouseup(function(){
  resetOnUp();

}).mousemove(function(e){
  if(!workspaceMode)
    return false;
  updateObjectPosition();
  updateScaleBoxesPositions();
});

function showError(){
  workspaceError.style.visibility = "visible";
  workspaceError.style.opacity = "1";
}

function destroyError(){
  workspaceError.style.visibility = "hidden";
  workspaceError.style.opacity = "0";
  workspaceError.innerHTML = "";
}

function constructWorkspace(object){
  showError();
  workspaceButtons.forEach(function(item){
    item.style.visibility = "visible";
    item.style.opacity = "1";
  });

  var gridPos = getGridPos();
  object.x = SIZE*Math.floor(gridWidth/2)+gridPos.x-X;
  object.y = SIZE*Math.floor(gridHeight/2)+gridPos.y-Y;
  window.object = object;

  setScaleBoxes();

  workspaceMode = true;
  freeze = false;
}

function destroyWorkspace(){
  object = false;
  scaleBoxes = false;
  initialWorkspaceClick = false;
  //mousePress = false;
  //scaleBoxPress = false;
  workspaceMode = false;
  destroyError();
  workspaceButtons.forEach(function(item){
    item.style.visibility = "hidden";
    item.style.opacity = "0";
  });
  makeFormInvisible();
}

function resetOnUp(){
  if(!workspaceMode)
    return false;
  relativeClick = false;
  scaleBoxes.forEach(function(item){
    item.color = "rgba(0,0,0,0.5)";
  });
}
