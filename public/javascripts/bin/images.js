var images = [];
var placeholderImage;

function getImagePositionAndScale(img){
  return {
    "x" : img.x + X,
    "y" : img.y + Y,
    "width" : img.width,
    "height" : img.height
  }
}

function getClickedImage(e){
  if(workspaceMode || freeze)
    return false;
  //console.log(e.target);
  if(e.target === canvas){
    var len = images.length;
    for(var i=0;i<len;i++){
      var ipas = getImagePositionAndScale(images[i]);
      if(mousePos.x >= ipas.x && mousePos.x < ipas.x+ipas.width){
        if(mousePos.y >= ipas.y && mousePos.y < ipas.y+ipas.height){
          return images[i];
        }
      }
    }
  }
  return false;
}
