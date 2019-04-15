
function drawImages(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(workspaceMode){
    var gridPos = getGridPos();
    ctx.putImageData(grid, gridPos.x, gridPos.y);
  }
  images.forEach(function(object){
    var ipas = getImagePositionAndScale(object);
    if(ipas.x + ipas.width < 0 || ipas.x > canvas.width)
      return false;
    if(ipas.y + ipas.height < 0 || ipas.y > canvas.height)
      return false;
    if(!object.img.complete){
      ctx.drawImage(placeholderImage, ipas.x, ipas.y, ipas.width, ipas.height);
    } else{
      try{
        ctx.drawImage(
          object.img,
          ipas.x,
          ipas.y,
          ipas.width,
          ipas.height
        );
      } catch (e){
        ctx.drawImage(placeholderImage, ipas.x, ipas.y, ipas.width, ipas.height);
      }
    }
  });

  if(workspaceMode){
    if(!initialWorkspaceClick){
      ctx.fillStyle = "rgba(0,0,0,0.80)";
      ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    var objectPos = getObjectPosition();
    var objectScale = getObjectScale();
    ctx.drawImage(object.img, objectPos.x, objectPos.y, objectScale.width, objectScale.height);
    ctx.beginPath();
    ctx.rect(objectPos.x, objectPos.y, objectScale.width, objectScale.height);
    ctx.stroke();
    if(steady()){
      var scaleBoxesPositions = getScaleBoxesPoitions();
      scaleBoxesPositions.forEach(function(item){
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x, item.y, SCALE_BOX_SIZE, SCALE_BOX_SIZE);
      });
    }
  }

}
