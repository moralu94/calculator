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
let currentOp = undefined;

numberBttn.forEach((numBttn) =>
    numBttn.addEventListener('click', () => appendNumber(numBttn.textContent))
);
operationBttn.forEach((opBttn) => {
    opBttn.addEventListener('click', () => chooseOp(opBttn.textContent))
});

equalBttn.addEventListener('click', () => operate)

ceBttn.addEventListener('click', () =>{
    current.textContent='';
    previous.textContent='';
    firstValue='';
    secondValue='';
    currentOp=undefined;
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
    if (current === '') return
    if (previous === '') return
    currentOp = op;

    firstValue=current.textContent;
    previous.textContent = current.textContent + currentOp;
    current.textContent = '';
}

function operate (op, a, b){
    switch (op){
        case '+': return a+b;
    }
}

