var app = angular.module("shoppingApp", ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeController'
    })
    .when('/bag', {
      templateUrl: 'partials/bag.html',
      controller: 'BagController'
    })
})
