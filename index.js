const _ = require('lodash')

const schema = joi => ({
  base: joi.array(),
  name: 'array',
  language: {
    groups: 'Needs to be a single intersection of the given groups',
    singleton: 'Element must stands for itself of the given elements'
  },

  pre (value, state, options) {
    return {
      value,
      unique: _.uniq(value)
    }
  },

  rules: [{
    name: 'groups',
    params: {
      groups: joi.array().items(joi.array().items(joi.string()))
    },

    validate ({groups}, {unique, value}, state, options) {
      let intersections = 0

      _.each(groups, group => {
        if (_.size(_.intersection(group, unique))) intersections++
      })

      if (intersections > 1) {
        return this.createError('array.groups', {value, unique}, state, options)
      }

      return {value, unique}
    }
  }, {
    name: 'singleton',
    params: {
      singletons: joi.array().items(joi.string())
    },

    validate ({singletons}, {value, unique}, state, options) {
      let intersections = 0
      _.each(value, item => {
        if (_.includes(singletons, item)) intersections++
      })

      if (intersections > 1) {
        return this.createError('array.singleton', {value, unique}, state, options)
      }

      return {value, unique}
    }
  }]
})

module.exports = schema