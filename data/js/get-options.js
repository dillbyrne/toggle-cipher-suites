self.port.once("buildui",function(cipher_suites){

  var list = document.getElementById("list");
  
  for (var i = 0; i< cipher_suites.length; i++){  
    var listItem = document.createElement("li");
    var textNode = document.createTextNode(cipher_suites[i].slice(14));
    var select = document.createElement("select");
    var option1 = document.createElement("option");
    var option2 = document.createElement("option");

    select.setAttribute("id","select"+i);
    option1.appendChild(document.createTextNode("enabled"));
    option2.appendChild(document.createTextNode("disabled"));
    
    select.appendChild(option1);
    select.appendChild(option2);
    
    div = document.createElement("div");
    span = document.createElement("span");
    
    span.appendChild(textNode);
    div.appendChild(span);
    div.appendChild(select);
    listItem.appendChild(div);

    list.appendChild(listItem);
  }

});

self.port.on("show",function(states){

  for (var i = 0; i < states.length; i++){
    
    var cipher  = document.getElementById("select"+i);
    
  if (states[i] == true) 
      cipher.selectedIndex = 0;
    else
      cipher.selectedIndex = 1;
    
  }

});
