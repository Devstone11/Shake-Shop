app.factory('HomeService', function($http) {
  return {
    test: "hello from the factory",
    getData: $http.get('../data.json').then(function(data) {
      return data.data
    }),
    quantNums: [1,2,3,4,5,6,7,8,9,10],
    getCategories: $http.get('../data.json').then(function(data) {
      var allCats = [];
      var catArr = data.data
        .map(function(tea) {
          return tea.categories;
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
    addContents: function(teaObj) {
      teaObj.showQuant = true;
      if (!teaObj.quant) {
        teaObj.quant = 1;
      }
      var namesInContents = this.contents.map(function(tea) {
        return tea.name;
      });
      existingIndex = namesInContents.indexOf(teaObj.name);
      if (existingIndex < 0) {
        this.contents.push(teaObj);
      } else {
        this.contents[existingIndex].quant = teaObj.quant;
      }
    },
    numItems: function() {
      if (this.contents.length > 0) {
        return "(" + this.sumArray(this.contents.map(function(teaObj) {
            return teaObj.quant;
          })) + ")";
      } else {
        return "Empty!"
      }
    },
    subtotals: function() {
      return this.contents.map(function(teaObj) {
        return teaObj.price / 100 * teaObj.quant;
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
    toggleQuant: function(tea) {
      this.calcTotal();
      tea.showQuant = !tea.showQuant;
    },
    removeItem: function(tea) {
      tea.buttonTxt = null;
      this.contents = this.contents.filter(function(item) {
          return item._id !== tea._id;
      })
      this.calcTotal();
    }
  }
})
