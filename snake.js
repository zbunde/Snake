
/// only call our draw function when the canvas is loaded and has context!
document.addEventListener("DOMContentLoaded", function() {
  game = new  Game()
  });

//// Step 1: Drawing a Border
function drawBorder(color){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = color
    context.strokeRect(0,0, canvas.width, canvas.height);
}

/// Step 3: Intervals
var  Game = function (){
  var self = this
      self.snake = new Snake()
      self.food = createFood()
      var interval = function() {
          drawBorder('orange')
          updateSnake(self.snake)
          drawSnake(self.snake);
          drawFood(self.food)
          setTimeout(function() {
            requestAnimationFrame(interval);
          }, 120);
    };
    interval();
}

/// Step 4: Draw a Snake
function drawSnake (snake){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  var pixelSize = canvas.width / 25
      for(var i = 0;  i < snake.snakeArray.length; i++) {
          context.fillStyle = "orange";
          context.fillRect(snake.snakeArray[i].x * pixelSize, snake.snakeArray[i].y * pixelSize, pixelSize, pixelSize);
          context.strokeStyle = "white";
          context.strokeRect(snake.snakeArray[i].x * pixelSize, snake.snakeArray[i].y * pixelSize, pixelSize, pixelSize);
        }

}
/// Step 5: Movement
var Snake = function(){
    var self = this
    self.direction = 'right'
    self.snakeArray = []
    self.length = 8
      for(var i = 8; i>=0; i--) {
        self.snakeArray.push({x: i, y:0});
      }

}

/// Step 5 Movement
function updateSnake(snake){
      var noseX= snake.snakeArray[0].x
      var noseY= snake.snakeArray[0].y

          if(snake.direction == "right") noseX++;
        	else if(snake.direction == "left") noseX--;
        	else if(snake.direction == "up") noseY--;
        	else if(snake.direction == "down") noseY++;

          var tail = snake.snakeArray.pop();
            tail.x = noseX;
            tail.y = noseY;
            snake.snakeArray.unshift(tail);
}

/// Step 6 Control
window.addEventListener('keydown', function(key) {
       key.preventDefault();
          if(key.which == "37")
            game.snake.direction = "left"
          else if(key.which == "39")
            game.snake.direction = "right"
          else if(key.which == "38")
            game.snake.direction = "up"
          else if(key.which == "40")
            game.snake.direction = "down"
});

/// Step 7 food
function createFood(){
  var pixelSize = canvas.width / 25
    return  food = {
        x: Math.round(Math.random()*(canvas.width-pixelSize)/pixelSize),
        y: Math.round(Math.random()*(canvas.height-pixelSize)/pixelSize),
      };
}
/// Step 7 food
function drawFood(food){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d')
  var pixelSize = canvas.width / 25
    context.fillStyle = "blue";
    context.fillRect(food.x * pixelSize, food.y * pixelSize, pixelSize, pixelSize);
    context.strokeStyle = "white";
    context.strokeRect(food.x * pixelSize, food.y * pixelSize, pixelSize, pixelSize);
}
