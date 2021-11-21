const numberBttn = document.querySelectorAll('[data-num]');
const operationBttn = document.querySelectorAll('[data-op]');
const ceBttn = document.querySelector('[data-clear]');
const delBttn = document.querySelector('[data-delete]');
const periodBttn = document.querySelector('[data-period]');
const equalBttn = document.querySelector('[data-equal]');
const previous = document.querySelector('.prevNum');
const current = document.querySelector('.currentNum');

let firstValue='';
let secondValue='';
let currentOp = null;
//18
numberBttn.forEach((numBttn) =>
    numBttn.addEventListener('click', () => appendNumber(numBttn.textContent))
);
operationBttn.forEach((opBttn) => {
    opBttn.addEventListener('click', () => chooseOp(opBttn.textContent))
});

periodBttn.addEventListener('click', () =>{
    if (current.textContent == '') return
    if (current.textContent.includes('.')) return
    else current.textContent += '.';
})

equalBttn.addEventListener('click', () => compute());

ceBttn.addEventListener('click', () =>{
    current.textContent='';
    previous.textContent='';
    firstValue='';
    secondValue='';
    currentOp=null;
});

delBttn.addEventListener('click', () =>{
    current.textContent = current.textContent
    .toString()
    .slice(0,-1);
})

function appendNumber(num){
    current.textContent += num;
}

function chooseOp(op){
    if (current.textContent === '') return;
    if (previous.textContent !== ''){compute()}
    currentOp = op;
    firstValue = current.textContent;
    previous.textContent = current.textContent + currentOp;
    current.textContent = ''; 
}

function compute(){
    if (previous.textContent.includes ('÷') && current.textContent === '0'){
        previous.textContent = previous.textContent + current.textContent + ' = ';
        current.textContent = 'ERROR';
        return
    }
    secondValue = current.textContent;
    previous.textContent = previous.textContent + current.textContent + ' = ';
    current.textContent = roundNumber(operate(currentOp, firstValue, secondValue));
}

function roundNumber(num){
    return Math.round(num*1000)/1000;
}

function operate (op, a, b){
    let res;
    a = Number(a);
    b = Number(b);
    if (op === '+'){
        res = a+b;
    } else
    if (op === '-'){
        res = a-b;
    } else 
    if (op === '×') {
        res = a*b;
    } else
    if (op === '÷'){
        res = a/b;
    } else
    if (op === '%'){
        res = a%b;
    }
    return res;
}