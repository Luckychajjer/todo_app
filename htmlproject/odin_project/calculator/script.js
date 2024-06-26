
let operatorValue="";
let currOut = "";
let a = 0;
let ans="";

const output = document.querySelector(".output");
const numArr = document.querySelectorAll(".num").forEach(e=>e.addEventListener("click",()=>{inputvalue(e)}));
const eql = document.querySelector(".eql").addEventListener("click",(eql)=>{equate(eql);output.textContent = a;});
const allClear =document.querySelector(".ac").addEventListener("click",()=>{currOut=""; update(currOut);});
const operator = document.querySelectorAll(".operator").forEach(e=>e.addEventListener("click",()=>{equate(e)}));
const percentage = document.querySelector(".percentage");
percentage.addEventListener("click",()=>{inplace(percentage);});
const signChange = document.querySelector(".signChange")
signChange.addEventListener("click",()=>{inplace(signChange)});

function inplace(e){
    currOut = parseFloat(output.textContent);
    // console.log(e.textContent);
    if(e.textContent == "%"){
        currOut/=100;
    }   
    else{
        currOut*=-1;
    } 
    update(currOut);
}
function inputvalue(e){
    if(currOut.length<8){
        currOut+=e.textContent;
        update(currOut);
        // console.log(currOut);
    }
}
function update(ans){
    output.textContent = ans;
}
function equate(e){
    let b = parseFloat(currOut);
    if(currOut == ""){
        b = 0;
    }
    switch (operatorValue){
        case "+":
            a +=b;
            break;
        case "-":
            a -=b;
            break;
        case "*":
            a *= b;
            break;
        case "/":
            if(b === 0){
                a = "inf";
            }
            else{
                a /=b;
                a = a.toPrecision(8);
            }
            break;
        default:
            a = b;
    } 
    operatorValue = e.textContent;
    update(a);
    currOut = "";
}
