class Session

  constructor: (@SessionStorage, @emptySession) ->

  get: ->
    @SessionStorage.get() || @emptySession

  set: (data) ->
    @SessionStorage.set data

  clear: ->
    @SessionStorage.remove()

angular.module('angryjs.session')
  .provider 'Session', ->

    sessionStorageName = null
    sessionStorageKey = null
    defaultSession = null

    @setSessionStorageKey = (name) ->
      sessionStorageKey = name

    @setSessionStorage = (name) ->
      sessionStorageName = name

    @setDefaultSession = (session) ->
      defaultSession = session

    @$get = [
      'SessionStorageFactory', (SessionStorageFactory) ->
        SessionStorage = SessionStorageFactory.createStorage sessionStorageName
        SessionStorage.setKey sessionStorageKey
        new Session SessionStorage, defaultSession
    ]

    @
