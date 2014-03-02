var Backbone = require('backbone');
Backbone.$ = $; // loading jquery via cdnjs,but could do it via browserify too

var AutocompleteView = require('../index');

// https://gist.github.com/dazld/9305006
var countryList = require('./data.json');

var countries = new Backbone.Collection(countryList);

var acDemo = new AutocompleteView({
	collection: countries
});

acDemo.render();

document.getElementById('app').appendChild(acDemo.el);


