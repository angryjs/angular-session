class SessionStorageFactory

  constructor: (@services, @$injector) ->

  createStorage: (name) ->
    if !name
      throw new Error 'Invalid session storage name given. Set name with SessionProvider::setSessionStorage()'

    if angular.isString name
      @$injector.get name
    else
      @$injector.invoke name

angular.module('angryjs.session')
  .provider 'SessionStorageFactory', ->

    services = []

    @addSessionStorage = (name) ->
      services.push name

    @removeSessionStorage = (name) ->
      services.filter (x) ->
        if x != name then x

    @$get = [
      '$injector', ($injector) ->
        new SessionStorageFactory services, $injector
    ]

    @
