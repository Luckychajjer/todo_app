function board(){
    let gameBoard =[];
    let displayBoard=[];
    let row = 3;
    for(var i=0;i<row;i++){ //this is to provide a new empty grid
        let ab =[];
        for(var j=0;j<row;j++){
            ab.push(cell());
        }
        gameBoard.push(ab);
    } 
    document.querySelectorAll(".gameboard div").forEach((e)=>{
        e.textContent="";
    });

    const getBoard = function(){
        return gameBoard;
    }
    
    const getBoardValue = function(){
        displayBoard = gameBoard.map((row) => row.map((col)=>col.getValue()));
        return displayBoard;
    }

    const printBoard = function(){
        getBoardValue();
        console.log(displayBoard);
    }
    return {getBoard,getBoardValue,printBoard};
}

function cell(){
    let value = 0 ;

    const getValue=function(){
        return value;
    }
    const setValue = function(v){
        value = v;
    }
    
    return{getValue,setValue};
}

function person(p1 = "player1",p2="player2"){
    const player1=document.querySelector(".player1")
    const player2 =document.querySelector(".player2")
    let players = [
        {name:p1 , token:"X",class:player1},
        {name:p2, token:"O",class:player2}
    ];
    let currPlayer = players[0];
    // currPlayer.class.classList.toggle("currPlayer")
    const nextTurn = function(){
        currPlayer = currPlayer.name===players[0].name ? players[1] :players[0];   
        // players[0].class.classList.toggle("currPlayer")
        // players[1].class.classList.toggle("currPlayer")
        // // console.log(currPlayer.name);
    }

    const getCurrPlayer = function(){
        return currPlayer;
    }

    return {nextTurn,getCurrPlayer};
}


function gameController(){
    let startGame;
    let players;
    let ele1 = document.createElement("p");
    let ele2 = document.createElement("p");
    ele1.classList.add("player1")
    ele2.classList.add("player2")
    document.querySelector(".playerInfo").appendChild(ele1);
    document.querySelector(".playerInfo").appendChild(ele2);

    const start = function(){
        startGame = board();
        p1name = p1.value == ""? "player1":p1.value;
        p2name = p2.value == ""? "player2":p2.value;
        players = person(p1name,p2name);
        ele1.textContent = `${p1name} : X `;
        ele2.textContent = `${p2name} : O `;
    }
    
    const move = function(pos,currDiv){
        let currBoard = startGame.getBoard();
        let x = Math.floor(pos/3);
        let y = pos%3;
        if(currDiv.textContent!=""){
            // console.log("can't play here");
        }
        else{
            currBoard[x][y].setValue(players.getCurrPlayer().token);
            if(players.getCurrPlayer().token == "X"){
                currDiv.style.color = "red" ;
            }
            else{
                currDiv.style.color = "blue" ;
            }
            currDiv.textContent = players.getCurrPlayer().token;
            // startGame.printBoard();
            completedGame();
            players.nextTurn();
        }
    }

    const completedGame = function(){
        let [gameComplete,desicion] = checkWin();
        // console.log(gameComplete,desicion)
        if(gameComplete){
            console.log(`🎉 Winner ${players.getCurrPlayer().name} 🎉`);
            console.log("game over");    
            
        }
        else if(desicion){
            // console.log(`Its a Tie`);
        }
        else{
            return;
        }
        dia.showModal();
    }

    const checkWin = function(){
        let currBoard = startGame.getBoardValue();
        let isTie = true;
        let gameComplete = false;

        for(let i=0;i<3;i++){
            if((currBoard[i][0]!=0)&&(currBoard[i][0]==currBoard[i][1]) && (currBoard[i][1]==currBoard[i][2])){
                gameComplete = true;
                break;
            }
            if((currBoard[0][i]!=0)&&(currBoard[0][i]==currBoard[1][i]) && (currBoard[1][i]==currBoard[2][i])){
                gameComplete = true;
                break;
            }
        }
        if((currBoard[1][1]!=0)&&(currBoard[0][0]==currBoard[1][1]) && (currBoard[1][1]==currBoard[2][2])){
            gameComplete = true;
        }
        if((currBoard[1][1]!=0)&&(currBoard[0][2]==currBoard[1][1]) && (currBoard[1][1]==currBoard[2][0])){
            gameComplete = true;
        }

        for(let i =0;i<3;i++){
            for(let j =0;j<3;j++){
                if(currBoard[i][j]==0){
                    isTie = false;
                    break;
                }
            }
        }

        return [gameComplete,isTie];
    }
    return {move,start};
}
const game = gameController();

const gameboard = document.querySelector(".gameboard");
for(let i=0;i<9;i++){
    let currDiv = document.createElement("div");
    currDiv.addEventListener("click",()=>{game.move(i,currDiv)});
    gameboard.appendChild(currDiv);
}

const dia = document.querySelector("dialog");
dia.showModal();
document.querySelector(".restart").addEventListener("click",()=>{
    game.start();
    dia.close();
})

