const tttBoard = function() {
    const board = [
        [-,-,-],
        [-,-,-],
        [-,-,-],
    ];

    const placeMarker(player, row, col) {
        board[row][col] = player.getMarker();
    }
}