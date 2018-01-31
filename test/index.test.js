const chai = require('chai')
const assert = chai.assert
const BaseJoi = require('joi')
const JoiIntersection = require('./../index')
const Joi = BaseJoi.extend(JoiIntersection)

describe('Joi intersection', function () {
  it('should find one intersection', function () {
    const schema = Joi.array().groups([
      ['Bob', 'Alex', 'Peter'],
      ['Jack', 'Mike']
    ])

    Joi.validate(['Bob', 'Alex'], schema, error => assert.equal(error, null))
  })

  it('should not find more than one intersection', function () {
    const schema = Joi.array().groups([
      ['Bob', 'Alex', 'Peter'],
      ['Jack', 'Mike']
    ])

    Joi.validate(['Jack', 'Bob'], schema, error => assert.isNotNull(error))
  })

  it('should find one singleton', function () {
    const schema = Joi.array().singleton(['Bob', 'Alex', 'Peter'])

    Joi.validate(['Bob'], schema, error => assert.equal(error, null))
  })

  it('should find more than one singleton', function () {
    const schema = Joi.array().singleton(['Bob', 'Alex', 'Peter'])

    Joi.validate(['Bob', 'Bob'], schema, error => assert.isNotNull(error))
  })

  it('should chain rules', function () {
    const schema = Joi.array()
      .groups([
        ['Bob', 'Alex', 'Peter'],
        ['Jack', 'Mike']
      ])
      .singleton(['Bob', 'Alex', 'Peter'])

    Joi.validate(['Bob', 'Bob'], schema, error => assert.isNotNull(error))
  })
})
