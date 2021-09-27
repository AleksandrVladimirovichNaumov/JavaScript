// Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки.
// Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
// (использовать createElement / appendChild)
'use strict';

const chessBoard = {
    size: 10,
    containerElement: document.getElementById('chessBoard'),
    values: [
        ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''],
        [8, '', 'Bl', '', 'Bl', '', 'Bl', '', 'Bl', 8],
        [7, 'Bl', '', 'Bl', '', 'Bl', '', 'Bl', '', 7],
        [6, '', 'Bl', '', 'Bl', '', 'Bl', '', 'Bl', 6],
        [5, 'Bl', '', 'Bl', '', 'Bl', '', 'Bl', '', 5],
        [4, '', 'Bl', '', 'Bl', '', 'Bl', '', 'Bl', 4],
        [3, 'Bl', '', 'Bl', '', 'Bl', '', 'Bl', '', 3],
        [2, '', 'Bl', '', 'Bl', '', 'Bl', '', 'Bl', 2],
        [1, 'Bl', '', 'Bl', '', 'Bl', '', 'Bl', '', 1],
        ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '']
    ],

    init() {
        for (let row = 0; row < this.size; row++) {
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);
            for (let col = 0; col < this.size; col++) {
                const cell = document.createElement('td');
                if (this.values[row][col] === 'Bl') {
                    cell.style.backgroundColor = '#000'
                } else {
                    if (row === 0 || col === 9) {
                        cell.style.transform = 'rotate(180deg)'
                    }
                    cell.textContent = this.values[row][col]
                }
                trElem.appendChild(cell);
            }
        }
    }
}
chessBoard.init()