export const tttBoard = (function() {
    // array representation of the board
    const board = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-'],
    ];

    // Determines if row is blank (=== '-')
    const isBlank = (row, col) => {
        return board[row][col] === '-';
    }

    // creates a game cell and gives it the values of the class, and row/col numbers
    const createGameCell = (row, col) => {
        let gameCell = document.createElement('div');
        gameCell.classList.add('game-cell');
        gameCell.setAttribute('game-row', row);
        gameCell.setAttribute('game-col', col);

        return gameCell;
    }

    // checks a given row for equality if one is blank, return
    const checkRow = (row) => {
        if (isBlank(row, 0) || isBlank(row, 1) || isBlank(row, 2)) {
            return false;
        }
        return board[row][0] === board[row][1] &&
            board[row][1] === board[row][2];
    }

    // checks a given column for equality. if one is blank, return
    const checkCol = (col) => {
        if(isBlank(0, col) || isBlank(1, col) || isBlank(2, col)) {
            return false;
        }

        return board[0][col] === board[1][col] &&
            board[1][col]=== board[2][col];
    };

    // check the top-left-to-bottom-right diagonal for equality
    const checkNegDiag = () => {
        if(isBlank(0, 0) || isBlank(1, 1) || isBlank(2, 2)) {
            return false;
        }

        return board[0][0] === board[1][1] &&
            board[1][1] === board[2][2];
    }

    // check the bottom-left-to-top-right diagonal
    const checkPosDiag = () => {
        if(isBlank(2, 0) || isBlank(1, 1) || isBlank(0, 2)) {
            return false;
        }

        return board[2][0] === board[1][1] &&
            board[1][1] === board[0][2];
    }

    // 'creates' and returns the gameboard for reference in driver
    const createGameBoard = () => {
        let gameboard = document.getElementById('main-board');
        for(let row = 0; row < 3; ++row) {
            for(let col = 0; col < 3; ++col) {
                let cell = createGameCell(row, col);
                gameboard.appendChild(cell);
            }
        }

        return gameboard;
    }

    // inserts marker to given cell. applies background image to cell
    const insertMarker = (marker, cell) => {
        let col = parseInt(cell.getAttribute('game-col'));
        let row = parseInt(cell.getAttribute('game-row'));
        let svgPath;

        if(marker === 'X') {
            svgPath = 'x';
        }
        else {
            svgPath = 'circle'
        }

        // set board cell with marker value
        board[row][col] = marker;

        // SVG resource path in file directory
        svgPath = `../res/svg/${svgPath}.svg`;

        // apply image
        cell.style.backgroundImage = `url(${svgPath})`;
    }

    return { checkNegDiag, checkPosDiag, checkRow, checkCol, createGameBoard, insertMarker };
})();