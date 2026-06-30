let firstNumber = 0;
let secondNumber = 0;
let ans = 0;
let currentScore = 0;

let displayText = "";

let isKeyInputAccepted = false;

window.addEventListener("keydown", (event) => {
    if(isKeyInputAccepted){
        // Enterキーの検知
        if (event.key === "Enter"){
            enter();
            return;
        }

        // Backspaceキーの検知
        if (event.key === "Backspace"){
            deleteDisplayInput();
            return;
        }

        // 正規表現を使って「0から9の1文字」であるかを判定
        if (/^[0-9]$/.test(event.key)){
            displayInput(event.key);
            return;
        }
    }
});

function startGame(){
    generateQuestion();

    if(localStorage.getItem('currentScore') != null){
        currentScore = Number(localStorage.getItem('currentScore'));
    }else{
        localStorage.setItem('currentScore', 0);
        currentScore = 0;
    }

    displayText = "";

    document.querySelector(".title-page").classList.remove("page-show");
    document.querySelector(".game-page").classList.add("page-show");

    document.querySelector(".current-score").textContent = `Score ${currentScore}`;
    document.querySelector('.display-text').textContent = "";

    isKeyInputAccepted = true;

    document.querySelectorAll(".numpad button").forEach(button => {
        button.disabled = false;
    });
}

function finishGame(){
    document.querySelector(".game-page").classList.remove("page-show");
    document.querySelector(".result-page").classList.add("page-show");

    document.querySelector('.display').querySelector(".show").classList.remove("show");
    document.querySelector('.actual-answer').textContent = "";
    
    document.querySelector(".result-page span").textContent = currentScore;
}

function updateCurrentScore(){
    currentScore += Math.floor(Math.sqrt(ans)) * 10;
    localStorage.setItem('currentScore', currentScore);

    document.querySelector(".current-score").textContent = `Score ${currentScore}`;
}

// 1~maxまでランダムな整数を生成
function getRandomNumber(max){
    return Math.floor(Math.random() * max) + 1;
}

function generateQuestion(){
    firstNumber = getRandomNumber(99);
    secondNumber = getRandomNumber(99);
    ans = firstNumber * secondNumber;

    document.querySelector('.first-number').textContent = firstNumber;
    document.querySelector('.second-number').textContent = secondNumber;
}

function displayInput(number){
    if (displayText === "" && number === "0") return;

    // 文字列の末尾に数字を結合する
    displayText += number;
    
    document.querySelector('.display-text').textContent = displayText;
}

function deleteDisplayInput(){
    displayText = displayText.slice(0, -1);;

    document.querySelector('.display-text').textContent = displayText;
}

function clearDisplayInput(){
    displayText = "";

    document.querySelector('.display-text').textContent = "";
}

function enter(){
    answer();
}

function answer(){
    isKeyInputAccepted = false;

    document.querySelectorAll(".numpad button").forEach(button => {
        button.disabled = true;
    });

    if(Number(displayText) == ans){
        document.querySelector('.circle-img').classList.add("show");

        updateCurrentScore();

        setTimeout(next, 500);
    }else{
        localStorage.setItem('currentScore', 0);

        document.querySelector('.cross-img').classList.add("show");

        document.querySelector('.actual-answer').textContent = ans;

        setTimeout(finishGame, 1000);
    }
}

function next(){
    generateQuestion();

    displayText = "";

    document.querySelector('.display-text').textContent = "";

    document.querySelector('.display').querySelector(".show").classList.remove("show");

    isKeyInputAccepted = true;

    document.querySelectorAll(".numpad button").forEach(button => {
        button.disabled = false;
    });
}

function returnTitle(){
    document.querySelector(".result-page").classList.remove("page-show");
    document.querySelector(".title-page").classList.add("page-show");
}
