var clickArray = [];
var initialWorkspaceClick = false;

function addClick(obj){
  clickArray.push(obj);
}

function getClick(){
  if(clickArray.length === 0)
    return "";
  return clickArray[clickArray.length-1];
}

function resetClick(){
  clickArray = [];
}

$(window).mousedown(function(e){
  mousePos = getMousePosition(e);
  addWindowClick();
  addButtonClick(e);
  addWorkspaceObjectClick();
  addScaleBoxesClick();
  addTickButton(e);
  addToeButton(e);

}).mouseup(function(){
  resetClick();
});


function addWindowClick(){
  addClick("window");
}

function addButtonClick(e){
  if(checkButton(button, e.target))
    addClick("button");
}

function addWorkspaceObjectClick(){
  if(!workspaceMode)
    return false;
  var objectPos = getObjectPosition();
  if(checkIfMouseOnObject(objectPos)){
    initialWorkspaceClick = true;
    getRelativeClick(objectPos);
    addClick("object");
  }
}

function addScaleBoxesClick(){
  if(!workspaceMode)
    return false;
  var box = checkIfMouseOnScaleBoxes();
  if(box !== false){
    initialWorkspaceClick = true;
    getRelativeClick(getScaleBoxesPoitions()[box]);
    addClick(box);
  }
}

function addTickButton(e){
  if(checkButton($("#myTickButton")[0], e.target))
    addClick("tickButton");
}

function addToeButton(e){
  if(checkButton($("#myToeButton")[0], e.target))
    addClick("toeButton");
}

function checkButton(button, target){
  return (target === button || target === button.children[0]);
}
