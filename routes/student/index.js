'use strict'

const Student = {
    name : {type : 'string'},
    age : {type : 'integer'}
}

const postOpts = {
  schema :{
    body : Student
  },
  response:{
    201: {
      type: 'object',
      properties:{
        studentCreatedId: {type : 'string'}
      }
    }
  }
}

const getOpts = {
  response:{
    200:{
      type: 'object',
      properties:{
        student:{
          type : 'array',
          items : Student
        }
      }
    }
  }
}

const putOpts = {
  schema :{
    params:{
      type: 'object',
      properties:{
        _id: {type : 'string', minLength: 12}
      },
      required: ['_id']
    },
    body : Student
  },
  response:{
    200: {
      type: 'object',
      properties:{
        matchedCount: {type : 'string'},
        modifiedCount: {type : 'string'}
      }
    }
  }
}

const deleteOpts = {
  schema :{
    params:{
      type: 'object',
      properties:{
        _id: {type : 'string', minLength: 12}
      },
      required: ['_id']
    }
  },
  response:{
    200: {
      type: 'object',
      properties:{
        deletedCount: {type : 'string'}
      }
    }
  }
}

module.exports = async function(fastify,opts){

  fastify.post("/",postOpts,function(req,reply){
    const db = this.mongo.db;
    db.collection('student',onCollection);

    function onCollection(err, col){
      if(err) return reply.send(err);
      col.insertOne(req.body,function (err, student){
        reply.code(201);
        reply.send({studentCreatedId: student.insertedId});
      })
    }

  })

  fastify.get("/",getOpts,function(req,reply){
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

  fastify.put("/:_id", putOpts,async function(req,reply){
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

  fastify.delete("/:_id",deleteOpts,async function(req,reply){
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
