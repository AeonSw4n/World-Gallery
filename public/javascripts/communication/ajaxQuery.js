

function query(chunk, x, y, callback){
  var object = [];
  var items = [];
  var counter = 0;
  var request = $.get(document.location.origin+'/pictures/'+chunk, function(data, status){
    var len = data.pictures.length;
    data.pictures.forEach(function(item){
      var img = new Image;
      /*img.onload = function(){
        object.push({
          "chunk"   : chunk,
          "img"     : img,
          "x"       : item.x*SIZE,
          "y"       : item.y*SIZE,
          "width"   : item.width*SIZE,
          "height"  : item.height*SIZE
        });
        if(item.role === "parent")
          parentImage = object[object.length-1];
        if(object.length === len)
          callback(object);
      };*/
      img.src = item.url;
      img.onerror = "this.src='/images/notFound.png'";
      object.push({
        "chunk"   : chunk,
        "img"     : img,
        "x"       : item.x*SIZE,
        "y"       : item.y*SIZE,
        "width"   : item.width*SIZE,
        "height"  : item.height*SIZE
      });
      if(item.role === "parent")
        parentImage = object[object.length-1];
    });
    callback(object);
  });
}


window.onload = function(){
  placeholderImage = new Image;
  placeholderImage.src = "/images/placeholder.png";
  query("598a740ae706508446839e3a", 0, 0, function(result){
    var x = SIZE*Math.floor((canvas.width/2)/SIZE);
    var y = SIZE*Math.floor((canvas.height/2)/SIZE);
    images = result;
    images.forEach(function(item){
      item.x += x;
      item.y += y;
    });
    makeGrid();
    freeze = false;
    last = timestamp();
    requestAnimationFrame(frame);
  });
}
