app.filter('decimal', function () {
  return function (price) {
    return price / 100;
  };
});

app.filter('inStock', function() {
  return function(input) {
    return (input) ? 'Yes' : 'No';
  }
})
