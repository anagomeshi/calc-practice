let firstNumber = 0;
let secondNumber = 0;
let ans = 0;
let currentScore = 0;

let displayText = "";

let isKeyInputAccepted = false;

function startGame(){
    document.querySelector(".title-page").classList.remove("page-show");
    document.querySelector(".count-page").classList.add("page-show");
    startCount();
}

function startCount(){
    let count = 3;

    document.querySelector(".count-page span").textContent = count;

    const countdown = setInterval(() => {
        count--;

        if (count > 0) {
            document.querySelector(".count-page span").textContent = count;
        } else {
            clearInterval(countdown);

            // ゲーム開始の処理
            generateQuestion();

            document.querySelector(".count-page").classList.remove("page-show");
            document.querySelector(".game-page").classList.add("page-show");

            isKeyInputAccepted = true;

            gameTimer();

            currentScore = 0;
            displayText = "";
            
            document.querySelector(".current-score").textContent = "Score 0";
            document.querySelector('.display-text').textContent = "";
        }
    }, 1000);
}

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

function gameTimer(){
    let count = 90;

    document.querySelector(".timer").textContent = `Timer ${count}`;

    const countdown = setInterval(() => {
        count--;

        if (count > 0) {
            document.querySelector(".timer").textContent = `Timer ${count}`;
        } else {
            clearInterval(countdown);

            document.querySelector(".game-page").classList.remove("page-show");
            document.querySelector(".result-page").classList.add("page-show");
            
            document.querySelector(".result-page span").textContent = currentScore;
        }
    }, 1000);
}

function updateCurrentScore(isCorrect){
    // 答えとなる数字の平方根を取り、小数点以下を切り捨て、それを10倍したものを獲得できるスコアとする
    const score = Math.floor(Math.sqrt(ans)) * 10;

    if(isCorrect) currentScore += score;
    else currentScore -= score;

    if(currentScore < 0) currentScore = 0;

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
    setTimeout(next, 500);
}

function answer(){
    isKeyInputAccepted = false;

    document.querySelectorAll(".numpad button").forEach(button => {
        button.disabled = true;
    });

    if(Number(displayText) == ans){
        updateCurrentScore(true);

        document.querySelector('.circle-img').classList.add("show");
    }else{
        updateCurrentScore(false);

        document.querySelector('.cross-img').classList.add("show");
        document.querySelector('.actual-answer').textContent = ans;
    }
}

function next(){
    generateQuestion();

    displayText = "";
    document.querySelector('.display-text').textContent = "";

    document.querySelector('.display').querySelector(".show").classList.remove("show");
    document.querySelector('.actual-answer').textContent = "";

    isKeyInputAccepted = true;

    document.querySelectorAll(".numpad button").forEach(button => {
        button.disabled = false;
    });
}

function returnTitle(){
    document.querySelector(".result-page").classList.remove("page-show");
    document.querySelector(".title-page").classList.add("page-show");
}
