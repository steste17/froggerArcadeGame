const moveUp = -82;
const moveRight = 101;
const moveDown = -1 * moveUp;
const moveLeft = -1 * moveRight;
let upPressed = false;
let rightPressed = false;
let downPressed = false;
let leftPressed = false;
let score = document.getElementById("score");
let lives = Array.from(document.getElementById("lives").innerText);
const howToPlay = document.querySelector('ol');
const directions = document.getElementById('howToPlay');

//Enemy Class
class Enemy {
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = Math.floor(Math.random() * 492)+ 10;
        this.speed = Math.floor(Math.random() * 350) + 50;      
    }
    update(dt){
        if(this.x > 810){
            this.x = -20;
        } else {
            this.x += this.speed * dt;
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//Player Class
class Player {
    constructor(){
        this.sprite = 'images/char-cat-girl.png';
        this.x = 400;
        this.y = 550;
    }
    update(dt){
        if(leftPressed && this.x > 0){
            this.x += moveLeft;
            leftPressed = false;
        }
        else if(rightPressed && this.x < 606){
            this.x += moveRight;
            rightPressed = false;
        }
        else if(upPressed && this.y > 0){
            this.y += moveUp;
            upPressed = false;
        }
        else if(downPressed && this.y < 500){
            this.y += moveDown;
            downPressed = false;
        }
        levelUp();
        checkCollision();
    }
     handleInput(pressed){
        if(pressed == 'left'){
            leftPressed = true;
        }
        else if(pressed == 'right'){
            rightPressed = true;
        }
        else if(pressed == 'up'){
            upPressed = true;
        }
        else if(pressed == 'down'){
            downPressed = true;
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    reset(){
        this.x = 400;
        this.y = 550;
    }
}

//Instantiates enemies and player
const allEnemies = [new Enemy()];
let player = new Player();
 
//Strange that I couldn't get the below functions 
//to work as part of the Player class.
//Will look into it afterwards. 

//Increases the score and increase difficulty
//when the player successfully reaches the water.
function levelUp(){
    if(player.y <= -24){
        setTimeout(player.reset(), 3000);
        let currentScore = Number(score.innerHTML);
        score.innerHTML = currentScore + 50;
        allEnemies.push(new Enemy());
    }
}

//Checks if enemy and player collide
//If collide is detected, the last enemy created is removed,
//the player loses a life, and is reset to the start position. 
function checkCollision(){
    for(const enemy of allEnemies){
        const diffX = Math.abs(player.x - enemy.x);
        const diffY = Math.abs(player.y - enemy.y);
        if(diffX <= 50 && diffY <= 50){
            livesLeft();
            let currentScore = Number(score.innerHTML);
            if(currentScore > 0){
                score.innerHTML = currentScore - 50;
                allEnemies.pop();
            }
            player.reset();
        }  
    } 
}

//Checks if the player has lives remaining and
//ends game if no more lives left.
function livesLeft(){
    if(lives.length >= 1){
        lives.pop();
        document.getElementById("lives").innerText = lives.join();
    } else {
        gameOver();
    }
}

function gameOver(){
    swal({
        title: "GAME OVER 😢",
        text: "Play again?",
        button: "One more time!"
    })
    .then((value) => restartGame());
}

function restartGame(){
    location.reload();
}

//Player movement event listeners that only allow input from the listed keys
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//Disables default arrow key scrolling
window.addEventListener('keydown', function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

//Shows and hides how to play directions
document.addEventListener('click', function(e){
    if(e.target == directions){
        howToPlay.classList.toggle('hidden');
    }
});


//can use the below function to double check the x or y of
//the player or the click location on the document
// function clickLocation(event){
//     console.log(player.x, player.y, event.clientX, event.clientY);
// }

// document.addEventListener("click", clickLocation);
