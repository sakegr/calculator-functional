const btn = document.querySelector(".keys");
const upScreen = document.querySelector(".up-screen");
const downScreen = document.querySelector(".down-screen");

let downOperand = "";
let upOperand = "";
let operation = "";

let equalPress = false;

btn.addEventListener("click", (e) => {
  //   console.log(e.target);
  if (e.target.classList.contains("num")) {
    // console.log(e.target.textContent);
    appendNumber(e.target.textContent);
    updateScreen();
  }

  if (e.target.classList.contains("operator")) {
    // console.log(e.target.textContent);
    chooseOperator(e.target.textContent);
    updateScreen();
  }
  if(e.target.classList.contains("equal")){
    calculate();
    updateScreen();
    equalPress = true;
  }
  if(e.target.classList.contains("ac")){
    downOperand = "";
    operation = "";
    upOperand = "";
    updateScreen();
  }
  if(e.target.classList.contains("pm")){
    if(!downOperand)return;
    downOperand *= -1;
    updateScreen();
  }

  if(e.target.classList.contains("percent")){
    if(!downOperand)return;
    downOperand = downOperand / 100
    updateScreen();
    equalPress = true;
  }
});

const appendNumber = (num) => {
  if (num === "0" && downOperand === "0") return;

  if (num === "." && downOperand.includes(".")) return;

  if (downOperand === "0" && num !== ".") {
    downOperand = num;
    return;
  }

  if (downOperand.length > 10) return;

  downOperand += num;

  if(equalPress){
    downOperand = num;
    equalPress = false;
    return;
  }
};

const updateScreen = () => {
  downScreen.textContent = downOperand;
  upScreen.textContent = `${upOperand} ${operation}`;
};

const chooseOperator = (op) => {
    if(upOperand){
        calculate();
    }


  operation = op;
  upOperand = downOperand;
  downOperand = "";
};

const calculate = () => {
    let calculation;

    let up = Number(upOperand);
    let down = Number(downOperand);

    switch (operation) {
        case '+':
          calculation = up + down;
          break;
        case '–':
          calculation = up - down;
          break;
        case '×':
          calculation = up * down;
          break;
        case '÷':
          calculation = up / down;
          break;
        default:
          return;
    };
    downOperand = calculation;
    upOperand = "";
    operation = "";

}