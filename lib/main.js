require("./Panel").init();
require("./ActionButton").init();

exports.onUnload = function (reason){
    require("./Panel").onUnload(reason);
};
