class CurrentSessionStorage

  data = {}
  _key = null

  setKey: (key) ->
    _key = key

  getKey: ->
    _key

  get: ->
    data[_key]

  set: (variable) ->
    data[_key] = variable

  remove: ->
    data[_key] = null

angular.module('angryjs.session')
  .factory 'CurrentSessionStorage', ->
    new CurrentSessionStorage
