var EventEmitter = require('events').EventEmitter;
var util = require('util');
var async = require('async');

/**
* Constructor
*/
function SimpleTokenizer() {
    EventEmitter.apply(this);
	this.rules = []; //list of rules to check
    this.speed = 20; //Speed to iterete on async calls

	(function init(){ //Constructor initiliazaer

	})();
}

util.inherits(SimpleTokenizer, EventEmitter);

/**
* Add a new rule to check
* @param [RegExp] regex Rule to check
* @param [string] type Name of the rule
*/
SimpleTokenizer.prototype.addRule = function (regex, type) {
	if ( this.rules && util.isRegExp(regex) && typeof type == 'string' && type != "") {
		this.rules[this.rules.length] = {rx: regex, type: type};
	}
}

/**
* Parse async some text to check rules and get all tokens
*
* @event token When find a new token
* @event data Same like token event to use with streams
* @event end Fire when finish to check all text
*
* @param [string] text Text to check
* @param [!Function] callback Function to call when it finihs (function(tokenList) {} )
*/
SimpleTokenizer.prototype.parse = function(text, callback) {
    if(typeof text != 'string' || text == "") {this.emit('end', [])}
	if( callback == null ) {  calback = function(data) {} }
	var tokens = [];
	var txt = text;
    var inc = (this.speed && this.speed > -1) ? this.speed : 20;
    var first = -1;
    var tokenToAdd = null;
    scope = this;

    var foreachCallback = function(item) {
        var aa = txt.match(item.rx);
        if ( aa != null ) {
            var res = aa['index'];
            if (first == -1 || (res > -1 && res < first)) {
                first = res;
                tokenToAdd = {token: aa[0], type: item.type}
            }
        }
    }

	async.whilst(
		function() { return txt.length > 0; },
		function (callbackChecker) {
            first = -1;
            tokenToAdd = null;

            scope.rules.forEach(foreachCallback);

            if (first > -1 && tokenToAdd && tokenToAdd.token && tokenToAdd.token.length > 0) {
                txt = txt.substring(first + tokenToAdd.token.length);
                tokens.push(tokenToAdd);
                scope.emit('data', tokenToAdd); // for streams
                scope.emit('token', tokenToAdd);
            } else { //si no encontro ningun token entonces termine
                txt = "";
            }
			setTimeout(callbackChecker, inc);
		},
		function(err) {
            scope.emit('end', tokens);
			callback(tokens);
		}
		)

}

/**
* Parse async some text to check rules and get all tokens
*
* @param [string] text Text to check
*
* @return [Array] Listo of tokens founded
*/
SimpleTokenizer.prototype.parseSync = function(text) {
	var tokens = [];
	var first = -1;
	var txt = text;
	var tokenToAdd = null;

	var foreachCallback = function(item) {
		var aa = txt.match(item.rx);
		if ( aa != null ) {
			var res = aa['index'];
			if (first == -1 || (res > -1 && res < first)) {
				first = res;
				tokenToAdd = {token: aa[0], type: item.type};
			}
		}
	}

	while(txt.length > 0) {
		first = -1;
		tokenToAdd = "";

		this.rules.forEach(foreachCallback);

		if (first > -1 && tokenToAdd != null && tokenToAdd.token != null && tokenToAdd.token.length > 0) {
			txt = txt.substring(first + tokenToAdd.token.length);
			tokens.push(tokenToAdd);
		} else { //si no encontro ningun token entonces termine
			txt = "";
		}
	}

	return tokens;
}


if(typeof module == 'object') {
   exports = module.exports = SimpleTokenizer;
}
