var widget = require("sdk/widget"),
    Data = require("./Data"),
    Panel = require("./Panel"),
    widgetObj;


exports.init = function(){
  
    widgetObj = widget.Widget({
     	id: "toggle-cipher-suites",
  		label:"Toggle Cipher Suites",
        panel: Panel.get(),
        contentURL: Data.get("images/icon16.png")
    });
};