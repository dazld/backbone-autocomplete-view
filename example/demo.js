var Backbone = require('backbone');
Backbone.$ = $; // loading jquery via cdnjs,but could do it via browserify too

var AutocompleteView = require('../index');

var DemoAutocomp = AutocompleteView.extend({
	onSelect: function(model){
		this.$('input').blur();
		this.selectedModel = model;
		console.log(model);
	}
});

// https://gist.github.com/dazld/9305006
var countryList = require('./data.json');

var countries = new Backbone.Collection(countryList);

var acDemo = new DemoAutocomp({
	collection: countries,
	minimumInputLength: 1
});

acDemo.render();

document.getElementById('app').appendChild(acDemo.el);

var someNames = new Backbone.Collection([{
    name: 'Bob'
},{
    name: 'Harry'
},{
    name: 'Alfred'
},{
    name: 'James'
},{
    name: 'Sylvia'
},{
    name: 'Maureen'
}])

var MyAutocomplete = AutocompleteView.extend({
    onSelect: function(model){
        console.log(model); 
    },
    searchMethod: function(model){ // method passed to filter(..) on the collection
        var label = model.get('name').toLowerCase();
        // the method is bound to the view, with current value of the user input available as `this.searchValue`
        var searchValue = this.searchValue.toLowerCase().trim(); 

        if (label.indexOf(searchValue) !== -1) {
            return true;
        } else {
            return false;
        }
    }
});

var nameCompletion = new MyAutocomplete({
    collection: someNames
});

nameCompletion.render();
// document.body.appendChild(nameCompletion.el);


