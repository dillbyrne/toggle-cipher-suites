var widgets = require("sdk/widget");
var data = require("sdk/self").data;
var pref_serv = require("sdk/preferences/service");


//ssl3 cipher suites
var cipher_suite_prefs = [
  "security.ssl3.dhe_dss_aes_128_sha",
  "security.ssl3.dhe_dss_camellia_128_sha",
  "security.ssl3.dhe_rsa_aes_128_sha",
  "security.ssl3.dhe_rsa_camellia_128_sha",
  "security.ssl3.ecdh_ecdsa_aes_128_sha",
  "security.ssl3.ecdh_ecdsa_rc4_128_sha",
  "security.ssl3.ecdh_rsa_aes_128_sha",
  "security.ssl3.ecdh_rsa_rc4_128_sha",
  "security.ssl3.ecdhe_ecdsa_aes_128_sha",
  "security.ssl3.ecdhe_ecdsa_rc4_128_sha",
  "security.ssl3.ecdhe_rsa_aes_128_sha",
  "security.ssl3.ecdhe_rsa_rc4_128_sha",
  "security.ssl3.rsa_aes_128_sha",
  "security.ssl3.rsa_camellia_128_sha",
  "security.ssl3.rsa_rc4_128_md5",
  "security.ssl3.rsa_rc4_128_sha",
  "security.ssl3.dhe_dss_aes_256_sha",
  "security.ssl3.dhe_dss_camellia_256_sha",
  "security.ssl3.dhe_dss_des_ede3_sha",
  "security.ssl3.dhe_rsa_aes_256_sha",
  "security.ssl3.dhe_rsa_camellia_256_sha",
  "security.ssl3.dhe_rsa_des_ede3_sha",
  "security.ssl3.ecdh_ecdsa_aes_256_sha",
  "security.ssl3.ecdh_ecdsa_des_ede3_sha",
  "security.ssl3.ecdh_rsa_aes_256_sha",
  "security.ssl3.ecdh_rsa_des_ede3_sha",
  "security.ssl3.ecdhe_ecdsa_aes_256_sha",
  "security.ssl3.ecdhe_ecdsa_des_ede3_sha",
  "security.ssl3.ecdhe_rsa_aes_256_sha",
  "security.ssl3.ecdhe_rsa_des_ede3_sha",
  "security.ssl3.rsa_aes_256_sha",
  "security.ssl3.rsa_camellia_256_sha",
  "security.ssl3.rsa_des_ede3_sha",
  "security.ssl3.rsa_fips_des_ede3_sha"
];

var loaded = false;

var options_panel = require("sdk/panel").Panel({
  width:350,
  height:350,
  contentURL: data.url("html/options-panel.html"),
  contentScriptFile:[ 
    data.url("js/get-options.js"),
    data.url("js/optionspage.js")]
});

var widget = widgets.Widget({
  id: "toggle-cipher-suites",
  label:"Toggle Cipher Suites",
  panel: options_panel,
  contentURL: data.url("images/icon16.png")
});


options_panel.on("show",function(){
 
  //get the state of each preference
  var states = [];
  
  for (var i = 0; i < cipher_suite_prefs.length;i++){
    states[i] = pref_serv.get(cipher_suite_prefs[i]);
  }
  

  if (loaded != true){
    //build the panel
    options_panel.port.emit("buildui",cipher_suite_prefs);
    loaded = true;
  }
  
  //set the panel to show the correct state
  options_panel.port.emit("show",states);

});


options_panel.port.on("change_made",function(value,index){
  pref_serv.set(cipher_suite_prefs[index],value);

});



function resetCipherSuites(cipher_suite_prefs){
  for (var i = 0; i <  cipher_suite_prefs.length; i++){
    pref_serv.reset(cipher_suite_prefs[i]);
  }

}

exports.onUnload = function(reason){
  if (reason == "disable" || reason == "uninstall")
    resetCipherSuites(cipher_suite_prefs);
}


