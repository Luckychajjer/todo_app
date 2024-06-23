function getComputerChoice(){
    var a=  Math.floor(Math.random()*3);
    if(a==0){
      return "rock";
    }
    else if(a==1){
      return "paper";
    }
    else{
      return "scissor";
    }
}

function playRound(computerChoice,humanChoice){
    // humanChoice = humanChoice.toLowerCase();
    ans = "";
    if(computerChoice == humanChoice ){
      ans = "Both picked the same "+humanChoice;
    }
    else if((computerChoice =="rock" && humanChoice =="paper")||(computerChoice=="paper" && humanChoice=="scissor")||(computerChoice=="scissor" && humanChoice=="rock")){
      ans ="You Win! "+humanChoice +" beats "+computerChoice;
      playerScore+=1;
    }
    else{
      computerScore+=1;
      ans = "You lose! "+computerChoice +" beats "+humanChoice;
    }
    
    return ans;
}
function game(){
  para.textContent="";
  var textOutput = playRound(getComputerChoice(),humanChoice)
  outputStatement.textContent = textOutput;
    outputScore.textContent=`Computer score: ${computerScore}  Player score: ${playerScore}`;
  if(playerScore==3){
    para.textContent = "You Win!!🎉";
    playerScore=0;
    computerScore=0;
  }
  else if(computerScore==3){
    para.textContent ="You lose bot!!🤖";
    playerScore=0;
    computerScore=0;
  }
}

let playerScore = 0;
let computerScore = 0;

const btn = document.querySelector("#playbutton");
btn.addEventListener("click",game);

const rockInput = document.querySelector(".rock");
const paperInput = document.querySelector(".paper");
const scissorInput = document.querySelector(".scissor");
const outputStatement = document.querySelector(".output div");
const outputScore = document.querySelector(".output p");
const para = document.createElement("p");
outputScore.parentNode.appendChild(para);

let inputArr = [rockInput,paperInput,scissorInput];
let humanChoice="";
inputArr.forEach((a)=>{
  a.addEventListener("click",()=>{
    humanChoice = a.classList.value;});
    // a.style.backgroundColor = "blue";
});

