
/// only call our draw function when the canvas is loaded and has context!
document.addEventListener("DOMContentLoaded", function() {
  Game()
  });

//// Step 1: Drawing a Border
function drawBorder(color){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
    context.strokeStyle = color
    context.strokeRect(0,0, canvas.width, canvas.height);
}

/// Step 3: Intervals
function Game (){
      var interval = function() {
          drawBorder('orange')
          drawSnake();
          setTimeout(function() {
            requestAnimationFrame(interval);
        }, 240);
    };
    interval();
}


/// Step 4: Draw a Snake
function drawSnake (){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  var pixelSize = canvas.width / 25
      for(var i = 0; i < 8; i++) {
          context.fillStyle = "orange";
          context.fillRect(i*pixelSize, 0, pixelSize, pixelSize);
          context.strokeStyle = "white";
          context.strokeRect(i*pixelSize, 0, pixelSize, pixelSize);
        }
}
