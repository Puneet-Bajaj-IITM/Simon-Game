let colors = document.querySelectorAll(".color");
let h3 = document.querySelector("h3");
let level = 0;
let colorPattern = [];
let userInput = [];
let points = 0;
let highestPoints = 0;
let score = document.querySelectorAll("h4")[0];
let highestScore = document.querySelectorAll("h4")[1];
let failed = false;

//Starting the game
document.addEventListener("keydown",()=>{
    if (level == 0) {
        console.log("Game Started");
        startGame();
    }
});

//Flashing button after certain time
let btnFlash = function (randcolor){
    randcolor.style = "background-color : white";
    setTimeout(()=>(randcolor.style =''),500);
    console.dir(randcolor.localName);
    return randcolor.classList[1];
}

//Flickering buttons by changing color
let flicker = function (){
    let randcolor = colors[Math.floor(Math.random()*4)];
    return btnFlash(randcolor);
}

//ending and reinitializing parameters
let endGame = function (){
    failed = true;
    let body = document.querySelector("body");
    body.style = "background-color : red";
    setTimeout(()=>(body.style =''),500);
    level = 0;
    userInput = [];
    colorPattern = [];
    points = 0;
    score.innerText = "Score : 0 ";
    document.addEventListener("keydown",()=>{
        if (failed) {
            setTimeout(startGame,1000);
        }
    })
}

//Checking user input
let checkAns = function (i){
    if(userInput[i] == colorPattern[i]){
        console.log("Same value");
        points++;
        if (points > highestPoints) {
            highestPoints = points;
        }
        highestScore.innerHTML = `Highest Score : ${highestPoints}`;
        score.innerHTML = `Score : ${points}`;
        if (userInput.length == colorPattern.length) {
            setTimeout(startGame,2000);
        }
    }else{
        h3.innerHTML = `Game Over! <br> Press any key to continue `;
        endGame();
    }
}

//Tracking btn press
let btnPress = function (){
    let event = this;
    btnFlash(event);
    userInput.push(event.classList[1]);
    checkAns(userInput.length-1);
}

//Getting inputs
let startGame = function (){
    failed = false;
    userInput = [];
    level = level + 1;
    h3.innerText = `Level : ${level}`;
    colorPattern.push(flicker()); 
    for (const element of colors) {
        element.addEventListener("click", btnPress);
    }
}




