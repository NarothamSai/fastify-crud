'use strict'

const { test } = require('tap')
const { build } = require('../../helper')

test('/student POST Route', async (t) => {
  const app = build(t)
  //   t.plan(3)

  t.test('when sending empty object, return fail response', async (t) => {
    t.plan(3)
    const response = await app.inject({
      url: '/student',
      method: 'POST',
      payload: {},
    })

    t.equal(response.statusCode, 400)
    t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
    t.same(response.json(), {
      statusCode: 400,
      error: 'Bad Request',
      message: "body should have required property 'name'",
    })
    t.end()
  })

  t.test('when sending all fields, return success response', async (t) => {
    t.plan(3)
    const response = await app.inject({
      url: '/student',
      method: 'POST',
      payload: {
        name: 'sai',
        age: 24,
        rollno: 1,
      },
    })

    t.equal(response.statusCode, 201)
    t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
    t.has(response.json(), {
      student: {
        name: 'sai',
        age: 24,
        rollno: '1',
        statusid: 1,
      },
    })
    t.end()
  })
  t.end()
  //   app.close()
})
