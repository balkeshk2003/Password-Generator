const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const indicator = document.querySelector("[data-indicator]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#upper");
const lowercaseCheck = document.querySelector("#lower");
const numbersCheck = document.querySelector("#number");
const symbolsCheck = document.querySelector("#symbol");
const generateBtn = document.querySelector(".generate");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "~`!@#$%^&*()_={}[]:';<>,./?";


let password = "";
let passwordLength = inputSlider.value;
handleSlider();
//set strength circle color to grey

//set password length
function handleSlider(){
    passwordLength = 10;
    inputSlider.value = passwordLength;
    lengthDisplay.innerHTML= inputSlider.value;
    uppercaseCheck.checked=true;
}

function changeSlider(){
    lengthDisplay.innerHTML= inputSlider.value;
    passwordLength = inputSlider.value;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "0 0 15px 5px"+color;
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}
function getRndNumber(){
    return getRndInteger(0,9);
}
function getRndLower(){
    return String.fromCharCode(getRndInteger(97,123));
}
function getRndUpper(){
    return String.fromCharCode(getRndInteger(65,91));
}
function getSymbols(){
    return symbols.charAt(getRndInteger(0,symbols.length));
}

function calcStrength(count){
    let hasUpper=false;
    let hasLower=false;
    let hasNumber=false;
    let hasSymbol=false;

    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(symbolsCheck.checked) hasSymbol=true;
    if(numbersCheck.checked) hasNumber=true;

    
    if(((passwordLength>=8) && count>=3)){
        setIndicator("#0f0");
    }
    else if(passwordLength>=6 && count>=2){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
       await navigator.clipboard.writeText(passwordDisplay.value);
       copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
        console.log(e);
    }
    copyMsg.classList.add("active");
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },1000);
}

function generate(){
    passwordDisplay.value="";
    password="";

    let count=0;
    let hasUpper=false;
    let hasLower=false;
    let hasNumber=false;
    let hasSymbol=false;

    if(uppercaseCheck.checked) {hasUpper=true; count++;}
    if(lowercaseCheck.checked) {hasLower=true; count++;}
    if(symbolsCheck.checked) {hasSymbol=true; count++;}
    if(numbersCheck.checked) {hasNumber=true; count++;}

    let i=0;
    while(i<passwordLength){
        let choice = getRndInteger(1,5);
        if(choice==1 && hasUpper){
            password = password+getRndUpper();
            i++;
        }
        else if(choice==2 && hasLower){
            password = password+getRndLower();
            i++;
        }
        else if(choice==3 && hasNumber){
            password = password+getRndNumber();
            i++;
        }   
        else if(choice==4 && hasSymbol){
            password = password+getSymbols();
            i++;
        }
    }
    passwordDisplay.value=password;
    calcStrength(count);
}


