var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


exports.fetchData = function(ID){
  return new Promise((fulfill, reject)=>{
    try{
      MongoClient.connect("mongodb://"+process.env.DB_USER+":"+process.env.DB_PASS+"@localhost:27017/"+process.env.DB_NAME,function(err, db){
        if(err)reject(err);
        console.log(db);
        return false;
        db.collection(process.env.DB_COLLECTION, function(err, collection){
          if(err){
            db.close();
            reject(err);
            return false;
          }
          var id;
          try {
            id = new mongo.ObjectId(ID);
          } catch (e){
            db.close();
            reject(err);
            return false;
          }
          collection.findOne({_id : id}, function(err, result){
            if(err || result === null){
              db.close();
              reject(err);
              return false;
            }
            else{
              db.close();
              fulfill(result);
            }
          });
        });
      });
    } catch(e){
      reject("Unable to connect to the database.");
    }
  });
}

exports.aggregateQuerry = function(imageObject, chunk){
  return [
    {
      $match : {
        "_id" : chunk
      }
    },
    {
      $project : {
        pictures : {
          $filter : {
            input : "$pictures",
            as:"item",
            cond : { $and : [
              {$and : [
                {
                  $gte : ["$$item.x",imageObject.x-process.env.MAX_WIDTH]
                },{
                 $lte : ["$$item.x",imageObject.x+1*process.env.MAX_WIDTH]
                }
              ]},
              {$and : [
                {
                  $gte : ["$$item.y", imageObject.y-process.env.MAX_HEIGHT]
                },{
                  $lte : ["$$item.y", imageObject.y+1*process.env.MAX_HEIGHT]
                }
              ]}
            ]
          }
        }
      }
    }
  }];
};
