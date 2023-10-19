import  { chosenMarker, setUpButtonClicks, setUpChosenDivs } from './select-marker.js';
import { tttBoard } from './board.js';

// set up buttons on main menu, player icon divs, and reset button on main game
setUpButtonClicks();
setUpChosenDivs();
document.getElementById('reset-button').addEventListener('click', (e) => {
    resetBoard();
});

// creates the main driver for the game
const makeGameDriver = function(firstPlayer) {
    let currentTurn = firstPlayer;

    // switches icon from one to the other
    const switchIcon = () => {
        currentTurn = currentTurn === 'X' ? 'O' : 'X';
    }
    // get the current marker for turn
    const getTurn = () => {
        return currentTurn;
    }

    return {
        switchIcon, 
        getTurn,
    }
};

document.getElementById('marker-selector').addEventListener('close', function(e) {
    // hide marker selector screen
    document.querySelector('.main-menu').style.display = 'none';

    // show main game board
    document.querySelector('.main-game-board').style.display = 'flex';
    
    const gameDriver = makeGameDriver(chosenMarker.getMarkerValue());

    let gameBoard = tttBoard.createGameBoard();

    gameBoard.addEventListener('click', (e) => {
        let cell = e.target;
        
        // if the div has a marker already, then return
        if(cell.style.backgroundImage !== '') {
            console.log('already marked, exiting...');
            return;
        }

        tttBoard.insertMarker(gameDriver.getTurn(), cell);

        let row = parseInt(cell.getAttribute('game-row'));
        let col = parseInt(cell.getAttribute('game-col'));

        // check diagonals of board

        // check row and column of board. set timeout so image can be applied
        // to background of cells before alert pops up
        setTimeout(function() {
            if (tttBoard.checkCol(col) || 
            tttBoard.checkRow(row) ||
            tttBoard.checkNegDiag() ||
            tttBoard.checkPosDiag()) {
                alert(`${gameDriver.getTurn()} wins!`);
                resetBoard();
            }
            else {
                gameDriver.switchIcon();
            }
        }, 0);
    });
});

function resetBoard() {
    window.location.reload();
}
