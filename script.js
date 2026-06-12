let firstNumber = 0;
let secondNumber = 0;
let ans = 0;

let firstNumberDigits = 2;
let secondNumberDigits = 2;
let signType = "multiplication";

let displayText = "";

let isKeyInputAccepted = true;
let isSettingsShow = false;

const radioButtons = document.querySelector(".settings-contents").querySelectorAll('input[type="radio"]');

radioButtons.forEach(radio => {
    radio.addEventListener('change', changeSettings);
});

function changeSettings(){
    const firstNumberDigitsValue = document.querySelector('input[name="first-number-digits"]:checked')?.value;
    const secondNumberDigitsValue = document.querySelector('input[name="second-number-digits"]:checked')?.value;
    const signTypeValue = document.querySelector('input[name="sign-type"]:checked')?.value;
    let signTypeText = "";

    if (firstNumberDigitsValue && secondNumberDigitsValue && signTypeValue) {
        firstNumberDigits = firstNumberDigitsValue;
        secondNumberDigits = secondNumberDigitsValue;
        signType = signTypeValue;

        if(signType == "addition"){
            signTypeText = "足し算";
        }else if(signType== "multiplication"){
            signTypeText = "掛け算";
        }

        document.querySelector(".settings-contents span").textContent = `${firstNumberDigits}桁 と ${secondNumberDigits}桁の ${signTypeText}`;
    }
}

function toggleSettingsView(){
    isKeyInputAccepted = !inKeyInputAccepted;
    isSettingsShow = !isSettingsShow;

    if(isSettingsShow){
        document.querySelector(".settings").classList.add("show");
    }else{
        generateQuestion();
        document.querySelector(".settings").classList.remove("show")
    }
}

window.addEventListener('keydown', (event) => {
    if(isKeyInputAccepted){
        if (event.key === 'Enter') {
            enter();
            return;
        }

        if (event.key === 'Backspace') {
            deleteDisplayInput();
            return;
        }

        // 正規表現を使って「0から9の1文字」であるかを判定
        if (/^[0-9]$/.test(event.key)) {
            displayInput(event.key);
            return;
        }
    }
});

// 桁数に応じたランダムな整数を生成
function getRandomNumber(digits) {
    const min = Math.pow(10, digits - 1); 
    
    const max = Math.pow(10, digits) - 1; 
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion(){
    firstNumber = getRandomNumber(firstNumberDigits);
    secondNumber = getRandomNumber(secondNumberDigits);

    if(signType == "addition"){
        ans = firstNumber + secondNumber;
    }else if(signType == "multiplication"){
        ans = firstNumber * secondNumber;
    }

    document.querySelector('.first-number').textContent = firstNumber;
    document.querySelector('.second-number').textContent = secondNumber;
    
    if(signType == "addition"){
        document.querySelector(".sign").textContent = "+";
    }else if(signType == "multiplication"){
        document.querySelector(".sign").textContent = "×";
    }
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
    isKeyInputAccepted = !inKeyInputAccepted;
    answer();

    setTimeout(next, 1000);
}

function answer(){
    if(Number(displayText) == ans){
        document.querySelector('.circle-img').classList.add("show");
    }else{
        document.querySelector('.cross-img').classList.add("show");
        document.querySelector('.actual-answer').textContent = ans;
    }

    document.querySelectorAll(".numpad button").forEach(button => {
        button.disabled = true;
    });
}

function next(){
    generateQuestion();

    displayText = "";
    document.querySelector('.display-text').textContent = "";

    document.querySelector('.display').querySelector(".show").classList.remove("show");
    document.querySelector('.actual-answer').textContent = "";

    document.querySelectorAll(".numpad button").forEach(button => {
        button.disabled = false;
    });

    isKeyInputAccepted = !inKeyInputAccepted;
}


changeSettings();

generateQuestion();
