var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
var ResultsView = require('./results-view');

// Captured by the keyfilter to control search results
var keys = {
    9: 'enter',
    13: 'enter',
    38: 'up',
    40: 'down',
    27: 'escape'
};

var noop = function(){};

var MIN_INPUT_LENGTH = 3;

var AutocompleteView = Backbone.View.extend({
	tagName: 'div',
	className: 'bb-autocomplete',
	events: {
		'keyup .ac-user-input':'onKeyup',
		'blur .ac-user-input':'onBlur',
		'change .ac-user-input': 'onChange'
	},
	template: _.template('<input class="ac-user-input" type="text" /><div class="ac-results"></div>'),
	initialize: function initialize(options) {
		options = options || {};
		
		this.MIN_INPUT_LENGTH = options.minimumInputLength || MIN_INPUT_LENGTH;
		
		this.collection = options.collection; // data to search against
		this.resultsCollection = new Backbone.Collection(); // where to put results of search
		// method on data collection which gives us results
		// should return an array of JS objects representing the data
		this.shouldFetch = options.shouldFetch || false;


		this.resultsView = new ResultsView({
			parentView: this,
			collection: this.resultsCollection
		});

	},
	setupEvents: function setupEvents(){

	},
	onKeyup: function onKeydown(evt){
		var input = evt.target;
		// see if the user has pressed a key we are explicitly wanting to control 
		// the behaviour for
		if (keys[evt.keyCode]) {
			evt.preventDefault();
			switch (keys[evt.keyCode]){
				case 'enter':
					break;
				case 'escape':
					input.blur();
					break;
				default:
					this.resultsView.trigger(keys[evt.keyCode]);
					break;
			}
			return false;
		} 
	},
	onBlur: function onBlur(evt) {
		this.resultsView.trigger('hide');
	},
	onChange: function(evt){
		this.searchValue = evt.target.value;
	},
	
	doSearch: function(){
		var filteredResults = this.collection.filter(this.searchMethod);
		this.resultsCollection.reset(filteredResults);
	},
	render: function render (){
		this.$el.html(this.template());
		return this;
	},
	// overwritten when subclassing
	onSelect: noop // callback that receives the model that was chosen
	searchMethod: function searchMethod(item) {
		var label = item.get('label');
		if (label.indexOf(this.searchValue) !== -1) {
			return true;
		} else {
			return false;
		}
	}

});


module.exports = AutocompleteView;

