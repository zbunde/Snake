
/// only call our draw function when the canvas is loaded and has context!
document.addEventListener("DOMContentLoaded", function() {
    Game();
});
//

//// Step 1: Drawing a Border
function drawBorder(color){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
    context.strokeStyle = color
    context.lineWidth=10;
    context.strokeRect(0,0, canvas.width, canvas.height);
}
function Game (){
      var count = 0
      var interval = function() {
        count ++
        if(count % 2 == 0){
          drawBorder('green');
        }
        else {
          drawBorder('red')
        }

          setTimeout(function() {
            requestAnimationFrame(interval);
          }, 1000);
    };
    interval();
}
