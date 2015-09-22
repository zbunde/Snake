
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
          setTimeout(function() {
            requestAnimationFrame(interval);
          }, 1000);
    };
    interval();
}


/// Step 4: Draw a Snake
///

function drawSnake (){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  var pixelSize = canvas.width / 25
            for(var i = 0; i < 8; i++) {
                  context.fillStyle = 'red';
                  context.fillRect(i, 0, pixelSize, pixelSize);
                }
}
