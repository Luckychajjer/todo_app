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
    humanChoice = humanChoice.toLowerCase();
    ans = "";
    if(computerChoice == humanChoice ){
      ans = "Both picked the same";
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

let playerScore = 0;
let computerScore = 0;
var getHumanChoice =  ()=> prompt(("Enter your Choice \n Rock Paper Scissor"));
function game(){
  playerScore=0;
  computerScore=0;
  while(playerScore<3 && computerScore<3){
    console.log(playRound(getComputerChoice(),getHumanChoice()));
    console.log(computerScore,playerScore);
  }
  if(playerScore>computerScore){
    console.log("You Win!!🎉");
  }
  else{
    console.log("You lose bot!!🤖");
  }
}
const btn = document.querySelector("#playbutton");
btn.addEventListener("click",game);


