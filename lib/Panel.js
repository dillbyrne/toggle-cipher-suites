var Panel = require("sdk/panel"),
    Data = require("./Data"),
    PrefServ = require("./PrefServ"),
    loaded = false,
    panel,
    cipher_suite_prefs = [
        "security.ssl3.dhe_dss_aes_128_sha",
        "security.ssl3.dhe_dss_aes_256_sha",
        "security.ssl3.dhe_dss_camellia_128_sha",
        "security.ssl3.dhe_dss_camellia_256_sha",
        "security.ssl3.dhe_rsa_aes_128_sha",
        "security.ssl3.dhe_rsa_aes_256_sha",
        "security.ssl3.dhe_rsa_camellia_128_sha",
        "security.ssl3.dhe_rsa_camellia_256_sha",
        "security.ssl3.dhe_rsa_des_ede3_sha",
        "security.ssl3.ecdhe_ecdsa_aes_128_gcm_sha256",
        "security.ssl3.ecdhe_ecdsa_aes_128_sha",
        "security.ssl3.ecdhe_ecdsa_aes_256_sha",
        "security.ssl3.ecdhe_ecdsa_rc4_128_sha",
        "security.ssl3.ecdhe_rsa_aes_128_gcm_sha256",
        "security.ssl3.ecdhe_rsa_aes_128_sha",
        "security.ssl3.ecdhe_rsa_aes_256_sha",
        "security.ssl3.ecdhe_rsa_des_ede3_sha",
        "security.ssl3.ecdhe_rsa_rc4_128_sha",
        "security.ssl3.rsa_aes_128_sha",
        "security.ssl3.rsa_aes_256_sha",
        "security.ssl3.rsa_camellia_128_sha",
        "security.ssl3.rsa_camellia_256_sha",
        "security.ssl3.rsa_des_ede3_sha",
        "security.ssl3.rsa_fips_des_ede3_sha",
        "security.ssl3.rsa_rc4_128_md5",
        "security.ssl3.rsa_rc4_128_sha",
        "security.ssl3.rsa_seed_sha"
    ];


exports.init = function(){
  
    panel = Panel.Panel({
    width:350,
    height:350,
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
};



exports.get = function(){
  return panel;
};

exports.onUnload = function(reason){
    if (reason == "disable" || reason == "uninstall")
        PrefServ.resetCipherSuites(cipher_suite_prefs);
};



