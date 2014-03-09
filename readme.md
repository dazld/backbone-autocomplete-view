[![NPM](https://nodei.co/npm/backbone-autocomplete.png?compact=true)](https://nodei.co/npm/backbone-autocomplete/)

[![Build Status](https://travis-ci.org/dazld/backbone-autocomplete-view.png?branch=master)](https://travis-ci.org/dazld/backbone-autocomplete-view)

# Backbone Autocomplete View

Backbone Autocomplete view made with browserify style projects in mind.

It's a very straight up nested view with a filtered collection.

# Usage

The view exposes a simple API. It's instanciated with a pre-existing collection, and when subclassing you are able to override some of its internal methods for your own logic.

## Instantiation

The view takes standard parameters, `collection` etc, and also an option `minimumInputLength` if you want to restrict searching until the input length is above a certain value. It defaults to zero (this might not be so great).

By default, the view uses a field called 'name' from the models in the collection for searching. If you want to set your own, you can pass it as `searchField` when instantiating.
 
## `onSelect(<model>)` 

Callback fired by the view when a user selects something by clicking on it, or by pressing enter after using the arrow keys

## `searchMethod(<model>)`

Method bound to the view instance, which is passed to `this.collection.filter(..)` as the method to determine if the model from the parent collection should be included in the results. The current value of the user input box is available on `this.searchValue`. Example below.


```javascript

var AutocompleteView = require('backbone-autocomplete');

// example in browserified code
var someNames = new Backbone.Collection([{
    person: 'Bob'
},{
    person: 'Barry'
},{
    person: 'Alfred'
},{
    person: 'James'
},{
    person: 'Sylvia'
},{
    person: 'Maureen'
},{
	person: 'Alice'
}])

var MyAutocomplete = AutocompleteView.extend({
    onSelect: function(model){
        console.log(model); 
    },
    searchMethod: function(model){ // method passed to filter(..) on the collection
        var label = model.get(this.searchField).toLowerCase();
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
    searchField: 'person', // setting the field to use as a search
    collection: someNames
});

nameCompletion.render();
document.body.appendChild(nameCompletion.el);

```

MIT Licence (c) Dan Peddle 2014 
