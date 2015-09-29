
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
      self.snake = new Snake(0, "red")
      self.computer = new Snake(10, "blue")
      self.food = createFood()
      self.score = 0;
      self.speed = 240;

      var interval = function() {
          drawBorder('orange', self.score);
          updateSnake(self.snake);
          updateSnake(self.computer);
          updateComputer(self.snake, self.food, self.computer)
          drawSnake(self.snake);
          drawSnake(self.computer);
          drawFood(self.food);
          checkCollision(self.snake, self.computer, self.food)
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
          context.fillStyle = snake.color;
          context.fillRect(snake.snakeArray[i].x * pixelSize, snake.snakeArray[i].y * pixelSize, pixelSize, pixelSize);
          context.strokeStyle = "white";
          context.strokeRect(snake.snakeArray[i].x * pixelSize, snake.snakeArray[i].y * pixelSize, pixelSize, pixelSize);
        }

}
/// Step 5: Movement
var Snake = function(y, color){
    var self = this
    self.direction = 'right'
    self.snakeArray = []
    self.length = 8
    self.color = color
      for(var i = self.length; i>=0; i--) {
        self.snakeArray.push({x: i, y:y});
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
    context.fillStyle = "green";
    context.fillRect(food.x * pixelSize, food.y * pixelSize, pixelSize, pixelSize);
    context.strokeStyle = "white";
    context.strokeRect(food.x * pixelSize, food.y * pixelSize, pixelSize, pixelSize);
}

/// Step 8 Collisions

function checkCollision(snake, computer, food){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d')

  var pixelSize = canvas.width / 25
        /// If we run into the computer.

        for(i=0; i< computer.snakeArray.length; i++){
            if(snake.snakeArray[0].x === computer.snakeArray[i].x && snake.snakeArray[0].y === computer.snakeArray[i].y){
                 alert("You lose!")
                 location.reload()
            }
        }

        /// If the computer runs into us
        for(i=0; i< snake.snakeArray.length; i++){
            if(computer.snakeArray[0].x === snake.snakeArray[i].x && computer.snakeArray[0].y === snake.snakeArray[i].y){
                context.clearRect(0, 0, canvas.width, canvas.height);
                  alert("You win!");
                  location.reload()
            }
        }

        ///  If the computer hits the food.
        if(computer.snakeArray[0].x === food.x && computer.snakeArray[0].y === food.y){
            game.food = createFood()
            game.score--
            if(game.speed > 30){
                game.speed = game.speed - 15
            }
            var tail = {}
            tail.x = computer.snakeArray[0].x
            tail.y = computer.snakeArray[0].y
            computer.snakeArray.unshift(tail);
          }
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
            alert("You lose!");
            location.reload();
        }
        /// Computer off the map left
        if(computer.snakeArray[0].x < 0 ){
            alert("You win!");
            location.reload();
        }
        /// off the map up
        if(snake.snakeArray[0].y < 0 ){
            alert("You lose!");
            location.reload();
        }
        /// Computer off the map up
        if(computer.snakeArray[0].y < 0 ){
            alert("You win!");
            location.reload();
        }
        /// off the map down
        if(snake.snakeArray[0].y + 1 > 600/pixelSize ){
            alert("Computer wins!");
            location.reload();
        }
        /// Computer off the map down
        if(computer.snakeArray[0].y + 1 > 600/pixelSize ){
            alert("You win!");
            location.reload();
        }

        /// off the map right
        if(snake.snakeArray[0].x + 1 > 600/pixelSize ){
            alert("You lose!");
            location.reload();
        }
        /// Computer off the map right
        if(computer.snakeArray[0].x + 1 > 600/pixelSize ){
            alert("You win!");
            location.reload();
        }
        /// if we hit our own snake body
        for(var i = 2; i < snake.snakeArray.length; i++){
          if(snake.snakeArray[i].x == snake.snakeArray[0].x && snake.snakeArray[i].y == snake.snakeArray[0].y){
              alert("You lose!");
              location.reload();
          }
        }
          /// if computer hits it's own body
          for(var i = 2; i < computer.snakeArray.length; i++){
            if(computer.snakeArray[i].x == computer.snakeArray[0].x && computer.snakeArray[i].y == computer.snakeArray[0].y){
                alert("You win!");
                location.reload();
            }
        }

}

/// Step 11 Update Computer position.
function updateComputer(snake, food, computer){
    if (food.x === computer.snakeArray[0].x) {
        if (food.y > computer.snakeArray[0].y) {
          if (isSafe(snake, computer, 'down')) computer.direction = 'down';
            } else {
          if (isSafe(snake, computer, 'up')) computer.direction = 'up';
        }
      }
      if (food.y === computer.snakeArray[0].y) {
        if (food.x > computer.snakeArray[0].x) {
          if (isSafe(snake, computer, 'right')) computer.direction = 'right';
        } else {
          if (isSafe(snake, computer, 'left')) computer.direction = 'left';
        }
      }
      if (food.y > computer.snakeArray[0].y) {
        if (isSafe(snake, computer, 'down')) computer.direction = 'down';
    } else if (food.y < computer.snakeArray[0].y) {
        if (isSafe(snake, computer, 'up')) computer.direction = 'up';
      }
      if (food.x > computer.snakeArray[0].x) {
        if (isSafe(snake, computer, 'right')) computer.direction = 'right';
    } else if (food.x < computer.snakeArray[0].x) {
        if (isSafe(snake, computer, 'left')) computer.direction = 'left';
      }
}

function isSafe(snake, computer, dir){
  var snakeCopy = deepCopy(snake.snakeArray);
  var compCopy = deepCopy(computer.snakeArray);
   switch (dir) {
     case 'left':
       for (var i = 0; i < snakeCopy.length/4; i++) {
         compCopy[0].x--;
         if ( checkBodyCollision(compCopy[0], compCopy) || checkBodyCollision(compCopy[0], snakeCopy)) {
           return false;
         }
       }
       return true;
     case 'right':
       for (var i = 0; i < compCopy.length/4; i++) {
         compCopy[0].x++;
         if (checkBodyCollision(compCopy[0], compCopy) || checkBodyCollision(compCopy[0], snakeCopy)) {
           return false;
         }
       }
       return true;
     case 'up':
       for (var i = 0; i < compCopy.length/4; i++) {
         compCopy[0].y--;
         if (checkBodyCollision(compCopy[0], compCopy) || checkBodyCollision(compCopy[0], snakeCopy)) {
           return false;
         }
       }
       return true;
     case 'down':
       for (var i = 0; i < compCopy.length/4; i++) {
         compCopy[0].y++;
         if (checkBodyCollision(compCopy[0], compCopy) || checkBodyCollision(compCopy[0], snakeCopy)) {
           return false;
         }
       }
       return true;
   }
}


function checkBodyCollision(head, array) {
  for(var i = 1; i < array.length; i++){
    if(array[i].x == head.x && array[i].y == head.y){
      return true;
    }
  }
  return false;
}

function deepCopy (arr) {
    var out = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i];
        var obj = {};
        for (var k in item) {
            obj[k] = item[k];
        }
        out.push(obj);
    }
    return out;
}
