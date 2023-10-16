const Player = (name, playerNumber, markCharacter) => {
    let winCount = 0;

    const getName = () => name;
    const getPlayerNumber = () => playerNumber;
    const getMarkCharacter = () => markCharacter;

    const increaseWinCount = () => winCount+=1;
    const getWinCount = () => winCount;

    return { getName, 
        getPlayerNumber, 
        getMarkCharacter,
        increaseWinCount, 
        getWinCount
    }
};


const Cell = () => {
    let value = "-";
    let mark = "-";

    const getValue = () => value;
    const getMark = () => mark;

    const setMark = (player) => {
        value = player.getPlayerNumber();
        mark = player.getMarkCharacter();
    };

    return { getValue,
        getMark, 
        setMark
    };
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
        DisplayController.makeMark(position, player);
        
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
    let winner = "";

    const getPlayer = (playerNumber) => {
        if (playerNumber === 1) { return player1; }
        else { return player2; }
    }

    const getBoard = () => board;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const initializeGame = (e) => {
        e.preventDefault();
        const player1Input = document.querySelector('input#player-1');
        const player2Input = document.querySelector('input#player-2');
        if (player1Input.value === "") { player1 = Player("Player 1", "1", "X"); } 
        else { player1 = Player(player1Input.value, "1", "X"); }
        if (player2Input === "") { player2 = Player("Player 2", "2", "O"); }
        else { player2 = Player(player2Input.value, "2", "O"); }

        GameController.resetGame();

        activePlayer = player1;
        console.log(`Started Game`);
    };

    const playRound = (event) => {
        const position = event.currentTarget.id.slice(5);
        board.makeMark(position, activePlayer);
        board.printBoard();
        let gameOver = determineIfGameOver();
        if (gameOver) {
            // do end of game activities
            return;
        }
        switchActivePlayer();
    };

    const determineIfGameOver = () => {
        bool_Over = false;
        // all spaces are taken
        

        // horizontal win


        // vertical win


        // left-right diagonal win


        // right-left diagonal win

        return bool_Over;
    }

    const determineWinner = () => {
        // check 
    }

    const resetGame = () => {
        board.reset();
        DisplayController.resetGame();
    }

    return { getPlayer,
        initializeGame,
        playRound,
        switchActivePlayer,
        getBoard,
        resetGame
    };

})();

const DisplayController = (() => {
    const boardCells = document.querySelectorAll('.ttt-cell');

    const makeMark = (position, player) => {
        console.log(`Position: cell-${position}`);
        const cellToMark = document.querySelector(`.ttt-cell#cell-${position}`);
        cellToMark.textContent = player.getMarkCharacter();
        cellToMark.removeEventListener('click', GameController.playRound);
    }

    const resetGame = () => {
        boardCells.forEach(boardCell => {
            boardCell.textContent = "";
            boardCell.addEventListener('click', GameController.playRound);
        });
    }

    return { makeMark,
        resetGame
    };
})();

/*
Win conditions on array:
- horizontal row (n, n+1, n+2 where n%3 = 1)
- vertical row (n, n+3, n+6 where n <= 3)
- diagonal right-left (n, n+4, n+8 where n = 1)
- diagonal left-right (n, n+2, n+4 where n = 3)
*/