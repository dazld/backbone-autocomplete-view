# Backboney Autocomplete View

Backboney Autocomplete view made with browserify style projects in mind.

It's a very straight up nested view with a filtered collection.

# Usage

The view exposes a simple API. It's instanciated with a pre-existing collection, and when subclassing you are able to override some of its internal methods for your own logic.

## `onSelect(<model>)` 

Callback fired by the view when a user selects something by clicking on it, or by pressing enter after using the arrow keys

## `searchMethod(<model>)`

Method bound to the view instance, which is passed to `this.collection.filter(..)` as the method to determine if the model from the parent collection should be included in the results. The current value of the user input box is available on `this.searchValue`. Example below.


```javascript

// example in browserified code

var someNames = new Backbone.Collection([{
	name: 'Bob'
},{
	name: 'Harry'
}{
	name: 'Alfred'
}{
	name: 'James'
}{
	name: 'Sylvia'
}{
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

var nameCompletion = new MyAutoComplete({
	collection: someNames
});

nameCompletion.render();
document.body.appendChild(nameCompletion.el);


```

MIT Licence (c) Dan Peddle 2014 