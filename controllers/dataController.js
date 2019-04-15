var requestImageSize = require('request-image-size');
require('dotenv').config();

exports.createImageObject = function(req){
  return new Promise( (fulfill, reject) => {
    var imageObject;
    var rejectMessage = "Error 1. Illegal data format, could not create image object. Please try again.";
    try{
      imageObject = {
        "chunk" : req.body.chunk,
        "url" : req.body.url,
        "x" : req.body.x,
        "y" : req.body.y,
        "width" : req.body.width,
        "height" : req.body.height,
        "role" : "children"
      }
      for(var v in imageObject){
        if(imageObject.hasOwnProperty(v))
          if(imageObject[v] === null || imageObject[v] === undefined)
            reject(rejectMessage);
      }
      fulfill(imageObject);
    } catch (e){
      reject(rejectMessage);
    }
  });
}

exports.getImageDimensions = function(url){
  return new Promise( (fulfill, reject) => {
    requestImageSize(url).then(
      (size) => {
        fulfill({
          "width"   : size.width,
          "height"  : size.height
        });
      },
      (err) => {
        reject("Error 2. Illegal url string, file is not an image. Please try again.");
      }
    )
  });
}

exports.checkImageDimensions = function(dimensions){
  return new Promise((fulfill, reject)=>{
    if(dimensions.width >= process.env.SIZE && dimensions.width <= process.env.MAX_SIZE &&
      dimensions.height >= process.env.SIZE && dimensions.height <= process.env.MAX_SIZE)
        fulfill();
    else
      reject("Error 3. Image dimensions don't match possible range. Please try again.");
  });
}

exports.checkImageObjectCoordinates = function(imageObject){
  return new Promise((fulfill, reject)=>{
    if(isNaN(parseInt(imageObject.x)) || isNaN(parseInt(imageObject.y))){
      reject("Error 4. Coordinates must be numbers. Please try again.");
    } else{
      imageObject.x = parseInt(imageObject.x);
      imageObject.y = parseInt(imageObject.y);
      fulfill();
    }
  });
}

exports.checkImageObjectDimensions = function(imageObject){
  return new Promise((fulfill, reject)=>{
    if(isNaN(parseInt(imageObject.width)) || isNaN(parseInt(imageObject.height))){
      reject("Error 5. Dimensions must be numbers. Please try again.");
    } else{
      imageObject.width = parseInt(imageObject.width);
      imageObject.height = parseInt(imageObject.height);
      fulfill();
    }
  });
}

exports.checkImageObjectSize = function(imageObject){
    return new Promise((fulfill, reject)=>{
      if(imageObject.width > process.env.MAX_WIDTH || imageObject.width < 1 ||
        imageObject.height > process.env.MAX_HEIGHT || imageObject.height < 1){
        reject("Error 6. Did you actually try to change the size consants? I told you...");
      } else{
        fulfill();
      }
    });
  }
