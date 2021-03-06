/*
 *    Copyright 2015 Fondazione Bruno Kessler - Trento RISE
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

app.factory('gamesFactory',
  function ($rootScope, $http, $q, $timeout) {
    // Games data operations factory

    // Get games
    var getGames = function () {
      var deferred = $q.defer();

      // If games haven't been already loaded
      if (!$rootScope.games || $rootScope.games.length === 0) {
        // Load games
        $http.get('../console/game').success(function (data) {
          $rootScope.games = data;
          deferred.resolve();
        }).error(function () {
          deferred.reject();
        });
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    };

    // Get game by ID
    var getGameById = function (id) {
      var deferred = $q.defer();

      var game = {};

      // Load games
      getGames().then(function () {
        var found = false;
        angular.forEach($rootScope.games, function (g) {
          if (!found && g.id == id) {
            game = g;
            found = true;
          }
        });

        // If i've found the requested game
        if (!!game) {
          deferred.resolve(game);
        } else {
          deferred.reject();
        }
      }, function () {
        deferred.reject();
      });

      return deferred.promise;
    };

    
    // Get game by name
    var getGameByName = function (name) {
      var found = false;
      angular.forEach($rootScope.games, function (g) {
        if (!found && g.name === name) {
          found = true;
        }
      });
      return found;
    };

    // Get an instance (points / basdges_collection / leaderboard) by its ID
    var getInstanceById = function (gameId, instanceType, instanceId) {
      var deferred = $q.defer();

      var inst = {};

      // Load game
      getGameById(gameId).then(function (game) {
        var found = false;
        if(game.concepts) {
        angular.forEach(game.concepts, function (i) {
          if (!found && i.id == instanceId) {
            inst = i;
            found = true;
          }
        });
        }
        // If i've found the requested instance
        if (!!inst) {
          deferred.resolve({
            'game': game,
            'inst': inst
          });
        } else {
          deferred.reject();
        }

      }, function () {
        deferred.reject();
      });

      return deferred.promise;
    };

    // Boolean. Returns whether exists or not an instance by its name
    var existsInstanceByName = function (game, instanceName, instanceType) {
      var found = false;
      var a = [];
      if(instanceType === 'points') {
    		  a = game.pointConcept;
      }
      
      if(instanceType === 'badge_collections') {
    		  a = game.badgeCollectionConcept;
      }
      angular.forEach(a, function (i) {
        if (!found && i.name === instanceName) {
          found = true;
        }
      });
      return found;
    };

    // Get an instance (points / basdges_collection / leaderboard) by its name
    var getInstanceByName = function (game, instanceName, instanceType) {
      var found = false;
      var obj = {};
      if(game.concepts) {
      angular.forEach(game.concepts, function (i) {
        if (!found && i.name === instanceName) {
          found = true;
          obj = i;
        }
      });
      return obj;
    }
    };

    
    var getPoints = function(gameId) {
    	var deferred = $q.defer();
    
    	$http.get('../console/game/'+gameId+"/point").
    	success(function(data, status, headers, config) {
    		deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
        	deferred.reject();
        });
        
        return deferred.promise;
    }
    
    var addPoint = function(game,pc) {
    	$http.post('../console/game/'+game.id+"/point", pc).
    	success(function(data, status, headers, config) {
    		
        }).
        error(function(data, status, headers, config) {
        });
    };
    
    var getBadges = function(gameId) {
    	var deferred = $q.defer();
    
    	$http.get(' ../console/game/'+gameId+"/badgecoll").
    	success(function(data, status, headers, config) {
    		deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
        	deferred.reject();
        });
        
        return deferred.promise;
    }
    
    var addBadge = function(game,badge) {
    	$http.post(' ../console/game/'+game.id+"/badgecoll", badge).
    	success(function(data, status, headers, config) {
    		
        }).
        error(function(data, status, headers, config) {
        	
        });
    };
    
    var addTask = function(game,task) {
    	// ^\s*($|#|\w+\s*=|(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?(?:,(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?)*)\s+(\?|\*|(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?(?:,(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?)*)\s+(\?|\*|(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\?|\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\s+(\?|\*|(?:[0-6])(?:(?:-|\/|\,|#)(?:[0-6]))?(?:L)?(?:,(?:[0-6])(?:(?:-|\/|\,|#)(?:[0-6]))?(?:L)?)*|\?|\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\s)+(\?|\*|(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?(?:,(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?)*))$
    	// reg exp for cron validation
    	var deferred = $q.defer();
    	$http.post(' ../console/game/'+game.id+"/task", task).
    	success(function(data, status, headers, config) {
    		deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
        	deferred.reject('msg_task_error');
        });
    	
    	return deferred.promise;
    }
    
    var editTask = function(game,task) {
    	// ^\s*($|#|\w+\s*=|(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?(?:,(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?)*)\s+(\?|\*|(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?(?:,(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?)*)\s+(\?|\*|(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\?|\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\s+(\?|\*|(?:[0-6])(?:(?:-|\/|\,|#)(?:[0-6]))?(?:L)?(?:,(?:[0-6])(?:(?:-|\/|\,|#)(?:[0-6]))?(?:L)?)*|\?|\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\s)+(\?|\*|(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?(?:,(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?)*))$
    	// reg exp for cron validation
    	var deferred = $q.defer();
    	$http.put(' ../console/game/'+game.id+"/task", task).
    	success(function(data, status, headers, config) {
    		deferred.resolve();
        }).
        error(function(data, status, headers, config) {
        	deferred.reject('msg_task_error');
        });
    	
    	return deferred.promise;
    }
    
    var deleteTask = function(game,task) {
    	var deferred = $q.defer();
    	$http.post(' ../console/game/'+game.id+"/task/del", task).
    	success(function(data, status, headers, config) {
    		deferred.resolve();
        }).
        error(function(data, status, headers, config) {
        	deferred.reject('msg_task_error');
        });
    	
    	return deferred.promise;
    }
    
    var saveGame = function(game) {
    	var deferred = $q.defer();
    	
    	$http.post(' ../console/game', game).
    	success(function(data, status, headers, config) {
    		deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
        	deferred.resolve('msg_generic_error');
        });
    	
    	 return deferred.promise;
    };
    
    // Add or edit game
    var editGame = function (game,fields) {
      var deferred = $q.defer();

      if (! fields.name) {
        deferred.reject('msg_game_name_error');
      } else if(!! getGameByName(fields.name) && game.name !== fields.name) {
    	  deferred.reject('msg_game_name_exists_error');
      	} else {
      		if(! game.id) {
      			game = {};
      		}
      		 game.name = fields.name;
             game.expiration = fields.expiration;
             
             $http.post(' ../console/game', game).
             success(function(data, status, headers, config) {
             	 if(!	game.id) { 
             		 $rootScope.games.push(data);
             	 }
                   deferred.resolve(data);
             }).
             error(function(data, status, headers, config) {
             	 deferred.reject('msg_generic_error');
             });
      	}
      return deferred.promise;
    };

    // Add or edit instance
    var editInstance = function (game, instance, instanceType, instanceProperties) {
      var deferred = $q.defer();

      if (!instanceProperties.name) {
        deferred.reject('msg_instance_name_error');
      } else if (instance.id == null) {
        // New instance
        if (!!existsInstanceByName(game, instanceProperties.name, instanceType)) {
          // Instance with same name alredy exists
          deferred.reject('msg_instance_name_exists_error');
        } else {
          // Create new instance
          var id = 1;
          angular.forEach(game.concepts, function (i) {
            if (i.id > id) {
              id = i.id;
            }
            id++;
          });

          var url = '';
         
          instance = {
        		  'id': id,
          		  'name': instanceProperties.name
          };
          // Choose instance object structure
          if (instanceType == 'points') {
        	  game.pointConcept.push(instance);
          } else if (instanceType == 'badges_collections') {
        	  game.badgeCollectionConcept.push(instance);
          }
          
          $http.post(' ../console/game', game).success(function(data, status, headers, config) {
        	  deferred.resolve(data);
          }).error(function(data, status, headers, config){
        	  deferred.reject('msg_instance_name_error');
          });
        }
      } else if (!!existsInstanceByName(game, instanceProperties.name, instanceType) && instance.name != instanceProperties.name) {
        // Instance with same name alredy exists
        deferred.reject('msg_instance_name_exists_error');
      } else {
        // Edit instance

        // Choose other instance properties to be modified
        if (instanceType == 'points') {
          if (instance.name == instanceProperties.name && instance.typology == instanceProperties.typology) {
            deferred.reject('msg_instance_unchanged_error');
          }

          instance.name = instanceProperties.name;
          instance.typology = instanceProperties.typology;
        } else if (instanceType == 'badges_cellections') {
          if (instance.name == instanceProperties.name) {
            deferred.reject('msg_instance_unchanged_error');
          }

          instance.name = instanceProperties.name;
        } else {
          // instanceType = 'leaderboards'
          if (instance.name == instanceProperties.name && instance.points_dependency == instanceProperties.points_dependency && instance.update_rate == instanceProperties.update_rate) {
            deferred.reject('msg_instance_unchanged_error');
          }

          instance.name = instanceProperties.name;
          instance.points_dependency = instanceProperties.points_dependency;
          instance.update_rate = instanceProperties.update_rate;
        }

        deferred.resolve();
      }

      return deferred.promise;
    };

    // Delete game
    var deleteGame = function (game) {
      var deferred = $q.defer();

      $http.delete(' ../console/game/'+game.id).success(function(data, status, headers, config) {
    	  angular.forEach($rootScope.games, function (g, index) {
    	        if (g.id == game.id) {
    	          $rootScope.games.splice(index, 1);
    	          deferred.resolve();
    	        }
    	      });	  
      }).error(function(data, status, headers, config) {
    	  deferred.reject('msg_delete_error');
      });

      return deferred.promise;
    };

    // Delete instance
    var deleteInstance = function (game, instance, instanceType) {
      var deferred = $q.defer();

      angular.forEach(game.concepts[instanceType], function (i, index) {
        if (i.id == instance.id) {
          game.concepts[instanceType].splice(index, 1);
          deferred.resolve();
        }
      });

      return deferred.promise;
    };

    var addRule = function (game, rule) {
    	var deferred = $q.defer();
    	
    	$http.post(' ../console/game/'+game.id+"/rule/db", rule).success(function(data, status, headers, config) {
      	  deferred.resolve(data);
        }).error(function(data, status, headers, config){
      	  deferred.reject('msg_instance_name_error');
        });
    	return deferred.promise;
    }
    
    var deleteRule = function (game, ruleId) {
    	var deferred = $q.defer();
    	var rule = {};
    	ruleId = ruleId.slice(ruleId.indexOf("://") + 3);
    	$http.delete(' ../console/game/'+game.id+"/rule/db/"+ruleId).success(function(data, status, headers, config) {
      	  deferred.resolve(data);
        }).error(function(data, status, headers, config){
      	  deferred.reject('msg_delete_error');
        });
    	return deferred.promise;
    }
    
    var validateRule = function(ruleContent) {
    	var deferred = $q.defer();
    	$http.post(' ../console/rule/validate', ruleContent).success(function(data, status, headers, config) {
        	  deferred.resolve(data);
          }).error(function(data, status, headers, config){
        	  deferred.reject('msg_generic_error');
          });
      	return deferred.promise;
    }
    
    var getRule = function(game,ruleId) {
    	var deferred = $q.defer();
    	ruleId = ruleId.slice(ruleId.indexOf("://") + 3);
    	$http.get(' ../console/game/'+game.id+"/rule/db/"+ruleId).success(function(data, status, headers, config) {
        	  deferred.resolve(data);
          }).error(function(data, status, headers, config){
        	  deferred.reject('msg_rule_error');
          });
      	return deferred.promise;
    }
    
    var getPlayersState = function(gameId,playerFilter,pageRequest, pageSize) {
    	var deferred = $q.defer();
    	$http.get('../gengine/state/'+gameId, {params: {page:pageRequest, size: pageSize, playerFilter: playerFilter}}).success(function(data, status, headers, config) {
      	  deferred.resolve(data);
        }).error(function(data, status, headers, config){
      	  deferred.reject('msg_generic_error');
        });
    	
    	return deferred.promise;
    }

    return {
      'getGames': getGames,
      'getGameById': getGameById,
      'getInstanceById': getInstanceById,
      'editGame': editGame,
      'editInstance': editInstance,
      'deleteGame': deleteGame,
      'deleteInstance': deleteInstance,
      'saveGame' : saveGame,
      'addPoint' : addPoint,
      'addBadge' : addBadge,
      'getPoints' : getPoints,
      'getBadges' : getBadges,
      'addRule' : addRule,
      'deleteRule' : deleteRule,
      'getRule' : getRule,
      'addTask' : addTask,
      'deleteTask' : deleteTask,
      'editTask' : editTask,
      'validateRule' : validateRule,
      'getPlayersState' : getPlayersState,
    };
  }
);

app.factory('utilsFactory',
  function () {
    // Utils factory

    // Count active instances
    var countActive = function (game, type) {
      var count = 0;
      if (!!game && !!game.concepts && !!game.concepts[type]) {
        angular.forEach(game.concepts[type], function (value) {
          if (value.is_active) {
            count++;
          }
        });
      }
      return count;
    };

    // Get given instances lenght
    var getLength = function (game, type) {
      var len = 0;
      if (!!game) {
    	  if(type === 'points') {
    		  len = game.pointConcept.length;
    	  }
    	  if(type === 'badges_collections') {
    		  len = game.badgeCollectionConcept.length;
    	  }
    	  
      }
      return len;
    };

    return {
      'getLength': getLength,
      'countActive': countActive
    };
  }
);
