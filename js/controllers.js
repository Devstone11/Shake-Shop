app.controller('HomeController', function($scope, HomeService, BagService) {
  $scope.obj = {};
  $scope.obj.contents = BagService.numItems();
  $scope.obj.getData = HomeService.getData.then(function(data) {
    $scope.obj.data = data;
  });
  $scope.obj.quantNums = HomeService.quantNums;
  $scope.obj.addToBag = function(shakeObj) {
    BagService.addContents(shakeObj);
    $scope.obj.contents = BagService.numItems();
    console.log($scope.obj.contents);
    shakeObj.buttonTxt = "Update Quantity"
  };
  $scope.obj.getCategories = HomeService.getCategories.then(function(categories) {
    $scope.obj.categories = categories;
  });
})

app.controller('BagController', function($scope, BagService) {
  BagService.calcTotal();
  $scope.bag = {};
  $scope.bag.total = BagService.total;
  $scope.bag.contents = BagService.contents;
  $scope.bag.toggleQuant = function(shake) {
    BagService.toggleQuant(shake);
    $scope.bag.total = BagService.total;
  };
  $scope.bag.removeItem = function(shake) {
    BagService.removeItem(shake);
    $scope.bag.contents = BagService.contents;
    $scope.bag.total = BagService.total;
  }
})
