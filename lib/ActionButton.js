var ui = require("sdk/ui"),
    Data = require("./Data"),
    panel = require("./Panel").get(),
    actionButton;


exports.init = function(){
  
    actionButton = ui.ActionButton({
     	id: "toggle-cipher-suites",
  		label:"Toggle Cipher Suites",
        icon:
		{ 
			"16":Data.get("images/icon16.png"),
			"32":Data.get("images/icon32.png"),
			"64":Data.get("images/icon64.png"),
        },
        onClick: function(state){
            panel.show({
				position: actionButton
      		});	
        }
    });
};
