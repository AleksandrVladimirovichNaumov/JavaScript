"use strict";
// 1. Выводить счёт в режиме реального времени.

const score ={
    scoreValue: 0,
    scoreContainer: document.getElementById('score'),
    // обновляем счет когда змейка вырастает - snake.growUp()
    increaseScore(){
        this.scoreValue++
        this.scoreContainer.innerText =`SCORE: ${this.scoreValue}`
    },
    //устанавливаем нулевой счет, когда запускаем новую игру game.reset()
    reset(){
        this.scoreValue =0
        this.scoreContainer.innerText ='SCORE: 0'
    }
};

// 2. Генерировать временные препятствия на поле.
// Всего будет три препядствия. будут генерироваться в начале и менять позицию при каждом приеме пищи
// проверка врезания змеей в блок проверяется в canMakeStep
// После того как сделал, понял, что лучше было делать через array как тело змеи.
// тогда можно и легко настраивать количество препятсвий
const blocks = {
    x1: null,
    y1: null,
    x2: null,
    y2: null,
    x3: null,
    y3: null,

    getCoordinates1() {
        return {
            x: this.x1,
            y: this.y1,

        };
    },
    getCoordinates2() {
        return {
            x: this.x2,
            y: this.y2,
        };
    },
    getCoordinates3() {
        return {
            x: this.x3,
            y: this.y3,
        };
    },

    setCoordinates1(point) {
        this.x1 = point.x;
        this.y1 = point.y;

    },
    setCoordinates2(point) {
        this.x2 = point.x;
        this.y2 = point.y;
    },
    setCoordinates3(point) {
        this.x3 = point.x;
        this.y3 = point.y;
    },

    isOnPoint(point) {
        return (this.x1 === point.x && this.y1 === point.y) || (this.x2 === point.x && this.y2 === point.y) || (this.x3 === point.x && this.y3 === point.y);
    },
};


const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 10,
};

const config = {
    settings,

    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        return result;
    },
};

const map = {
    cells: {},
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {};
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                const cellKey = `x${col}_y${row}`;
                this.cells[cellKey] = td;

                tr.appendChild(td);
            }
        }
    },

    render(snakePointsArray, foodPoint, block1Point, block2Point, block3Point) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];

        snakePointsArray.forEach((point, index) => {
            const cellKey = `x${point.x}_y${point.y}`;
            const snakeCell = this.cells[cellKey];

            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCellKey = `x${foodPoint.x}_y${foodPoint.y}`;
        const foodCell = this.cells[foodCellKey];

        foodCell.classList.add('food');
        console.log(foodCell)
        this.usedCells.push(foodCell);


        const block1CellKey = `x${block1Point.x}_y${block1Point.y}`;
        const block1Cell = this.cells[block1CellKey];

        block1Cell.classList.add('blocks');
        console.log(block1Cell)
        this.usedCells.push(block1Cell);


        const block2CellKey = `x${block2Point.x}_y${block2Point.y}`;
        const block2Cell = this.cells[block2CellKey];

        block2Cell.classList.add('blocks');

        this.usedCells.push(block2Cell);


        const block3CellKey = `x${block3Point.x}_y${block3Point.y}`;
        const block3Cell = this.cells[block3CellKey];

        block3Cell.classList.add('blocks');

        this.usedCells.push(block3Cell);
    },
};

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

const snake = {
    body: [],
    direction: null,
    lastStepDirection: null,

    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    setDirection(direction) {
        this.direction = direction;
    },

    isOnPoint(point) {
        return this.getBody().some(snakePoint => {
            return snakePoint.x === point.x && snakePoint.y === point.y;
        });
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.getBody().unshift(this.getNextHeadPoint());
        this.getBody().pop();
    },

    growUp() {
        const lastBodyIndex = this.getBody().length - 1;
        const lastBodyPoint = this.getBody()[lastBodyIndex];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);

        this.getBody().push(lastBodyPointClone);
        // увеличиваем и обновляем счет
        score.increaseScore();
    },

    getNextHeadPoint() {
        const firstPoint = this.getBody()[0];

        switch (this.direction) {
            case 'up':
                return {x: firstPoint.x, y: firstPoint.y - 1};
            case 'right':
                return {x: firstPoint.x + 1, y: firstPoint.y};
            case 'down':
                return {x: firstPoint.x, y: firstPoint.y + 1};
            case 'left':
                return {x: firstPoint.x - 1, y: firstPoint.y};
        }
    },
};

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    config,
    map,
    snake,
    food,
    status,
    blocks,
    tickInterval: null,

    init(userSettings = {}) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.error(err);
            }
            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());

        this.setEventHandlers();
        this.reset();
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', event => {
            this.keyDownHandler(event);
        })
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.blocks.setCoordinates1(this.getRandomFreeCoordinates());
        this.blocks.setCoordinates2(this.getRandomFreeCoordinates());
        this.blocks.setCoordinates3(this.getRandomFreeCoordinates());
        this.render();
        // устанавливаем нулевой счет
        score.reset();
    },

    render() {
        this.map.render(this.snake.body, this.food.getCoordinates(), this.blocks.getCoordinates1(), this.blocks.getCoordinates2(), this.blocks.getCoordinates3());
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            },
        ];
    },

    getRandomFreeCoordinates() {
        const exclude = [this.food.getCoordinates(), this.blocks.getCoordinates1(), this.blocks.getCoordinates2(), this.blocks.getCoordinates3(), ...this.snake.getBody()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) return rndPoint;
        }
    },



    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) this.snake.setDirection(direction);
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра завершена', true);
    },

    setPlayButton(text, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = text;

        isDisabled
            ? playButton.classList.add('disabled')
            : playButton.classList.remove('disabled');
    },

    tickHandler() {
        if (!this.canMakeStep()) return this.finish();

        if (this.food.isOnPoint(this.snake.getNextHeadPoint())) {
            this.snake.growUp();
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            this.blocks.setCoordinates1(this.getRandomFreeCoordinates());
            this.blocks.setCoordinates2(this.getRandomFreeCoordinates());
            this.blocks.setCoordinates3(this.getRandomFreeCoordinates());

            if (this.isGameWon()) this.finish();
        }

        this.snake.makeStep();
        this.render();
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },

    canMakeStep() {
        const nextHeadPoint = this.snake.getNextHeadPoint();

        return !this.snake.isOnPoint(nextHeadPoint) &&
            nextHeadPoint.x < this.config.getColsCount() &&
            nextHeadPoint.y < this.config.getRowsCount() &&
            nextHeadPoint.x >= 0 &&
            nextHeadPoint.y >= 0 &&
            // проверяем, что бошкой не упираемся в блок
            !this.blocks.isOnPoint(nextHeadPoint)
            ;
    }
};

game.init({speed: 10});
