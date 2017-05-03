const canvas = document.getElementById('canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const context = canvas.getContext('2d')

const SIZE = 15
const SPEED = 80

var snake = new Snake()
var board = new Board(snake)

board.newPoint()
setInterval(function(){board.draw()}, SPEED)

function Board(snake){

  this.snake = snake
  this.height = Math.floor(canvas.height / SIZE)
  this.width = Math.floor(canvas.width / SIZE)
  this.point = []

  window.addEventListener('keydown', function(e){
    switch(e.key){
      case 'ArrowRight':
        this.snake.move('right')
        break
      case 'ArrowLeft':
        this.snake.move('left')
        break
      case 'ArrowUp':
        snake.move('up')
        break
      case 'ArrowDown':
        snake.move('down')
        break
    }
  })

  this.newPoint = function(){
    let x = Math.floor(Math.random()*this.width)
    let y = Math.floor(Math.random()*this.height)
    this.point = [x,y]
  }

  this.clear = function(){
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  this.draw = function(){
    this.clear()

    const next = this.snake.next()
    if(this.snake.doesEat(this.point)){
      this.snake.grow(this.point)
      this.newPoint()
    }
    context.fillStyle="grey"
    context.fillRect(this.point[0]*SIZE,this.point[1]*SIZE, SIZE,SIZE)
    context.fillStyle="black"
    for(i=0, l=next.length; i<l ; i++){
      context.fillRect(next[i][0]*SIZE,next[i][1]*SIZE, SIZE,SIZE)
    }
  }
}

function Snake(){
  this.body = [[1,1]]
  this.dx = 1
  this.dy = 0

  this.next = function(){
    var next = [[this.body[0][0] + this.dx, this.body[0][1] + this.dy]]
    for(i=0, l=this.body.length-1; i<l; i++){
      next.push(this.body[i])
    }
    this.body = next
    return next
  }

  this.doesEat = function(point){
    return this.body[0][0] === point[0] && this.body[0][1] === point[1]
  }

  this.grow = function(point){
    this.body.push(point)
  }

  this.move = function(direction){
    switch(direction){
      case 'right':
        this.dx = 1
        this.dy = 0
        break
      case 'left':
        this.dx = -1
        this.dy = 0
        break
      case 'up':
        this.dx = 0
        this.dy = -1
        break
      case 'down':
        this.dx = 0
        this.dy = 1
        break
    }
  }
}
