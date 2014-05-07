class LocalSessionStorage

  _key = ''

  constructor: (@LocalStorage) ->

  setKey: (key) ->
    _key = key

  getKey: ->
    _key

  get: ->
    angular.fromJson @LocalStorage.get _key

  set: (variable) ->
    @LocalStorage.set _key, angular.toJson variable

  remove: ->
    @LocalStorage.remove _key

angular.module('angryjs.session')
  .factory 'LocalSessionStorage', [
    'LocalStorage', (LocalStorage) ->
      new LocalSessionStorage LocalStorage
  ]
