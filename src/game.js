const Player = (name, playerNumber) => {
    let winCount = 0;

    const getName = () => name;
    const getPlayerNumber = () => playerNumber;

    const increaseWinCount = () => winCount+=1;
    const getWinCount = () => winCount;

    return { getName, 
        getPlayerNumber, 
        increaseWinCount, 
        getWinCount
    }
};


const Cell = () => {
    let value = "-";

    const getValue = () => value;

    const setMark = (player) => {
        value = player.getPlayerNumber();
    };

    return {getValue, setMark};
};


const GameBoard = () => {
    let board = [];

    const reset = () => {
        board = [];
        for (let i=0; i<9; i++) {
            board.push(Cell());
        };
    };

    const makeMark = (position, player) => {
        board[position].setMark(player);
    };

    const printBoard = () => {
        let printableBoard = "";
        for (i=0; i<3; i++) {
            let row = "";
            for (j=0; j<3; j++) {
                row = row + board[i*3 + j].getValue();
            };
            printableBoard = printableBoard + row + "\n";
        };
        console.log(printableBoard);
    };

    return { reset,
        makeMark,
        printBoard
    };
};


const GameController = (() => {
    const board = GameBoard();
    board.reset();
    let player1 = {};
    let player2 = {};
    let activePlayer = {};

    const getBoard = () => board;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const initializeGame = (player1Name, player2Name) => {
        player1 = Player(player1Name, "1");
        player2 = Player(player2Name, "2");
        activePlayer = player1;
        console.log(``)
    };

    const playRound = (position) => {
        board.makeMark(position, activePlayer);
        board.printBoard();
        switchActivePlayer();
    };

    return { initializeGame,
        playRound,
        switchActivePlayer,
        getBoard
    };

})();

GameController.initializeGame("Tyler", "Max");
GameController.getBoard().printBoard();
GameController.playRound(2);

/*
Win conditions on array:
- horizontal row (n, n+1, n+2 where n%3 = 1)
- vertical row (n, n+3, n+6 where n <= 3)
- diagonal right-left (n, n+4, n+8 where n = 1)
- diagonal left-right (n, n+2, n+4 where n = 3)
*/