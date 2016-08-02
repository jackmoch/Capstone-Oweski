"use strict";

app.controller("loginRegisterCtrl", function($scope, $route, AuthFactory){      // injecting the scope here
  $scope.registerMode = true;                                           // from loginRegister.html

  $scope.activateRegisterMode = function(){   // REGISTER is set to the "on state" depending on which button user clicks
    $scope.registerMode = true;               // IF ng-show="registerMode" is TRUE, show Registration Form html
  };
  $scope.activateLoginMode = function(){      // LOGIN is set to the "on state" depending on which button user clicks
    $scope.registerMode = false;              // IF ng-show="!registerMode" is TRUE (false :P), show Login Form html
  };
  $scope.onRegisterClick = function(){        // Registers NEW user with their email and password input from loginRegister.html
    AuthFactory.createUser($scope.regEmail, $scope.regPassword);    //captures email and password using ng-model="regEmail" / "...Password"
  };
  $scope.onLoginClick = function(){           // Logs in EXISTING user with their email and password input from loginRegister.html
    AuthFactory.loginUser($scope.loginEmail, $scope.loginPassword);    //captures email and password using ng-model="loginEmail" / "...Password"
  };
});
