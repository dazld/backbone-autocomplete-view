var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');

var ItemView = Backbone.View.extend({
	tagName: 'div',
	className: 'ac-result',
	template: _.template('<%= name %>'),
	events: {
		'touchstart': 'onSelect', // has to be mousedown or touchstart, so we can prevent blur
		'mousedown': 'onSelect',
		'mouseenter': 'onHover'
	},
	initialize: function(options) {
		this.parentView = options.parentView;
		this.searchField = options.searchField;
	},
	onHover: function() {
		this.parentView.trigger('highlight', this.model);
	},
	onSelect: function(evt) {
		evt.preventDefault(); // prevent blur on input, we'll hide results on parent
		this.parentView.trigger('chosen', this.model);
	},
	render: function() {
		var data = this.model.toJSON();

		var html = this.template({
			name: data[this.searchField]
		});
		this.$el.html(html);
	}
});

module.exports = ItemView;