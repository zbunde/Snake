
/// only call our draw function when the canvas is loaded and has context!
document.addEventListener("DOMContentLoaded", function() {
  drawBorder();
});
//

//// Step 1: Drawing a Border
function drawBorder(){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
    context.strokeStyle = '#E28D05'
    context.strokeRect(0,0, canvas.width, canvas.height);
}
