// Functions for basic math operations
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;
// const operate = (func, a, b) => func(a,b);

// Callback Functions
let isResultPrinted = false;            // raise flag when result is calculated successfully
const getResult = () => {
    let expression = result.innerText;
    let operatorsFirst = ['*', '/', '*-', '/-'];
    let operatorsLast = ['+', '-'];
    let holder = 0;

    // if  expression is 0, or last char is an operator, return
    if (['+', '-', '*', '/'].includes(expression.slice(-1)) || expression.length < 3)
        return

    let numberList = expression.split(/\D/).filter(i => i).map(i => parseInt(i));
    let operatorList = expression.split(/[0-9]/).filter(i => i);

    // if expression begins with -, turn first number into a negative number
    if (expression.slice(0,1) == '-') {
        numberList[0] *= -1;
        operatorList.shift();
    };
    console.log(numberList);
    console.log(operatorList);

    // Do * and / first, according to order of operation
    let operatorListLen = operatorList.length;      // Important, for length of list changes
    let indexAdjust = 0;
    for (let I = 0; I < operatorListLen; I++) {
        const i = I - indexAdjust;
        if (operatorsFirst.includes(operatorList[i])) {
            if (operatorList[i] == '*')
                holder = multiply(numberList[i], numberList[i+1]);
            else if (operatorList[i] == '/')
                holder = divide(numberList[i], numberList[i+1]);
            else if (operatorList[i] == '*-')
                holder = multiply(numberList[i], numberList[i+1] * -1);
            else if (operatorList[i] == '/-')
                holder = divide(numberList[i], numberList[i+1] * -1);
            operatorList.splice(i, 1);
        numberList.splice(i, 2, holder);
        indexAdjust ++;
        }
    }
    console.log(numberList);
    console.log(operatorList);

    // Do + and - last
    operatorListLen = operatorList.length;      // Important, for length of list changes
    indexAdjust = 0;
    for (let I = 0; I < operatorListLen; I++) {
        const i = I - indexAdjust;
        if (operatorsLast.includes(operatorList[i])) {
            if (operatorList[i] == '+')
                holder = add(numberList[i], numberList[i+1]);
            else if (operatorList[i] == '-')
                holder = subtract(numberList[i], numberList[i+1]);
        operatorList.splice(i, 1);
        numberList.splice(i, 2, holder);
        indexAdjust ++;
        }
    }

    console.log(numberList);
    console.log(operatorList);

    // Write result to display, and round to 5 decimal
    result.innerText = Math.round(numberList[0]*100000)/100000;
    // trigger flag
    isResultPrinted = true;
};


// PAGE INTERACTIVITY

// Page elements
const result = document.querySelector('.result');
const clearButton = document.querySelector('#CE');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('#equal')
const subtractButton = document.querySelector('#subtract');

// Listening Events

// Clear button
clearButton.addEventListener('click', () => {
    result.innerText = 0;
});

// Number button
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (isResultPrinted == true) {
            result.innerText = 0;
            isResultPrinted = false;
        }
        if (result.innerText == 0)
            result.innerText = button.innerText;
        else
            result.innerText += button.innerText;
    });
});

// Operator buttons
const operatorSigns = ['+', '-', '*', '/'];
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // if (result.innerText == 0)
        //     result.innerText = button.innerText;
        // else
        //     result.innerText += button.innerText;

        // Check for cases when '-' is used as a negative sign
        // if (result.innerText == '-')
        //     return
        // Reset flag
        isResultPrinted = false;

        if (result.innerText.slice(-1) == '-') {
            console.log(result.innerText.slice(-1));
            if (operatorSigns.includes(result.innerText.slice(-2, -1)))
                return;
        }

        if (operatorSigns.includes(result.innerText.slice(-1)))
            result.innerText = result.innerText.slice(0,-1)     + button.innerText;
        else
            result.innerText += button.innerText;
    });
});

// Subtract buttons
subtractButton.addEventListener('click', () => {
    // reset flag
    isResultPrinted = false;

    if (result.innerText == 0) {
        result.innerText = subtractButton.innerText;
        return;
    }

    if (['+','-'].includes(result.innerText.slice(-1)))
        result.innerText = result.innerText.slice(0,-1) + subtractButton.innerText;
    else
        result.innerText += subtractButton.innerText;
});

// Equal Button
equalButton.addEventListener('click', getResult);


