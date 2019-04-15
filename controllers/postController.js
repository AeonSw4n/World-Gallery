
var dataController = require("./dataController");
var sendController = require("./imageController");

exports.handleData = function(req){
  return new Promise((fulfill, reject)=>{
    var imageObject;
  // --------DATA VALIDATION--------
    dataController.createImageObject(req)
      .then(
        (obj)=>{
          imageObject = obj;
          return dataController.getImageDimensions(imageObject);
        }, returnError
      )
      .then(
        (dim)=>{
          return dataController.checkImageDimensions(dim);
        }, returnError
      )
      .then(
        ()=>{
          return dataController.checkImageObjectCoordinates(imageObject);
        }, returnError
      )
      .then(
        ()=>{
          return dataController.checkImageObjectDimensions(imageObject);
        }, returnError
      )
      .then(
        ()=>{
          return dataController.checkImageObjectSize(imageObject);
        }, returnError
      )
  //--------DATA VALIDATED--------
  //--------DATABASE VALIDATION--------
  //TODO: fix chunks
      .then(
        () =>{
          return sendController.addImage(imageObject);
        }, returnError
      )
      .then(
        () => {
          fulfill();
        },
        (err) => {
          reject(err);
        }
      )
  });
}

function returnError(err){
  return new Promise((fulfill, reject) => {
    reject(err);
  })
}
