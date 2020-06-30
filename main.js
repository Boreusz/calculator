// Calculation related only functions and methods

let add = (a, b) => a + b;

let subtract = (a, b) => a - b;

let multiply = (a, b) => a * b;

let divide = (a, b) => a / b;


let operate = (a, b, operator) =>{
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "Error";
    }};

// DOM selectors for calc functionalities & method holders for values

let isDotAvailable = true;
let previousValue = '';
let currentValue = '';
let digitHolder = [];
let operatorHolder = [];
let helper  = null;
let result = null;
let equationWasDone = false;
let tmp = null;


const topDisplay = document.querySelector('#top');
const bottomDisplay = document.querySelector('#bottom');

const operationButtons = document.querySelectorAll('.operator');
const numberButtons = document.querySelectorAll('.button');

const deleteButton = document.querySelector('#delete')
const clearButton = document.querySelector('#clear')
const dotButton = document.querySelector('#oprDot')
const plusMinusButton = document.querySelector('#plusMinus')
const equalButton = document.querySelector('#equal');

// Listeners for each of buttons

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        bottomDisplay.textContent += button.textContent;
        currentValue += button.textContent;
    })
});

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        previousValue += currentValue + button.textContent;
        topDisplay.textContent =  previousValue;
        if(equationWasDone == true){
            previousValue = currentValue + button.textContent;
            topDisplay.textContent = currentValue +button.textContent;
            equationWasDone = false;
        }
        operatorHolder.push(button.textContent);
        digitHolder.push(parseFloat(currentValue));
        currentValue = '';
        bottomDisplay.textContent = '';
        isDotAvailable = true;
    })
});

deleteButton.addEventListener('click', delet);
clearButton.addEventListener('click', clear);
dotButton.addEventListener('click', () =>{
    if(isDotAvailable){
        bottomDisplay.textContent += dotButton.textContent;
        currentValue += '.';
        isDotAvailable = false;
    }});
plusMinusButton.addEventListener('click', plusMinus);
equalButton.addEventListener('click', solution)

// Essential functions to make calculator usable

function clear(){
    topDisplay.textContent = '';
    bottomDisplay.textContent = '';
    isDotAvailable = true;
    previousValue = '';
    currentValue = '';
    digitHolder = [];
    operatorHolder = [];
    helper  = null;
    result = null;
    equationWasDone = false;
};

function delet(){
    currentValue = currentValue.slice(0, length -1);
    bottomDisplay.textContent = currentValue;
    if(currentValue.indexOf('.') == -1){
    isDotAvailable = true;
    }; };

function plusMinus(){
    if(currentValue > 0){
        currentValue = -currentValue;
        bottomDisplay.textContent = currentValue;
    }else if(currentValue < 0){
        currentValue = Math.abs(parseInt(currentValue));
        bottomDisplay.textContent = currentValue;
    }else return;
}

function solution(){
    topDisplay.textContent += currentValue;
    digitHolder.push(parseFloat(currentValue));
    operationFinder('*');
    operationFinder('/');
    operationFinder('-');
    operationFinder('+');
    tmp  = digitHolder[0];
    clear();
    bottomDisplay.textContent = tmp;
    currentValue = tmp;
    equationWasDone = true;
}

function operationFinder(operator){
    while(true){
        helper = operatorHolder.indexOf(operator);
        if(helper == -1){
            break;
        }
        if(digitHolder+1 == 0 && operator == '/'){
            clear();
            bottomDisplay.textContent = "Can't divide by 0";
        }
        result = operate(digitHolder[helper],digitHolder[helper + 1],operatorHolder[helper]);
        operatorHolder.splice(helper, 1);
        digitHolder.splice(helper, 2, result);

    }
}
