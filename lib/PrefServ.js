var PrefServ = require("sdk/preferences/service");

exports.getter =function(preference){
	return PrefServ.get(preference);
};

exports.setter = function(preference,value){
	PrefServ.set(preference,value);
};

exports.resetter = function(preference){
	PrefServ.reset(preference);
};


exports.resetCipherSuites = function (cipher_suite_prefs){
	for (var i = 0; i <  cipher_suite_prefs.length; i++){
    	PrefServ.reset(cipher_suite_prefs[i]);
  	}
};