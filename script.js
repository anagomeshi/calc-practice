let firstNumber = 0;
let secondNumber = 0;
let ans = 0;

let displayText = "";

// 1~maxまでランダムな整数を生成
function getRandomNumber(max) {
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

    setTimeout(next(), 150);
}

function answer(){
    if(Number(displayText) == ans){
        document.querySelector('.correct-comment').classList.add("show");
    }else{
        document.querySelector('.uncorrect-comment').classList.add("show");
        document.querySelector('.actual-answer').textContent = ans;
    }

    document.querySelectorAll(".numpad button").forEach(button => {
        if (!button.classList.contains('enter-button')) button.disabled = true;
    });
}

function next(){
    generateQuestion();

    displayText = "";
    document.querySelector('.display-text').textContent = "";

    document.querySelector('.comments').querySelector(".show").classList.remove("show");

    document.querySelectorAll(".numpad button").forEach(button => {
        if (!button.classList.contains('enter-button')) button.disabled = false;
    });
}

// 開始時に一度生成
generateQuestion();
