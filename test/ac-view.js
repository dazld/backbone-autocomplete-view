// somewhat hacky tests

var AutocompleteView = require('../index');
var acProto = AutocompleteView.prototype;

var test = require('tap').test;

test('AC View has an onSelect function', function (t) {
	t.equal(typeof AutocompleteView.prototype.onSelect, 'function');
	t.end();
});

test('AC View has a searchMethod function', function (t) {
	t.equal(typeof AutocompleteView.prototype.searchMethod, 'function');
	t.end();
});