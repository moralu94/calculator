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

numberBttn.forEach((numBttn) =>
    numBttn.addEventListener('click', () => appendNumber(numBttn.textContent))
);
operationBttn.forEach((opBttn) => {
    opBttn.addEventListener('click', () => chooseOp(opBttn.textContent))
});

periodBttn.addEventListener('click', addPeriod());

function addPeriod() {
    if (current.textContent == '') return
    if (current.textContent.includes('.')) return
    else current.textContent += '.';
}

equalBttn.addEventListener('click', () => compute());

ceBttn.addEventListener('click', clearEverything());

function clearEverything() {
    current.textContent='';
    previous.textContent='';
    firstValue='';
    secondValue='';
    currentOp=null;
}

delBttn.addEventListener('click', deleteNum()); 

function deleteNum(){
    current.textContent = current.textContent
    .toString()
    .slice(0,-1);
}

function appendNumber(num){
    if (current.textContent.length === 12) return
    current.textContent += num;
}

function chooseOp(op){
    if (current.textContent === '') return;
    if ((previous.textContent !== '') && (!previous.textContent.includes ('='))) compute();
    currentOp = op;
    firstValue = current.textContent;
    previous.textContent = current.textContent + currentOp;
    current.textContent = ''; 
    op = null;
}

function compute(){
    if (previous.textContent.includes ('÷') && current.textContent === '0'){
        previous.textContent = previous.textContent + current.textContent + ' = ';
        current.textContent = 'ERROR';
        return
    }
    if (previous.textContent == '') return
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
    if (op === '×' || op === '*')  {
        res = a*b;
    } else
    if (op === '÷' || op === '/'){
        res = a/b;
    } else
    if (op === '%'){
        res = a%b;
    } else return;
    return res;
}

window.addEventListener ('keydown', kbInput);

function kbInput (e){
    if (e.key >= 0 && e.key <= 9) appendNumber (e.key);
    if (e.key == '+' || e.key == '-' || e.key == '%' || e.key == '*' || e.key == '/') chooseOp(e.key);
    if (e.key == '=' || e.key == 'Enter') compute();
    if (e.key == '.') addPeriod();
    if (e.key == 'Backspace') deleteNum();
    if (e.key == 'Escape' || e.key == 'Delete') clearEverything();
}