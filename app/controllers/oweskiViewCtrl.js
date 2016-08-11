"use strict";

app.controller("oweskiViewCtrl", function($scope, $route, AuthFactory, UsersFactory, OweskiFactory){    // injecting the scope here...
  $scope.registerMode = true;                                 // ...from loginRegister.html

  $scope.userID = AuthFactory.getUser();                      // sets userID with getUser() in the AuthFactory

  $scope.oweskis = [];                                        // sets an empty array to be added to below
  $scope.oweski = {};                                         // sets an empty array to be added to below
  $scope.oweski.tags = "";                                    // line 9 & 10 are for new oweskis


  UsersFactory.getUsers()                                     // gets list of existing users from UsersFactory
  .then(function(result){                                     // then...
    console.log("list of users",result);                      // ...console logs results, and...
    let userArr = [];                                         // ...creates an empty array to be filled with the ...
    angular.forEach(result, (v, i) => {                       // ...results using "value" and key to...
      userArr.push(v);                                        // ...push user emails into the array
    });
    console.log("List of users", userArr);                    // conlogs our userArr
    $scope.listOfUsers = userArr;                             // sets the userArr to our scoped "listOfUsers"
  });

  OweskiFactory.getOweski(AuthFactory.getUserEmail(), 1)
  .then(function(results){
    console.log("qwerty", results);
    results.forEach(function(result){
      $scope.oweskis.push(result);
    })
    OweskiFactory.getOweski(AuthFactory.getUserEmail(), 2)    //reverse count here - throw $scope.  / display user 1 here (user 2 above)
    .then(function(results){
      console.log("asdf", results);
      results.forEach(function(result){
        $scope.oweskis.push(result);
      })
    });
  });


  $scope.addOweski = function(oweskiToUpdate){                              // instantiate "addOweski" function to the scope
    let oweski = oweskiToUpdate;
    oweski.user1 = oweskiToUpdate.user1;                // adds user1
    oweski.user2 = oweskiToUpdate.user2;                       // adds user2
                                            // sets up count (which is relative to user1, and inversely to user2)
    if (oweski.user1 === AuthFactory.getUserEmail){
     oweski.count = oweskiToUpdate.count +1; 
    } else {
    oweski.count = oweskiToUpdate.count -1;
    }
    
    oweski.tags = oweski.tags;              // adds tags separated by " " (spaces)
    console.log("asdf", oweski);
  };


  $scope.addOweski = function(){                              // instantiate "addOweski" function to the scope
    let oweski = {};                                          // create new empty object to be appended below
    oweski.user1 = AuthFactory.getUserEmail();                // adds user1
    oweski.user2 = $scope.oweski.user2;                       // adds user2
    oweski.count = 1;                                         // sets up count (which is relative to user1, and inversely to user2)
    oweski.tags = $scope.oweski.tags.split(" ");              // adds tags separated by " " (spaces)
    console.log("asdf", oweski);
    
    OweskiFactory.postOweski(oweski)                          // sends above oweski to Firebase using postOweski in QweskiFactory
    .then(function(result){console.log("The +1 Oweski Posted", result);         // conlog results of postOweski
    Materialize.toast("+1 Oweski for me with " + oweski.user2, 5000, "green");  // Materialize TOAST message confirming +1 Oweski
    });
  };


  $scope.minusOweski = function(){
    let oweski = {};
    oweski.user1 = AuthFactory.getUserEmail();
    oweski.user2 = $scope.oweski.user2;
    oweski.count = -1;                                        // sets up count (which is relative to user1, and inversely to user2)
    oweski.tags = $scope.oweski.tags.split(" ");
    
    OweskiFactory.postOweski(oweski)
    .then(function(result){console.log("The -1 Oweski Posted", result);
    Materialize.toast("-1 Oweski for me with " + oweski.user2, 5000, "red");    // Materialize TOAST message confirming -1 Oweski
    });
  };


  $scope.randOweski = function(){
    let oweski = {};
    oweski.user1 = AuthFactory.getUserEmail();
    oweski.user2 = $scope.oweski.user2;
    oweski.count = Math.round(Math.random()) === 0 ? -1 : 1;   // if 0 then = -1, otherwise 1 ~ sets up count (which is relative to user1, and inversely to user2)
    oweski.tags = $scope.oweski.tags.split(" ");

    OweskiFactory.postOweski(oweski)
    .then(function(result){console.log("RandOweski Posted", result);
    Materialize.toast(oweski.count + " Rand-Oweski for me with " + oweski.user2, 5000, "orange");   // Materialize TOAST message  confirming ? Rand-Oweski
    });
  };

});

