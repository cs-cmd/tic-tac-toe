export const tttBoard = (function() {
    const board = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-'],
    ];

    const placeMarker = (player, row, col) => {
        board[row][col] = player.getMarker();
    }

    const isBlank = (row, col) => {
        return board[row][col] === '-';
    }

    const checkRow = (row) => {
        if (isBlank(row, 0) || isBlank(row, 1) || isBlank(row, 2)) {
            return false;
        }

        return board[row][0] === board[row][1] === board[row][2];
    }

    const checkCol = (col) => {
        if(isBlank(0, col) || isBlank(1, col) || isBlank(2, col)) {
            return false;
        }

        return board[0][col] === board[1][col] === board[2][col];
    };

    return { placeMarker, checkRow, checkCol };
})();