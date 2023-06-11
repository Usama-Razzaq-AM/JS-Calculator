let inputBox=document.querySelector(".full-width");
let screen='0';
let output="";
let previuosOperator=null;
let runningTotal=0;

function init() {
    document.querySelector(".calculator").addEventListener("click", function (event) {
        let press=event.target.innerText;
        buttonClicked(press);
    });
}
init();

function buttonClicked(value) {
    if(isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }

    inputBox.innerText=screen;
}

function handleNumber(value) {
    if(screen==='0') {
        screen=value;
    } else {
        screen+=value;
    }
}

function handleSymbol(value) {
    switch (value) {
        case 'C':
            screen='0';
            break;
        case '=':
            if (previuosOperator==null) {
                //do nothing
            }
            flushOperation(parseInt(screen));
            screen=""+runningTotal;
            previuosOperator=null;
            runningTotal=0;
            break;
        case '←':
            backspace();
            break;
        case '+':
        case '-':
        case '÷': 
        case '×':
            handleMath(value);   
    }
}

function backspace() {
    if (screen.length==1) {
        screen='0';
    } else {
        screen=screen.substring(0,screen.length-1);
    }
}

function flushOperation(intScreen) {
    if (previuosOperator==='+') {
        runningTotal+=screen;
    } else if (previuosOperator==='-') {
        runningTotal-=screen;
    } else if (previuosOperator==='×') {
        runningTotal*=screen;
    } else if (previuosOperator==='÷') {
        runningTotal/=screen;
    }
}

function handleMath(value) {
    if (screen==='0') {
        //do nothing
        return;
    }
    const intScreen=parseInt(screen);
    if (runningTotal===0) {
        runningTotal=intScreen;
    } else {
        flushOperation(intScreen);
    }
    previuosOperator=value;
    screen='0';
}