/*

                                          AGGREGATE ELEMENTS
db.pictures.aggregate(
  [
    {
      $match:{
        "name": "puza"
      }
    },
    {
      $project:{
        pictures:{
          $filter:{
            input:"$pictures",
            as:"item",
            cond:{
              $eq:[
                "$$item.url" , "__URL__"
              ]
            }
          }
        }
      }
    }
  ]
).pretty()


                                          REMOVE ELEMENTS
db.pictures.update(
  {},
  {
    $pull : {
      "pictures" : {
        "url" : "__URL__"
      }
    }
  },
  {
    multi : true
  }
)


*/
