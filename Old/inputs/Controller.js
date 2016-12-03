/**
 * public class Controller
 *
 * Controller is an abstract class that represents a controller.
 * It is in charge of adding all the necessary events and relaying them back to
 * the input manager.
 */

zen.inputs.Controller = function() {
	this._observer = new zen.util.Observer(this);
	this._attachEvents();
};

zen.extends(null, zen.inputs.Controller, {
	_observer : null,

	destroy : function() {},

	addListener : function(listener) {
		this._observer.addListener(listener);
	},

	isListener : function(listener) {
		return this._observer.isListener(listener);
	},

	removeListener : function(listener) {
		this._observer.removeListener(listener);
	},

	_fireEvent : function(event, data) {
		data.controller = this;
		this._observer.fireEvent(event, data);
	},

	_attachEvents : function() {
		throw new Error('zen.inputs.Controller._attachEvents is abstract.');
	}
});