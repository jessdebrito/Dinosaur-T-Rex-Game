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

                let downInterval = setInterval(() =>{
                    if(this.#dinoPosition === 0){
                        clearInterval(downInterval)
                        this.#isJumping = false;
                    } else {
                        this.#dinoPosition -= 20;

                        dinoHTML.style.bottom = `${this.#dinoPosition}px`;
                    }
                }, 25 + 9.8)
            } else {
                this.#dinoPosition += 20;

                dinoHTML.style.bottom = `${this.#dinoPosition}px`;
            }
        }, 25 + 9.8);

    };