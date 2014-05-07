class SessionStorageFactory

  constructor: (@$injector) ->

  createStorage: (name) ->
    if !name
      throw new Error 'Invalid session storage name given. Set name with SessionProvider::setSessionStorage()'

    if angular.isString name
      @$injector.get name
    else
      @$injector.invoke name

angular.module('angryjs.session')
  .factory 'SessionStorageFactory', [
    '$injector', ($injector) ->
      new SessionStorageFactory $injector
  ]
