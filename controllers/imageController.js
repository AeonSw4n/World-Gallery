var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
var fetchController = require("./fetchController");

exports.addImage = function(imageObject){
  return new Promise((fulfill, reject) => {
    try{
      MongoClient.connect("mongodb://"+process.env.DB_USER+":"+process.env.DB_PASS+"@localhost:27017/"+process.env.DB_NAME,function(err, db){

        if(err){
          db.close();
          reject('404');
          return false;
        }
        //console.log(imageObject.chunk);
        var chunk;
        try{
          chunk = new mongo.ObjectId(imageObject.chunk);
        } catch (e){
          db.close();
          reject('404');
          return false;
        }
        db.collection('pictures', function(err, collection){
          if(err){
            db.close();
            reject('404');
            return false;
          }
          collection.aggregate(fetchController.aggregateQuerry(imageObject, chunk), function(err, result){
            if(err){
              db.close();
              reject('404');
              return false;
            }
            var images = result[0].pictures;
            if(!checkIfImagesIntersect(images, imageObject)){
              collection.update(
                {
                  "_id" : chunk
                },{
                  $addToSet : {
                    "pictures" : imageObject
                  }
                }, function(err, result){
                if(err){
                  db.close();
                  reject('404');
                  return false;
                }
                else{
                  db.close();
                  fulfill();
                  return false;
                }
              });
            }
            else{
              db.close();
              reject("Error 7. There is an image in this place already or images are not connected. Please RELOAD the page and try again.");
              return false;
            }
          });
        });
      });
    } catch(e){
      reject("Error 8. Some weird shit is happening O.o");
      return false;
    }
  });
}




function checkIfImagesIntersect(images, object){
  var IntersectException = {};
  var connected = false;
  try{
    images.forEach(function(item){
      if(object.x < item.x+item.width && object.x+object.width > item.x &&
          object.y < item.y+item.height && object.y+object.height > item.y){
          throw IntersectException;
      }
      if(!connected){
        if((object.x == item.x+item.width || object.x+object.width == item.x) &&
          object.y+object.height > item.y && object.y < item.y+item.height){
            connected = true;
        } else{
          if((object.y == item.y+item.height || object.y+object.height == item.y) &&
            object.x+object.width > item.x && object.x < item.x+item.width){
              connected = true;
          }
        }
      }
    });
  } catch(e){
    return true;
  }
  if(!connected){
    return true;
  }
  return false;
}
