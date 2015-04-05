(function() {
  angular.module('angryjs.session', ['angryjs.localStorage']);

}).call(this);

(function() {
  var CurrentSessionStorage;

  CurrentSessionStorage = (function() {
    var _key, data;

    function CurrentSessionStorage() {}

    data = {};

    _key = null;

    CurrentSessionStorage.prototype.setKey = function(key) {
      return _key = key;
    };

    CurrentSessionStorage.prototype.getKey = function() {
      return _key;
    };

    CurrentSessionStorage.prototype.get = function() {
      return data[_key];
    };

    CurrentSessionStorage.prototype.set = function(variable) {
      return data[_key] = variable;
    };

    CurrentSessionStorage.prototype.remove = function() {
      return data[_key] = null;
    };

    return CurrentSessionStorage;

  })();

  angular.module('angryjs.session').factory('CurrentSessionStorage', function() {
    return new CurrentSessionStorage;
  });

}).call(this);

(function() {
  var LocalSessionStorage;

  LocalSessionStorage = (function() {
    var _key;

    _key = '';

    function LocalSessionStorage(LocalStorage1) {
      this.LocalStorage = LocalStorage1;
    }

    LocalSessionStorage.prototype.setKey = function(key) {
      return _key = key;
    };

    LocalSessionStorage.prototype.getKey = function() {
      return _key;
    };

    LocalSessionStorage.prototype.get = function() {
      return angular.fromJson(this.LocalStorage.get(_key));
    };

    LocalSessionStorage.prototype.set = function(variable) {
      return this.LocalStorage.set(_key, angular.toJson(variable));
    };

    LocalSessionStorage.prototype.remove = function() {
      return this.LocalStorage.remove(_key);
    };

    return LocalSessionStorage;

  })();

  angular.module('angryjs.session').factory('LocalSessionStorage', [
    'LocalStorage', function(LocalStorage) {
      return new LocalSessionStorage(LocalStorage);
    }
  ]);

}).call(this);

(function() {
  var Session;

  Session = (function() {
    function Session(SessionStorage1, emptySession) {
      this.SessionStorage = SessionStorage1;
      this.emptySession = emptySession;
    }

    Session.prototype.get = function() {
      return this.SessionStorage.get() || this.emptySession;
    };

    Session.prototype.set = function(data) {
      return this.SessionStorage.set(data);
    };

    Session.prototype.clear = function() {
      return this.SessionStorage.remove();
    };

    return Session;

  })();

  angular.module('angryjs.session').provider('Session', function() {
    var defaultSession, sessionStorageKey, sessionStorageName;
    sessionStorageName = null;
    sessionStorageKey = null;
    defaultSession = null;
    this.setSessionStorageKey = function(name) {
      return sessionStorageKey = name;
    };
    this.setSessionStorage = function(name) {
      return sessionStorageName = name;
    };
    this.setDefaultSession = function(session) {
      return defaultSession = session;
    };
    this.$get = [
      'SessionStorageFactory', function(SessionStorageFactory) {
        var SessionStorage;
        SessionStorage = SessionStorageFactory.createStorage(sessionStorageName);
        SessionStorage.setKey(sessionStorageKey);
        return new Session(SessionStorage, defaultSession);
      }
    ];
    return this;
  });

}).call(this);

(function() {
  var SessionStorageFactory;

  SessionStorageFactory = (function() {
    function SessionStorageFactory($injector1) {
      this.$injector = $injector1;
    }

    SessionStorageFactory.prototype.createStorage = function(name) {
      if (!name) {
        throw new Error('Invalid session storage name given. Set name with SessionProvider::setSessionStorage()');
      }
      if (angular.isString(name)) {
        return this.$injector.get(name);
      } else {
        return this.$injector.invoke(name);
      }
    };

    return SessionStorageFactory;

  })();

  angular.module('angryjs.session').factory('SessionStorageFactory', [
    '$injector', function($injector) {
      return new SessionStorageFactory($injector);
    }
  ]);

}).call(this);
