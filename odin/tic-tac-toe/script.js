function board(){
    let gameBoard = [];
    let row = 3;
    let validPattern = [];
    for(var i=0;i<row;i++){
        let ab =[];
        for(var j=0;j<row;j++){
            ab.push(cell());
        }
        gameBoard.push(ab);
    }
    
    const getBoard = function(){
        return gameBoard;
    }
    const printBoard = function(){
        const displayBoard = gameBoard.map((row) => row.map((col)=>col.getValue()));
        console.log(displayBoard);
    }
    return {getBoard,printBoard};
};

function cell(){
    let value =0;

    const getValue=function(){
        return value;
    }
    const setValue = function(v){
        value = v;
    }
    
    return{getValue,setValue};
}
function person(p1 = "player1",p2="player2"){
    let players = [
        {name:p1 , token:1},
        {name:p2, token:2}
    ];
    let  currPlayer = players[0];
    console.log(currPlayer.name);
    const nextTurn = function(){
        currPlayer = currPlayer.name===players[0].name ? players[1] :players[0];   
        console.log(currPlayer.name);
    }
    const getCurrPlayer = function(){
        return currPlayer;
    }

    return {nextTurn,getCurrPlayer};
}

function gameController(){
    const players = person("comp","Lucky");
    const startGame = board();
    startGame.printBoard();
    const move = function(pos){
        let currBoard = startGame.getBoard();
        let x = Math.floor(pos/3);
        let y = pos%3;
        if(currBoard[x][y].getValue()!=0){
            console.log("can't play here");
        }
        else{
            currBoard[x][y].setValue(players.getCurrPlayer().token);
            startGame.printBoard();
            players.nextTurn();
        }
    }
    return {move};
}

const game = gameController();

