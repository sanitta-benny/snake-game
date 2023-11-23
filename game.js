const canvas =document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const canvasSize =600
canvas.width =canvasSize
canvas.height =canvasSize

const snakeBox =20;
const totalMoves =canvasSize/snakeBox;

const apple = new Image()
apple.src = 'images/apple.png';


let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let down = new Audio();
let left = new Audio();
let right = new Audio();


dead.src= 'audio/dead.mp3'
eat.src = 'audio/eat.mp3'
up.src = 'audio/up.mp3'
down.src = 'audio/down.mp3'
left.src = 'audio/left.mp3'
right.src = 'audio/right.mp3'

//define snake snake is an array 
let snake =[];
snake[0]={
    x:9*snakeBox, // starting position 9 snakehead right ku
    y:10*snakeBox
};

//create food 
let food ={};
getFood() //because we want food in loading time

//score
let score=0;

//snake direction

let dir ="";
//event lisner for controlling direction

document.addEventListener("keydown",direction);//we have to define all functions

//direction set by which key is clicked
function direction(){
let key = event.keyCode;
if(key==37&& dir!="RIGHT"){
    dir="LEFT"
    //left moving sound
    left.play()
}
else if(key==38 && dir!="DOWN"){
    dir="UP"

    up.play()
}
else if(key==39 && dir!="LEFT"){
    dir="RIGHT"

    right.play()
}
else if(key==40 && dir!="UP"){
    dir="DOWN"

    down.play()
}

}

//function for get food
function getFood(){
    food ={   //math.random()*(max-min)+min  //here max we assiagn as total-2 because we dont want to place the apple in the corners for width we multiply it with snakeBox
        x: Math.floor(Math.random()*(totalMoves-2-3)+3)*snakeBox,
        y: Math.floor(Math.random()*(totalMoves-2-3)+3)*snakeBox
      

    }
}

//function to find snake body collision
function collisionDetection(head,ar){
    for(i=0;i<ar.length;i++){
        if(ar[i].x==head.x && ar[i].y==head.y){
            return true
        }
    }
    return false;

}

//for game display

function render(){
    ctx.fillStyle ="#dcdcdc"
    ctx.fillRect(0,0,canvasSize,canvasSize)
    //for display snake
    //snake is array thats why we use for loop

    for(let i=0;i<snake.length;i++){
        ctx.fillStyle = i==0?"red":"green" //we assign different color to snake head
        ctx.fillRect(snake[i].x,snake[i].y,snakeBox,snakeBox) //here we already asssigned the x and y 


        ctx.strokeStyle ="#E91E63" //assign stroke color
        ctx.strokeRect(snake[i].x,snake[i].y,snakeBox,snakeBox);
    }
    //we have to plot apple image in random position
    ctx.drawImage(apple,food.x,food.y,snakeBox,snakeBox) //here apple is the image and we stored x and y value 
    //snake movement
    let snakeX =snake[0].x; //first assigned value's x and y coordinates 
    let snakeY = snake[0].y; 

    if(dir=="LEFT") snakeX-=snakeBox ;//IF we want to move to left we have to reduce the width 
    if(dir=="RIGHT")snakeX+=snakeBox;
    if(dir=="UP")snakeY-=snakeBox;
    if(dir=="DOWN")snakeY+=snakeBox;

    //if snake it

    if(snakeX==food.x && snakeY==food.y ){
        score++;
        eat.play();
        getFood();// if snake eats one apple then add new apple
    }
    else{
        snake.pop();//if it doesnt eat apple then remove one box for shifting
   }
   let newHead ={
    x:snakeX,
    y:snakeY
   };

   if(snakeX<0 || snakeX>=canvasSize || snakeY<0 || snakeY>=canvasSize || collisionDetection(newHead,snake)){
    gameover()
   }

   snake.unshift(newHead);
   ctx.fillStyle ="black"; //for game score
ctx.font ="-100px"

ctx.fillText(score,10,40);//for coloring the text

  

}
render();
var gm= setInterval(render,300) //we assign it to a variable beacuse we want to stop it when game over

function gameover(){
    clearInterval(gm) //so it doent continue the intervel
    dead.play();
    ctx.fillStyle="black"
    ctx.font ="-40px font-family: 'Stint Ultra Condensed', serif;"
    ctx.fillText("Game Over",canvasSize/2,canvasSize/2) //here position is set to canvas center 
}