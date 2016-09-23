app.factory('HomeService', function($http) {
  return {
    getData: $http.get('../data.json').then(function(data) {
      return data.data
    }),
    quantNums: [1,2,3,4,5,6,7,8,9,10],
    getCategories: $http.get('../data.json').then(function(data) {
      var allCats = [];
      var catArr = data.data
        .map(function(shake) {
          return shake.categories;
        })
        .forEach(function(arr) {
          arr.forEach(function(cat) {
            if (allCats.indexOf(cat) < 0) {
              allCats.push(cat);
            }
          })
        })
        return allCats;
      })
  }
})

app.factory('BagService', function($http) {
  return {
    contents: [],
    total: 0.00,
    addContents: function(shakeObj) {
      shakeObj.showQuant = true;
      if (!shakeObj.quant) {
        shakeObj.quant = 1;
      }
      var namesInContents = this.contents.map(function(shake) {
        return shake.name;
      });
      existingIndex = namesInContents.indexOf(shakeObj.name);
      if (existingIndex < 0) {
        this.contents.push(shakeObj);
      } else {
        this.contents[existingIndex].quant = shakeObj.quant;
      }
    },
    numItems: function() {
      if (this.contents.length > 0) {
        return "(" + this.sumArray(this.contents.map(function(shakeObj) {
            return shakeObj.quant;
          })) + ")";
      } else {
        return "Empty!"
      }
    },
    subtotals: function() {
      return this.contents.map(function(shakeObj) {
        return shakeObj.price / 100 * shakeObj.quant;
      })
    },
    calcTotal: function() {
        this.total = this.sumArray(this.subtotals());
    },
    sumArray: function(arr) {
      if (arr.length > 0) {
        return arr.reduce(function(prev, curr) {
          return Number(prev) + Number(curr);
        })
      } else {
        return 0.00;
      }
    },
    toggleQuant: function(shake) {
      this.calcTotal();
      shake.showQuant = !shake.showQuant;
    },
    removeItem: function(shake) {
      shake.buttonTxt = null;
      this.contents = this.contents.filter(function(item) {
          return item._id !== shake._id;
      })
      this.calcTotal();
    }
  }
})
