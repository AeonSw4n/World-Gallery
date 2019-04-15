var box = document.getElementById("myBox");
var form = document.getElementById("myForm");


function makeFormVisible(){
  //clearInter();
  //workspaceMode = true;
  freeze = true;
  box.style.visibility = "visible";
  box.style.opacity = "1";

  form.style.top = "35%";

  formUrl.value = "";
  formUrl.placeholder = "e.g. imgur.com";

  button.style.visibility = "hidden";
  button.style.opacity = "0";
  button.children[0].style.visibility = "hidden";
  button.children[0].style.opacity = "0";

  canvas.style.visibility = "hidden";

}

function makeFormInvisible(){
  freeze = false;
  box.style.visibility = "hidden";
  box.style.opacity = "0";

  form.style.top = "30%";

  button.style.visibility = "visible";
  button.style.opacity = "1";
  button.children[0].style.visibility = "visible";
  button.children[0].style.opacity = "1";

  canvas.style.visibility = "visible";
  //workspaceMode = false;
  //if(inter === false)
  //  setInter();
}

function setWorkspaceStyle(){
  box.style.visibility = "hidden";
  box.style.opacity = "0";

  form.style.top = "30%";

  canvas.style.visibility = "visible";
}

$(box).click(function(e){
  if(e.target === box){
    makeFormInvisible();
  }
});


var formSubmit = document.getElementById("myFormSubmit");
var formUrl = document.getElementById("myFormUrl");

$(formSubmit).click(function(){
  if(formUrl.checkValidity() && formUrl.value !== ""){
    var img = new Image;
    img.onload = function(){
      if(img.width < SIZE || img.height < SIZE){
        formUrl.value = "";
        formUrl.placeholder = "*** Image must be at least "+SIZE+"x"+SIZE+" px ***";
      }
      else if(img.width > MAX_SIZE || img.height > MAX_SIZE){
        formUrl.value = "";
        formUrl.placeholder = "*** Image size cannot exceed "+MAX_SIZE+" px, sorry ***";
      }
      else {
        setWorkspaceStyle();
        var object = makeImageObject(img, formUrl.value);
        constructWorkspace(object);
      }
    }
    img.onerror = function(){
      formUrl.value = "";
      formUrl.placeholder = "*** Incorrect URL ***";
    }
    img.src = formUrl.value;
  }
});

function makeImageObject(img, url){
  return {
    "url"     : img.src,
    "img"     : img,
    "x"       : 0,
    "y"       : 0,
    "width"   : SIZE,
    "height"  : SIZE
  };
}
