const moveUp = 82;
const moveRight = 101;
const moveDown = -1 * moveUp;
const moveLeft = -1 * moveRight;
// const spriteList = {boy: 'images/char-boy.png', cat: 'images/char-cat-girl.png', princess: 'images/char-princess-girl.png'};


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
        this.y = 650;
        this.xMovement = 0;
        this.yMovement = 0;
        console.log('Created!');
    }
    update(dt){
        this.x += this.speed * dt;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(direction){
        switch(direction){
            case 'left':
                if(this.x > 0)
                    this.xMovement += moveLeft;
                break;
            case 'right':
                if(this.x < 810)
                    this.xMovement += moveRight;
            case 'up':
                if(this.y > 0)
                    this.yMovement += moveUp;
                break;
            case 'down':
                if(this.y < 756)
                    this.yMovement += moveDown;
                break;
        }
    }
}

//Instantiates enemies and player
const allEnemies = [new Enemy(), new Enemy()];
let player = new Player();


//Player Movement
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//check x, y
function clickLocation(event){
    console.log(event.clientX, event.clientY);
}

document.addEventListener("click", clickLocation);
