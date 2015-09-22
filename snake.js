
/// only call our draw function when the canvas is loaded and has context!
document.addEventListener("DOMContentLoaded", function() {
  Game()
  });

//// Step 1: Drawing a Border
function drawBorder(color){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
    context.strokeStyle = color
    context.lineWidth=10;
    context.strokeRect(0,0, canvas.width, canvas.height);
}

/// Step 3: Intervals
function Game (){
      var interval = function() {
          drawBorder('orange')
          setTimeout(function() {
            requestAnimationFrame(interval);
          }, 1000);
    };
    interval();
}
