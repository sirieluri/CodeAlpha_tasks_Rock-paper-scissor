const choices = ["rock","paper","scissors"];
const playerdisplay = document.getElementById("playerdisplay");
const computerdisplay = document.getElementById("computerdisplay");
const resultdisplay = document.getElementById("resultdisplay");
const playerscoredisplay = document.getElementById("playerscoredisplay");
const computerscoredisplay = document.getElementById("computerscoredisplay");
const winnerdisplay = document.getElementById("winnerdisplay");
const winSound = new Audio("audio/win.mp3");
const lostSound = new Audio("audio/lost.mp3");
const drawSound = new Audio("audio/draw.mp3");
const win2Sound = new Audio("audio/win2.mp3");
const loseSound = new Audio("audio/lose.mp3");

let playerscore = 0;
let computerscore = 0;
const winner = 10 ;
let gameover = false;

function showFireworks() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 8,
            angle: 60,
            spread: 70,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 8,
            angle: 120,
            spread: 70,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}


function playgame(playerchoice){
    
     if(gameover){
        return;
    }
    
    const computerchoice = choices[ Math.floor (Math.random() * 3 )] ;
     let result = "";

     if (playerchoice === computerchoice){
        result = "It's a Tie!";
        resultdisplay.classList.add("grayText");
        drawSound.currentTime = 0;
        drawSound.play();
     }
     else {
        switch(playerchoice){
            case "rock":
              result = (computerchoice === "scissors") ? "YOU WIN!" : "YOU LOSE!" ;
              break;
            case "paper":
                result = (computerchoice === "rock") ? "YOU WIN!" : "YOU LOSE!"; 
                break;
            case "scissors":
                result = (computerchoice === "paper") ? "YOU WIN!" : "YOU LOSE!";    
                break;
        }
        
     }
     playerdisplay.textContent = `PLAYER:${playerchoice}`;
     computerdisplay.textContent = `COMPUTER :${computerchoice}`;
     resultdisplay.textContent = result;
      
    resultdisplay.classList.remove("greenText","redText","grayText");
     
    switch(result){
        case "YOU WIN!":
             resultdisplay.classList.add("greenText");
             playerscore ++;
             playerscoredisplay.textContent = playerscore;

            // Play the sound
            winSound.currentTime = 0;
            winSound.play();

             break;
        case "YOU LOSE!":
             resultdisplay.classList.add("redText");
             computerscore ++;
             computerscoredisplay.textContent= computerscore;
              
            // Play the sound
            lostSound.currentTime = 0;
            lostSound.play();
             break;
         
        case "It's a Tie!":
            resultdisplay.classList.add("grayText");
            break;     
                
     }
   
    winnerdisplay.classList.remove("greenText", "redText");        
     
    if(playerscore >= winner){
    winnerdisplay.textContent = "🏆 YOU WON THE GAME!";
    winnerdisplay.classList.add("greenText");

    win2Sound.currentTime = 0;
    win2Sound.play();

    showFireworks();   // 🎆 Fireworks

    gameover = true;
}
   else if(computerscore >= winner){
        winnerdisplay.textContent = "YOU LOST THE GAME!";
         winnerdisplay.classList.add("redText");
          loseSound.currentTime = 0;
           loseSound.play();
        gameover = true;
    } 
   


        
    
}
function playAgain() {
    playerscore = 0;
    computerscore = 0;
    gameover = false;

    playerscoredisplay.textContent = 0;
    computerscoredisplay.textContent = 0;

    playerdisplay.textContent = "PLAYER:";
    computerdisplay.textContent = "COMPUTER:";
    resultdisplay.textContent = "";
    winnerdisplay.textContent = "";

    resultdisplay.classList.remove("greenText", "redText");
    winnerdisplay.classList.remove("greenText", "redText");
    
    winSound.pause();
    lostSound.pause();
    drawSound.pause();
    win2Sound.pause();
    loseSound.pause();
}