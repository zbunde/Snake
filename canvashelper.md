### Canvas Helper


### HTML
```
<script type="text/javascript" src="snake.js"></script>
<canvas id="canvas" width="600" height="600"></canvas>
```

#### Context
- 2D!
- gives us access to all of the functions we will use to make our game display on the canvas.
```
var canvas = document.getElementById("canvas");
var context =  canvas.getContext('2d');

```
-we call all of our canvas functions on the context.


#### requestAnimationFrame
https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

- requestAnimationFrame is the bread and butter of building games in canvas. Games work off of a interval, each time the interval function fires we update the state of the game, draw the canvas,  and then pass this function to requestAnimationFrame(interval).
- We can use a setTimeout in conjunction with requestAnimationFrame to control our interval speed.

```
var interval = function() {
      setTimeout(function() {
        requestAnimationFrame(interval);
      }, 1000);
};

interval();

```
- the first call of interval() only starts the loop, and from the on interval is called by requestAnimationFrame.
- notice how we pass our interval to requestAnimationFrame every 1000 ms.
- our interval function is recursive, it call's itself indefinitely.
- we can change how often our interval happens by changing the 2nd argument of our setTimeout.
- Our interval function will call all of our game related functions. Every interval we must:

 ```
 1. Draw Border.
 2. Draw the food.
 3. Update snakes position.
 4. Draw the snake.
 5. Check for collisions.
 ```

#### pixelSize
- we use pixelSize to act as a constant for drawing pixels on our canvas. It is determined by diving the width or height of our canvas by the amount of pixels we want.
- when we pass X or Y coordinates we must multiply them by our pixelSize so that they move to the correct location on the canvas.

```
var pixelSize = canvas.width / 25

```

#### Context Functions

###### strokeRect(x, y, width, height)
- This function is used to draw outlines of rectangles. It is great for drawing borders. We also use it to make each of our snake's pixels easier to see.

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect
Parameters:
```
x: x axis starting point.
y: y axis starting point.
width: the rectangles width.
height: the rectangles height.

```
Example:
```
context.strokeRect(0, 0, 25, 50);

```
- this will draw the an outline of a rectangle from the top right corner, with a width of 25 and a height of 50.

```
/// How we use it
context.strokeRect(snake.snakeArray[i].x * pixelSize, snake.snakeArray[i].y * pixelSize, pixelSize, pixelSize);
```
- notice how we are using pixelSize on all 4 parameters. We multiply our x and y by the pixelSize, and for the height and width we use pixelSize.



###### fillRect(x, y, width, height)
- This function is used to paint rectangles. We use it to paint each of our Snakes pixels, and to paint the food.
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect

Parameters:
```
x: x axis starting point.
y: y axis starting point.
width: the rectangles width.
height: the rectangles height.
```
Example:

```
context.fillRect(snake.snakeArray[i].x * pixelSize, snake.snakeArray[i].y * pixelSize, pixelSize, pixelSize);
```
- once again, we are using pixelSize on all of the parameters.

#### Properties

###### fillStyle
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
- This property is used to set the color of our context for fillRect().

Example:
```
context.fillStyle = "blue"
context.fillRect(snake.snakeArray[i].x * pixelSize, snake.snakeArray[i].y * pixelSize, pixelSize, pixelSize);
```
- this will paint a blue rectangle at the target location.

###### strokeStyle
  https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
  - This property is used to set the color for strokeRect().

  Example:
```
  context.strokeStyle = "red"
  context.strokeRect(0,0, canvas.width, canvas.height)
```
- this will draw a red border around our canvas.
