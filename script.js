const wrongbox = document.getElementById("wrong-box");
const rightbox = document.getElementById("right-box");
const buttonbox = document.getElementById("letter-buttons");
const fruits = ["banana", "apple", "grapes", "watermelon", "grapefruit"]
const letterArray = Array.from("abcdefghijklmnopqrstuvwxyz"); 
const hangmanArray = Array.from(document.querySelectorAll('[data-hangman]'));
const startButton = document.getElementById("startbutton");
const letters = letterArray.map((letter) => `<button class="letter">`+letter+`</button>`);
buttonbox.innerHTML = letters.join(" ");
const startScreen = document.getElementById("startscreen");
const letterQuery = Array.from(document.querySelectorAll(".letter"));
startButton.addEventListener("click", startGame);

function startGame(){
    randomWord();
    document.body.addEventListener("keyup", checkKey);
    letterQuery.map((letterFunction) => letterFunction.setAttribute("onclick", "checkLetter(this.innerHTML)"));
    startScreen.style.visibility = "hidden";
}

//this is a new branch

function randomWord(){
    const shuffleNumber = Math.floor(Math.random() * 5);
    return fruits[shuffleNumber];
}

const newFruit = randomWord();

let text = "";
for(let n in newFruit){
    text+= `<span><p class="fruit-letter">`+newFruit[n]+`</p></span>`;
}
rightbox.innerHTML = text;

const wrongLetters = [];
const storeLetter = [];

function checkKey(event){
    const ltr = event.key;
    if(letterArray.includes(ltr)){
        checkLetter(ltr);
    }
    if(!letterArray.includes(ltr)){
        alert(ltr+" isn't a letter, friend");
    }
}

let loseScore = 0;

function checkLetter(ltrchk){
    const fruit = newFruit;
    if(storeLetter.includes(ltrchk)){
        alert("you typed "+ltrchk+" already");
        return false;
    }
    if(fruit.includes(ltrchk)){
        loopLetter(ltrchk);
    }
    if(!fruit.includes(ltrchk)){
        const addLose = loseScore++;
        wrongLetters.push("<p>"+ltrchk+"</p>");
        hangmanArray[addLose].style.visibility="visible";
        if(loseScore == 6){
            endGame("TRY AGAIN");
        }    
    }   
    wrongbox.innerHTML= wrongLetters.join(" ");
    storeLetter.push(ltrchk);  
}

let winScore = 0;

function loopLetter(ltrlp){
    const fruitHTML = Array.from(document.querySelectorAll(".fruit-letter"));
    for(let f in fruitHTML){
        if(fruitHTML[f].innerHTML === ltrlp){
            fruitHTML[f].style.visibility="visible";
            winScore++;
            if(winScore == fruitHTML.length){
                endGame("WINNER!");
            }
        }
    }
}

function endGame(message){
    startScreen.style.visibility = "visible";
    document.getElementById("startmessage").innerText = message;
    document.body.removeEventListener("keyup", checkKey);
    letterQuery.map((letterFunction) => letterFunction.removeAttribute("onclick", "checkLetter(this.innerHTML)"));
}