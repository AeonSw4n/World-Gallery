var imageBox = document.getElementById("myImageBox");
var imageObject = document.getElementById("myImageObject");

var viewMode = false;

$(window).mouseup(function(e){
  if(click){
    if(viewMode){
      if(e.target === imageBox)
        makeImageInvisible();
    }
    else{
      var img = getClickedImage(e);
      if(img){
        makeImageVisible(img);
      }
    }
  }
});

function makeImageVisible(img){
  //clearInter();
  //workspaceMode = true;
  freeze = true;

  setImage(img.img.src);

  imageBox.style.visibility = "visible";
  imageBox.style.opacity = "1";

  button.style.visibility = "hidden";
  button.style.opacity = "0";
  button.children[0].style.visibility = "hidden";
  button.children[0].style.opacity = "0";

  canvas.style.visibility = "hidden";

  viewMode = true;
}

function makeImageInvisible(){
  freeze = false;

  imageObject.src = "";

  imageBox.style.visibility = "hidden";
  imageBox.style.opacity = "0";

  button.style.visibility = "visible";
  button.style.opacity = "1";
  button.children[0].style.visibility = "visible";
  button.children[0].style.opacity = "1";

  canvas.style.visibility = "visible";

  viewMode = false;
}

function setImage(url){
  $(imageObject).on('load', function(){
    var dim = {
      "width"  : imageObject.naturalWidth,
      "height" : imageObject.naturalHeight,
      "wScale" : imageObject.naturalWidth / (canvas.width - 2*WIDTH_MARGIN),
      "hScale" : imageObject.naturalHeight / (canvas.height - 2*HEIGHT_MARGIN)
    }

    if(dim.wScale > 1 || dim.hScale > 1){
      dim.width = Math.round( (1 / Math.max(dim.wScale, dim.hScale)) * dim.width);
      dim.height = Math.round( (1 / Math.max(dim.wScale, dim.hScale)) * dim.height);
    }

    imageObject.style.width = dim.width+"px";
    imageObject.style.height = dim.height+"px";

    imageObject.style.left = "calc(50vw - "+Math.round(dim.width/2)+"px)";
    imageObject.style.top = "calc(50vh - "+Math.round(dim.height/2)+"px)";


  }).on('error', function(){
    imageObject.src = "/images/placeholder.png";
    imageObject.style.left = 'calc(50% - 150px)';

  });
  imageObject.src = url;
}
