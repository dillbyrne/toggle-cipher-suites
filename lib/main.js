require("./Panel").init();
require("./Widget").init();

exports.onUnload = function (reason){
    require("./Panel").onUnload(reason);
};