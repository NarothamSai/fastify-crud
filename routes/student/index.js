'use strict'

module.exports = async function(fastify,opts){

  fastify.post("/",function(req,reply){
    const db = this.mongo.db;
    db.collection('student',onCollection);

    function onCollection(err, col){
      if(err) return reply.send(err);
      col.insertOne(req.body,function (err, student){
        reply.code(201);
        reply.send({student: student.insertedId});
      })
    }

  })

  fastify.get("/",function(req,reply){
    const db = this.mongo.db;
    db.collection('student',onCollection);

    var replyElem = [];

    function onCollection(err, col){
      if(err) return reply.send({err: err});
      col.find({},async (err, student) => {
        replyElem = await student.toArray()
        reply.send({student : replyElem});
      });
    }

  })

  fastify.put("/:_id",async function(req,reply){
    let {_id} = req.params;

    const ObjectId = this.mongo.ObjectId;

    _id = new ObjectId(_id);

    const db = this.mongo.db;
    const result = await db.collection('student')
    .updateOne({_id : _id},{$set : req.body});

    reply.send({
      result : {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
      }
    });

  })

  fastify.delete("/:_id",async function(req,reply){
    let {_id} = req.params;

    const ObjectId = this.mongo.ObjectId;

    _id = new ObjectId(_id);

    const db = this.mongo.db;
    const result = await db.collection('student')
    .deleteOne({_id : _id});

    reply.send({
      result : {
        deletedCount: result.deletedCount,
      }
    });
  })
}
