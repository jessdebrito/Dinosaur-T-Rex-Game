const BACKGROUND = document.querySelector(".background")
const DIVSCORE = document.querySelector(".score");
const DIVHIGHSCORE = document.querySelector(".highScore");

class Dino {
    #dinoHTML;
    #isJumping = false;
    #dinoPosition = 0;

    constructor(divDino) {
        this.#dinoHTML = divDino;
    };

    getDinoPosition() { 
        let dinoPosition = this.#dinoPosition;
        return dinoPosition;
    };

    getIsJumping() {
        let isJumping = this.#isJumping;
        return isJumping;
    }

    jump(){
        this.#isJumping = true;
        let dinoHTML = this.#dinoHTML;

        let upInterval = setInterval(() => {
            if(this.#dinoPosition >= 150){
                clearInterval(upInterval);

                let downInterval = setInterval(() => {
                    if(this.#dinoPosition === 0){
                        clearInterval(downInterval)
                        this.#isJumping = false;
                    }else{
                        this.#dinoPosition -= 20;

                        dinoHTML.style.bottom = `${this.#dinoPosition}px`;
                    }
                }, 25 + 9.8)
            } else{
                this.#dinoPosition += 20;

                dinoHTML.style.bottom = `${this.#dinoPosition}px`;
            }
        }, 25 + 9.8);

    };

    lowerDino() {
        let dinoHTML = this.#dinoHTML;
        dinoHTML.setAttribute("class","dinoLowered");
    };

    upDino() {
        let dinoHTML = this.#dinoHTML;
        dinoHTML.setAttribute("class", "dino");
    };
};

class Score {
    #score = 0;

    getHighScore() {
        let highScore = localStorage.getItem('highScore');
        return highScore;
    };

    setHighScore() {
        let score = this.#score;
        let highScore = localStorage.getItem('highScore') 

        if(score > parseInt(highScore)){
            localStorage.setItem('highScore', score);
        }
    };

    getScore() {
        let score = this.#score;
        return score 
    };

    setScore() { 
        let score = 0;
        score += 1;

        this.#score += score;
    };
}

class Obstacle {
    #obstacle = document.createElement("div");
    #nameClassObstacle;
    #obstaclePositionX = 800;
    #obstacleSpeed;
    #randomTime = Math.random() * 6000;
    #randomTypeObstacle = getRandomIntInclusive(0,1);

    constructor(objScore, objDino, intervalScore, speed = 23.5) {
        this.#nameClassObstacle = (this.#randomTypeObstacle === 0) ? "cactus" : "bird";
        this.#obstacleSpeed = speed - 0.15;
        this.addClassObstacle();
        this.animateObstacle(objScore, objDino, intervalScore);

        setTimeout(() => {let objObstacle = new Obstacle(objScore, objDino, intervalScore, this.#obstacleSpeed)}, this.#randomTime)
    }

    addClassObstacle() {
        let nameClassObstacle = this.#nameClassObstacle;
        let obstacle = this.#obstacle;

        obstacle.classList.add(nameClassObstacle);
        BACKGROUND.appendChild(obstacle);
        obstacle.style.left = `800px`;
    }

    animateObstacle(objScore, objDino, intervalScore) {
        let obstaclePositionX = this.#obstaclePositionX;
        let obstacle = this.#obstacle;
        let nameObstacle = this.#nameClassObstacle;

        let intervalLeftObstacle = setInterval(() => {
            if(obstaclePositionX < -60) {
                clearInterval(intervalLeftObstacle);
                BACKGROUND.removeChild(obstacle);
            } else if (obstaclePositionX > 0 && obstaclePositionX < 120 && objDino.getDinoPosition() < 60 && nameObstacle === "cactus") {
                // Game over
                objScore.setHighScore();
    
                clearInterval(intervalLeftObstacle);
                clearInterval(intervalScore);
    
                document.body.innerHTML = '<h1 class="game-over">Fim de jogo<br><a href="index.html" style="text-decoration:none;" class="game-over">Tente novamente!<br><img src="assets/reload.png"></a><h1>';
            } else if (obstaclePositionX > 0 && obstaclePositionX < 120 && objDino.getDinoPosition() <= 30 && nameObstacle === "bird") {
                // Game over
                objScore.setHighScore();
    
                clearInterval(intervalLeftObstacle);
                clearInterval(intervalScore);
    
                document.body.innerHTML = '<h1 class="game-over">Fim de jogo<br><a href="index.html" style="text-decoration:none;" class="game-over">Tente novamente!<br><img src="assets/reload.png"></a><h1>';
            } else {
                obstaclePositionX -= 10;
                obstacle.style.left = `${obstaclePositionX}px`;
            }

        }, this.#obstacleSpeed)
    }
}

let getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


let handleKeyDown = (e) => {

    if(!objDino.getIsJumping()) {
        if(e.keyCode === 40) {
            objDino.lowerDino();
        } else if(e.keyCode === 32 || e.keyCode === 38) {
            objDino.jump();
        }
    }    
};

let handleKeyUp = (e) => {
    if (e.keyCode === 40) {
        objDino.upDino();
    }
};

let init = () => {
    objDino = new Dino(document.querySelector(".dino"));
    objScore = new Score();

    DIVHIGHSCORE.innerHTML = `Maior pontuação: ${objScore.getHighScore()}`;

    let scoreInterval = setInterval(() => {
        objScore.setScore();
        DIVSCORE.innerHTML = `Pontuação: ${objScore.getScore()}`;
    }, 0.5)

    objCactus = new Obstacle(objScore, objDino, scoreInterval);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
};

init();