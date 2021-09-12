const wrongbox = document.getElementById("wrong-box");
const rightbox = document.getElementById("right-box");
const buttonbox = document.getElementById("letter-buttons");
const fruits = ["banana", "apple", "grapes", "watermelon", "grapefruit"]
const letterArray = Array.from("abcdefghijklmnopqrstuvwxyz"); 
const hangmanArray = Array.from(document.querySelectorAll('[data-hangman]'));


let text = "";

function shuffleNumber(){
    return Math.floor(Math.random() * 5);
}
function randomWord(){
    const randomFruit = shuffleNumber();
   return fruits[randomFruit];
}

const newFruit = randomWord();
for(let n in newFruit){
    text+= `<span><p class="fruit-letter">`+newFruit[n]+`</p></span>`;
}
rightbox.innerHTML = text;

let buttons = "";
for(let l in letterArray){
    buttons+=`<button class="letter" onclick="checkLetter(this.innerHTML)">`+letterArray[l]+`</button>`;
}

buttonbox.innerHTML = buttons;

const wrongLetters = [];
const storeLetter = [];

document.body.addEventListener("keyup", checkKey);

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
            alert("Try again");
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
                alert("Congratulations!");
            }
        }
    }
}

