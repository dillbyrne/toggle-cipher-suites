var Panel = require("sdk/panel"),
    Data = require("./Data"),
    Tabs = require("./Tabs"),
    PrefServ = require("./PrefServ"),
    loaded = false,
    panel,
    cipher_suite_prefs = (require("sdk/preferences/service").keys("security.ssl3")).sort();


exports.init = function(){
  
    panel = Panel.Panel({
    width:360,
    height:360,
    contentURL: Data.get("html/options-panel.html"),
    contentStyleFile: Data.get("css/style.css"),
    contentScriptFile:[ 
    Data.get("js/get-options.js"),
    Data.get("js/optionspage.js")]
    });	

    panel.on("show",function(){
   
        //get the state of each preference
        var states = [];
        
        for (var i = 0; i < cipher_suite_prefs.length;i++){
            states[i] = PrefServ.getter(cipher_suite_prefs[i]);
        }
        
        if (loaded != true){
            //build the panel
            panel.port.emit("buildui",cipher_suite_prefs);
            loaded = true;
        }
    
        //set the panel to show the correct state
        panel.port.emit("show",states);
     });


    panel.port.on("change_made",function(value,index){
        PrefServ.setter(cipher_suite_prefs[index],value);
    });

    panel.port.on("click",function(value){
    	if (value == "Qualys")
			Tabs.openURL("https://www.ssllabs.com/ssltest/viewMyClient.html");
		else if (value == "HowsMy")
			Tabs.openURL("https://www.howsmyssl.com/");
    });
};



exports.get = function(){
  return panel;
};

exports.onUnload = function(reason){
    if (reason == "disable" || reason == "uninstall")
        PrefServ.resetCipherSuites(cipher_suite_prefs);
};



