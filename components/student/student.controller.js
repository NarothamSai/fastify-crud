const Student = require('./student.model')

function makeMongooseSort(str) {
  if (!str) return ''

  let indexDesc = str.indexOf('DESC')
  let indexAsc = str.indexOf('ASC')
  let sort = ''
  let strasc = []
  let strdesc = []

  if (indexAsc == -1 && indexDesc == -1) {
  } else if (indexAsc == -1) {
    strdesc = str.slice(0, indexDesc)
    strdesc = strdesc.split(',')

    for (let i = 0; i < strdesc.length; i++) {
      strdesc[i] = strdesc[i].trim()
    }
  } else if (indexDesc == -1) {
    strasc = str.slice(0, indexAsc)
    strasc = strasc.split(',')

    for (let i = 0; i < strasc.length; i++) {
      strasc[i] = strasc[i].trim()
    }
  } else if (indexDesc < indexAsc) {
    strdesc = str.slice(0, indexDesc)
    strdesc = strdesc.split(',')

    for (let i = 0; i < strdesc.length; i++) {
      strdesc[i] = strdesc[i].trim()
    }

    strasc = str.slice(indexDesc + 4, indexAsc)
    strasc = strasc.split(',')

    for (let i = 0; i < strasc.length; i++) {
      strasc[i] = strasc[i].trim()
    }
  } else {
    strasc = str.slice(0, indexAsc)
    strasc = strasc.split(',')

    for (let i = 0; i < strasc.length; i++) {
      strasc[i] = strasc[i].trim()
    }
    strdesc = str.slice(indexAsc + 3, indexDesc)
    strdesc = strdesc.split(',')

    for (let i = 0; i < strdesc.length; i++) {
      strdesc[i] = strdesc[i].trim()
    }
  }

  for (let i = 0; i < strasc.length; i++) {
    if (strasc[i] != '') sort += strasc[i] + ' '
  }
  for (let i = 0; i < strdesc.length; i++) {
    if (strdesc[i] != '') sort += '-' + strdesc[i] + ' '
  }
  return sort
}

module.exports = {
  create: async function (req, reply) {
    try {
      const student = req.body
      const newStudent = await Student.create(student)

      reply.code(201).send({ student: newStudent })
    } catch (err) {
      req.log.error(err)
      reply.code(500).send(err)
    }
  },

  getAll: async function (req, reply) {
    try {
      let filter = { where: {}, sort: '', skip: 0, limit: 10 }

      if (req.query.filter) {
        try {
          filter = JSON.parse(req.query.filter)
          filter.sort = makeMongooseSort(filter.order)

          for (const prop in filter.where) {
            if (typeof filter.where[prop] == 'string') {
              filter.where[prop] = { $regex: filter.where[prop] }
            }
          }
        } catch (err) {
          req.log.error(err)
        }
      }

      if (!filter.where) filter.where = {}
      if (!filter.skip) filter.skip = 0

      if (
        typeof filter.limt != 'number' ||
        (filter.limit <= 0 && filter.limit >= 50)
      ) {
        filter.limit = 10
      }

      const student = await Student.find(filter.where)
        .sort(filter.sort)
        .skip(filter.skip)
        .limit(filter.limit)

      const count = await Student.countDocuments(filter.where).then()

      reply.code(200).send({ count: count, pagination_data: student })
    } catch (err) {
      req.log.error(err)
      reply.code(500).send(err)
    }
  },

  getOne: async function (req, reply) {
    try {
      const _id = req.params._id
      const student = await Student.findById(_id)

      reply.code(200).send({ student: student })
    } catch (err) {
      req.log.error(err)
      reply.code(500).send(err)
    }
  },

  putOne: async function (req, reply) {
    try {
      const _id = req.params._id
      const updates = req.body
      const student = await Student.findOneAndReplace({ _id: _id }, updates, {
        new: true,
      })

      reply.code(200).send({ student: student })
    } catch (err) {
      req.log.error(err)
      reply.code(500).send(err)
    }
  },

  patchOne: async function (req, reply) {
    try {
      const _id = req.params._id
      const updates = req.body
      const student = await Student.findByIdAndUpdate(
        _id,
        { $set: updates },
        { new: true },
      )

      reply.code(200).send({ student: student })
    } catch (err) {
      req.log.error(err)
      reply.code(500).send(err)
    }
  },

  deleteOne: async function (req, reply) {
    try {
      const _id = req.params._id
      const student = await Student.findByIdAndRemove(_id)

      reply.code(200).send({ student: student })
    } catch (err) {
      req.log.error(err)
      reply.code(500).send(err)
    }
  },
}
