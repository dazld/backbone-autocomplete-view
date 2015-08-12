var Backbone = require('backbone');
var _ = require('underscore');
var ResultsView = require('./results-view');

// Captured by the keyfilter to control search results
var keys = {
	9: 'tab',
	13: 'enter',
	38: 'up',
	40: 'down',
	27: 'escape'
};

var noop = function() {};

var MIN_INPUT_LENGTH = 0;

var AutocompleteView = Backbone.View.extend({
	tagName: 'div',
	className: 'bb-autocomplete',
	events: {
		'keydown .ac-user-input': 'onKeydown',
		'blur .ac-user-input': 'onBlur'
	},
	template: _.template('<input class="ac-user-input" type="text" /><div class="ac-results"></div>'),
	initialize: function initialize(options) {
		Backbone.View.prototype.initialize.apply(this,arguments);
		options = options || {};
		this.searchField = options.searchField || 'name';
		this.MIN_INPUT_LENGTH = options.minimumInputLength || MIN_INPUT_LENGTH;

		this.collection = options.collection; // data to search against
		this.resultsCollection = new Backbone.Collection(); // where to put results of search

		this.searchMethod = _.bind(this.searchMethod, this);

		this.resultsView = new ResultsView({
			searchField: this.searchField,
			parentView: this,
			collection: this.resultsCollection
		});
		this.on('chosen', this._preOnSelect, this);
		this.on('highlight', this.onHighlight, this);

	},
	onKeydown: function onKeydown(evt) {
		var input = evt.target;
		// see if the user has pressed a key we are explicitly wanting to control
		// the behaviour for
		if (keys[evt.keyCode]) {
			evt.preventDefault();
			evt.stopPropagation();
			switch (keys[evt.keyCode]) {
				case 'enter':
					if (this.selectedModel) {
						this._preOnSelect(this.selectedModel);
					}
					break;
				case 'escape':
					input.blur();
					break;
				case 'tab':
					input.blur();
					break;
				default:
					this.resultsView.trigger(keys[evt.keyCode]);
					break;
			}
			return false;
		} else {
			setTimeout(function() {
				this.setSearchValue(evt.target.value);
				this.doSearch();
			}.bind(this));

		}
	},
	_preOnSelect: function(model) {
		this.$('input').blur();
		this.selectedModel = model;
		this.onSelect(model);
	},
	onBlur: function onBlur(evt) {
		this.resultsView.trigger('hide');
	},
	onHighlight: function(model) {
		this.selectedModel = model;
		var value = model.get(this.searchField);
		this.setSearchValue(value);
		this.$('input').val(value);

	},
	setSearchValue: function(value) {
		this.searchValue = value;
	},
	shouldSearch: function(){
		return this.searchValue.length > this.MIN_INPUT_LENGTH;
	},
	doSearch: function() {
		if (!this.shouldSearch()) {
			return;
		}

		this.selectedModel = null;
		var filteredResults = this.collection.filter(this.searchMethod);
		this.resultsCollection.reset(filteredResults);
		this.resultsView.trigger('show');
	},
	render: function render() {
		this.$el.html(this.template());
		this.resultsView.setElement(this.$('.ac-results'));
		return this;
	},
	// overwritten when subclassing
	// callback that receives the model that was chosen
	onSelect: function(){
		// for subclassing
	},
	// function used by .filter() to determine if the item should be included in results
	searchMethod: function searchMethod(item) {
		var label = item.get(this.searchField).toLowerCase();

		if (label.indexOf(this.searchValue.toLowerCase().trim()) !== -1) {
			return true;
		} else {
			return false;
		}
	}

});


module.exports = AutocompleteView;
