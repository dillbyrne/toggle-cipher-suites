document.body.addEventListener("change", function(e) {

    var state;

    if (e.target.selectedIndex == 1)
      state = false;
    else 
      state = true;

    self.port.emit("change_made",state,e.target.id.slice(6));    

},false);

document.body.addEventListener("click", function(e) {

	self.port.emit("click",e.target.id);    

},false);

