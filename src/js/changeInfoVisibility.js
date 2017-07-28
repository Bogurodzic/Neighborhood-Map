const $ = require("jquery");
let showIcon = document.getElementById("show");
let infoPanel = document.getElementById("info");
let map = document.getElementById("map");

showIcon.addEventListener("click", function(){
  $(infoPanel).toggleClass("info--visible");
  $(map).toggleClass("map--full");
  google.maps.event.trigger(map,'resize');
});
