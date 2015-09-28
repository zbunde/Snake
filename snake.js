
/// only call our draw function when the canvas is loaded and has context!
document.addEventListener("DOMContentLoaded", function() {
  game = new  Game()
});

//// Step 1: Drawing a Border
function drawBorder(color, score){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "30px Arial";
    context.fillText(score, 0, 30)
    context.strokeStyle = color
    context.strokeRect(0,0, canvas.width, canvas.height);
}

/// Step 3: Intervals
var  Game = function (){
  var self = this
      self.snake = new Snake()
      self.food = createFood()
      self.score = 0;
      self.speed = 220;

      var interval = function() {
          drawBorder('orange', self.score);
          updateSnake(self.snake);
          drawSnake(self.snake);
          drawFood(self.food);
          checkCollision(self.snake, self.food)
          setTimeout(function() {
            requestAnimationFrame(interval);
        }, self.speed);
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
      for(var i = self.length; i>=0; i--) {
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

/// Step 8 Collisions

function checkCollision(snake, food){
  var canvas = document.getElementById("canvas");
  var pixelSize = canvas.width / 25
    /// if we hit our food!
    if(snake.snakeArray[0].x === food.x && snake.snakeArray[0].y === food.y){
        game.food = createFood()
        game.score++
        if(game.speed > 30){
            game.speed = game.speed - 15
        }
        var tail = {}
        tail.x = game.snake.snakeArray[0].x
        tail.y = game.snake.snakeArray[0].y
        snake.snakeArray.unshift(tail);
      }
    /// off the map left
    if(snake.snakeArray[0].x < 0 ){
      location.reload();
    }
    /// off the map up
    if(snake.snakeArray[0].y < 0 ){
      location.reload();

    }
    /// off the map down
    if(snake.snakeArray[0].y > 600/pixelSize ){
      location.reload();
    }
    /// off the map right
    if(snake.snakeArray[0].x > 600/pixelSize ){
      location.reload();

    }
    /// if we hit our own snake body
    for(var i = 2; i < snake.snakeArray.length; i++){
      if(snake.snakeArray[i].x == snake.snakeArray[0].x && snake.snakeArray[i].y == snake.snakeArray[0].y){
        location.reload();
      }

    }

}
