let firstNumber = 0;
let secondNumber = 0;
let ans = 0;

let firstNumberDigits = 2;
let secondNumberDigits = 2;
let signType = "multiplication";

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
    isSettingsShow = !isSettingsShow;

    if(isSettingsShow){
        document.querySelector(".settings").classList.add("show");
    }else{
        generateQuestion();
        document.querySelector(".settings").classList.remove("show")
    }
    
    isKeyInputAccepted = !isKeyInputAccepted;
    console.log(isKeyInputAccepted);
}

window.addEventListener('keydown', (event) => {
    if(isKeyInputAccepted && event.key === 'Enter'){
        showAnswer();
        return;
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

function showAnswer(){
    isKeyInputAccepted = !isKeyInputAccepted;
    document.querySelector(".show-answer-button").disabled = true;

    document.querySelector(".answer-box").textContent = ans;

    setTimeout(next, 1000);
}

function next(){
    generateQuestion();

    document.querySelector('.answer-box').textContent = "";

    isKeyInputAccepted = !isKeyInputAccepted;
    document.querySelector(".show-answer-button").disabled = false;
}

changeSettings();

generateQuestion();
