class DotsAndBoxes {
    constructor() {
        this.boardWidth = 3;
        this.boardHeight = 3;
        this.gameMode = 'player';
        this.currentPlayer = 1;
        this.player1Score = 0;
        this.player2Score = 0;
        this.player1Name = 'Player 1';
        this.player2Name = 'Player 2';
        this.grid = [];
        this.boxes = [];
        this.gameEnded = false;
        this.cellSize = 50;
        this.dotSize = 8;
        this.lineThickness = 4;

        this.initEventListeners();
    }

    initEventListeners() {
        // Menu controls
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const customDiv = document.getElementById('customSize');
                if (e.target.dataset.size === 'custom') {
                    customDiv.style.display = 'flex';
                } else {
                    customDiv.style.display = 'none';
                    const [w, h] = e.target.dataset.size.split('x');
                    this.boardWidth = parseInt(w);
                    this.boardHeight = parseInt(h);
                }
            });
        });

        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.gameMode = e.target.dataset.mode;

                const player2NameDiv = document.getElementById('player2Name');
                player2NameDiv.style.display = this.gameMode === 'computer' ? 'none' : 'block';
            });
        });

        document.getElementById('startGameBtn').addEventListener('click', () => {
            // Get player names
            const p1Name = document.getElementById('player1Name').value.trim();
            const p2Name = document.getElementById('player2Name').value.trim();

            this.player1Name = p1Name || 'Player 1';
            this.player2Name = p2Name || 'Player 2';

            const activeSize = document.querySelector('.size-btn.active');
            if (activeSize.dataset.size === 'custom') {
                this.boardWidth = parseInt(document.getElementById('customWidth').value) || 4;
                this.boardHeight = parseInt(document.getElementById('customHeight').value) || 4;
            }
            this.startGame();
        });

        document.getElementById('backToMenuBtn').addEventListener('click', () => {
            this.showScreen('menu');
        });

        document.getElementById('replayBtn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('backToMenuFromLeaderboard').addEventListener('click', () => {
            this.showScreen('menu');
        });
    }

    showScreen(screen) {
        document.getElementById('menuScreen').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('hidden');
        document.getElementById('leaderboardScreen').classList.add('hidden');

        document.getElementById(screen + 'Screen').classList.remove('hidden');
    }

    startGame() {
        this.currentPlayer = 1;
        this.player1Score = 0;
        this.player2Score = 0;
        this.gameEnded = false;
        this.grid = [];
        this.boxes = [];

        // Update display names
        document.getElementById('player1DisplayName').textContent = `${this.player1Name} (A)`;
        const player2DisplayName = this.gameMode === 'computer' ? 'Computer (B)' : `${this.player2Name} (B)`;
        document.getElementById('player2DisplayName').textContent = player2DisplayName;

        this.initializeGrid();
        this.createGameBoard();
        this.updateUI();
        this.showScreen('game');
    }

    initializeGrid() {
        // Initialize horizontal lines
        for (let row = 0; row <= this.boardHeight; row++) {
            for (let col = 0; col < this.boardWidth; col++) {
                this.grid.push({
                    type: 'horizontal',
                    row: row,
                    col: col,
                    drawn: false,
                    player: null
                });
            }
        }

        // Initialize vertical lines
        for (let row = 0; row < this.boardHeight; row++) {
            for (let col = 0; col <= this.boardWidth; col++) {
                this.grid.push({
                    type: 'vertical',
                    row: row,
                    col: col,
                    drawn: false,
                    player: null
                });
            }
        }

        // Initialize boxes
        for (let row = 0; row < this.boardHeight; row++) {
            for (let col = 0; col < this.boardWidth; col++) {
                this.boxes.push({
                    row: row,
                    col: col,
                    completed: false,
                    player: null
                });
            }
        }
    }

    createGameBoard() {
        const board = document.getElementById('gameBoard');
        board.innerHTML = '';

        const boardPixelWidth = this.boardWidth * this.cellSize + this.dotSize;
        const boardPixelHeight = this.boardHeight * this.cellSize + this.dotSize;

        board.style.width = boardPixelWidth + 'px';
        board.style.height = boardPixelHeight + 'px';
        board.style.position = 'relative';

        // Create dots
        for (let row = 0; row <= this.boardHeight; row++) {
            for (let col = 0; col <= this.boardWidth; col++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                dot.style.left = (col * this.cellSize + this.dotSize / 2) + 'px';
                dot.style.top = (row * this.cellSize + this.dotSize / 2) + 'px';
                board.appendChild(dot);
            }
        }

        // Create horizontal lines
        this.grid.filter(line => line.type === 'horizontal').forEach((line, index) => {
            const lineEl = document.createElement('div');
            lineEl.className = 'line horizontal';
            lineEl.style.width = (this.cellSize - this.dotSize) + 'px';
            lineEl.style.height = this.lineThickness + 'px';
            lineEl.style.left = (line.col * this.cellSize + this.dotSize) + 'px';
            lineEl.style.top = (line.row * this.cellSize + this.dotSize / 2 - this.lineThickness / 2) + 'px';

            lineEl.addEventListener('click', () => this.drawLine(line));
            board.appendChild(lineEl);
        });

        // Create vertical lines
        this.grid.filter(line => line.type === 'vertical').forEach((line, index) => {
            const lineEl = document.createElement('div');
            lineEl.className = 'line vertical';
            lineEl.style.width = this.lineThickness + 'px';
            lineEl.style.height = (this.cellSize - this.dotSize) + 'px';
            lineEl.style.left = (line.col * this.cellSize + this.dotSize / 2 - this.lineThickness / 2) + 'px';
            lineEl.style.top = (line.row * this.cellSize + this.dotSize) + 'px';

            lineEl.addEventListener('click', () => this.drawLine(line));
            board.appendChild(lineEl);
        });
    }

    drawLine(line) {
        if (line.drawn || this.gameEnded) return;

        line.drawn = true;
        line.player = this.currentPlayer;

        // Update visual
        const lineElements = document.querySelectorAll('.line');
        const lineIndex = this.grid.indexOf(line);
        const lineEl = lineElements[lineIndex];
        lineEl.classList.add('drawn', `player${this.currentPlayer}`);

        // Check for completed boxes
        const completedBoxes = this.checkCompletedBoxes();
        let bonusTurn = completedBoxes.length > 0;

        // Update scores
        if (completedBoxes.length > 0) {
            if (this.currentPlayer === 1) {
                this.player1Score += completedBoxes.length;
            } else {
                this.player2Score += completedBoxes.length;
            }
            this.drawCompletedBoxes(completedBoxes);
        }

        // Check if game is over
        if (this.isGameOver()) {
            this.endGame();
            return;
        }

        // Switch player if no bonus turn
        if (!bonusTurn) {
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        }

        this.updateUI();

        // Computer move
        if (this.gameMode === 'computer' && this.currentPlayer === 2 && !this.gameEnded) {
            setTimeout(() => this.makeComputerMove(), 1000);
        }
    }

    checkCompletedBoxes() {
        const newlyCompleted = [];

        this.boxes.forEach(box => {
            if (!box.completed) {
                const lines = this.getBoxLines(box);
                if (lines.every(line => line.drawn)) {
                    box.completed = true;
                    box.player = this.currentPlayer;
                    newlyCompleted.push(box);
                }
            }
        });

        return newlyCompleted;
    }

    getBoxLines(box) {
        const lines = [];

        // Top horizontal line
        lines.push(this.grid.find(line =>
            line.type === 'horizontal' && line.row === box.row && line.col === box.col
        ));

        // Bottom horizontal line
        lines.push(this.grid.find(line =>
            line.type === 'horizontal' && line.row === box.row + 1 && line.col === box.col
        ));

        // Left vertical line
        lines.push(this.grid.find(line =>
            line.type === 'vertical' && line.row === box.row && line.col === box.col
        ));

        // Right vertical line
        lines.push(this.grid.find(line =>
            line.type === 'vertical' && line.row === box.row && line.col === box.col + 1
        ));

        return lines.filter(line => line !== undefined);
    }

    drawCompletedBoxes(completedBoxes) {
        const board = document.getElementById('gameBoard');

        completedBoxes.forEach(box => {
            const boxEl = document.createElement('div');
            boxEl.className = `box player${box.player}`;
            boxEl.style.width = (this.cellSize - this.dotSize) + 'px';
            boxEl.style.height = (this.cellSize - this.dotSize) + 'px';
            boxEl.style.left = (box.col * this.cellSize + this.cellSize / 2) + 'px';
            boxEl.style.top = (box.row * this.cellSize + this.cellSize / 2) + 'px';
            boxEl.textContent = box.player === 1 ? 'A' : 'B';

            board.appendChild(boxEl);
        });
    }

    makeComputerMove() {
        if (this.gameEnded) return;

        const availableLines = this.grid.filter(line => !line.drawn);
        const bestMove = this.findBestMove(availableLines);

        if (bestMove) {
            this.drawLine(bestMove);
        }
    }

    findBestMove(availableLines) {
        // Strategy 1: Complete boxes if possible (highest priority)
        const completingMoves = this.findCompletingMoves(availableLines);
        if (completingMoves.length > 0) {
            // Choose the move that completes the most boxes
            return completingMoves.reduce((best, current) =>
                current.boxesCompleted > best.boxesCompleted ? current : best
            ).line;
        }

        // Strategy 2: Look for chain opportunities
        const chainMoves = this.findChainMoves(availableLines);
        if (chainMoves.length > 0) {
            return chainMoves[0].line;
        }

        // Strategy 3: Avoid giving opponent easy boxes
        const safeMoves = this.findSafeMoves(availableLines);

        // Strategy 4: If no safe moves, minimize damage
        if (safeMoves.length === 0) {
            return this.findLeastDamagingMove(availableLines);
        }

        // Strategy 5: Among safe moves, choose strategically
        return this.chooseStrategicSafeMove(safeMoves);
    }

    findCompletingMoves(availableLines) {
        const completingMoves = [];

        availableLines.forEach(line => {
            const boxesCompleted = this.simulateLineAndCountBoxes(line);
            if (boxesCompleted > 0) {
                completingMoves.push({ line, boxesCompleted });
            }
        });

        return completingMoves.sort((a, b) => b.boxesCompleted - a.boxesCompleted);
    }

    findChainMoves(availableLines) {
        // Look for moves that set up multiple box completions in future turns
        const chainMoves = [];

        availableLines.forEach(line => {
            const score = this.evaluateChainPotential(line);
            if (score > 0) {
                chainMoves.push({ line, chainScore: score });
            }
        });

        return chainMoves.sort((a, b) => b.chainScore - a.chainScore);
    }

    findSafeMoves(availableLines) {
        return availableLines.filter(line => {
            const boxesGiven = this.simulateLineAndCountBoxes(line);
            return boxesGiven === 0;
        });
    }

    findLeastDamagingMove(availableLines) {
        let minDamage = Infinity;
        let bestMove = null;

        availableLines.forEach(line => {
            const damage = this.calculateMoveDamage(line);
            if (damage < minDamage) {
                minDamage = damage;
                bestMove = line;
            }
        });

        return bestMove;
    }

    chooseStrategicSafeMove(safeMoves) {
        // Among safe moves, prefer moves that:
        // 1. Create potential for future chains
        // 2. Control the center of the board
        // 3. Maintain flexibility

        let bestMove = null;
        let bestScore = -1;

        safeMoves.forEach(line => {
            let score = 0;

            // Prefer center moves
            const centerScore = this.getCenterScore(line);
            score += centerScore * 2;

            // Prefer moves that maintain flexibility
            const flexibilityScore = this.getFlexibilityScore(line);
            score += flexibilityScore;

            // Prefer moves that set up potential chains
            const setupScore = this.getSetupScore(line);
            score += setupScore * 3;

            // Add some randomness to avoid predictability
            score += Math.random() * 0.5;

            if (score > bestScore) {
                bestScore = score;
                bestMove = line;
            }
        });

        return bestMove || safeMoves[0];
    }

    simulateLineAndCountBoxes(line) {
        // Create a temporary copy of the grid to simulate the move
        const tempGrid = this.grid.map(l => ({ ...l }));
        const tempLine = tempGrid.find(l =>
            l.type === line.type && l.row === line.row && l.col === line.col
        );
        tempLine.drawn = true;

        // Count completed boxes
        let completedBoxes = 0;
        for (let row = 0; row < this.boardHeight; row++) {
            for (let col = 0; col < this.boardWidth; col++) {
                const box = { row, col };
                const boxLines = this.getBoxLinesFromGrid(box, tempGrid);
                if (boxLines.length === 4 && boxLines.every(l => l.drawn)) {
                    completedBoxes++;
                }
            }
        }

        return completedBoxes;
    }

    evaluateChainPotential(line) {
        // Simulate the move and look for resulting opportunities
        const tempGrid = this.grid.map(l => ({ ...l }));
        const tempLine = tempGrid.find(l =>
            l.type === line.type && l.row === line.row && l.col === line.col
        );
        tempLine.drawn = true;

        let chainScore = 0;

        // Look for boxes that are now one line away from completion
        for (let row = 0; row < this.boardHeight; row++) {
            for (let col = 0; col < this.boardWidth; col++) {
                const box = { row, col };
                const boxLines = this.getBoxLinesFromGrid(box, tempGrid);
                const drawnLines = boxLines.filter(l => l.drawn).length;

                if (drawnLines === 3) {
                    chainScore += 10; // High value for almost-complete boxes
                } else if (drawnLines === 2) {
                    chainScore += 3; // Medium value for half-complete boxes
                }
            }
        }

        return chainScore;
    }

    calculateMoveDamage(line) {
        // Calculate how many boxes this move gives to the opponent
        const boxesGiven = this.simulateLineAndCountBoxes(line);

        // Also consider potential future damage
        const tempGrid = this.grid.map(l => ({ ...l }));
        const tempLine = tempGrid.find(l =>
            l.type === line.type && l.row === line.row && l.col === line.col
        );
        tempLine.drawn = true;

        let futureDamage = 0;
        const remainingLines = tempGrid.filter(l => !l.drawn);

        // Quick check for immediate follow-up opportunities for opponent
        remainingLines.forEach(remainingLine => {
            const boxes = this.simulateLineAndCountBoxesFromGrid(remainingLine, tempGrid);
            if (boxes > 0) {
                futureDamage += boxes * 0.5; // Weight future damage less than immediate
            }
        });

        return boxesGiven * 10 + futureDamage;
    }

    simulateLineAndCountBoxesFromGrid(line, grid) {
        const tempGrid = grid.map(l => ({ ...l }));
        const tempLine = tempGrid.find(l =>
            l.type === line.type && l.row === line.row && l.col === line.col
        );
        if (!tempLine || tempLine.drawn) return 0;

        tempLine.drawn = true;

        let completedBoxes = 0;
        for (let row = 0; row < this.boardHeight; row++) {
            for (let col = 0; col < this.boardWidth; col++) {
                const box = { row, col };
                const boxLines = this.getBoxLinesFromGrid(box, tempGrid);
                if (boxLines.length === 4 && boxLines.every(l => l.drawn)) {
                    completedBoxes++;
                }
            }
        }

        return completedBoxes;
    }

    getCenterScore(line) {
        // Prefer moves closer to the center of the board
        const centerRow = this.boardHeight / 2;
        const centerCol = this.boardWidth / 2;

        const lineRow = line.type === 'horizontal' ? line.row : line.row + 0.5;
        const lineCol = line.type === 'vertical' ? line.col : line.col + 0.5;

        const distance = Math.sqrt(
            Math.pow(lineRow - centerRow, 2) + Math.pow(lineCol - centerCol, 2)
        );

        const maxDistance = Math.sqrt(centerRow * centerRow + centerCol * centerCol);
        return 1 - (distance / maxDistance);
    }

    getFlexibilityScore(line) {
        // Prefer moves that don't overly constrain future options
        const tempGrid = this.grid.map(l => ({ ...l }));
        const tempLine = tempGrid.find(l =>
            l.type === line.type && l.row === line.row && l.col === line.col
        );
        tempLine.drawn = true;

        // Count remaining safe moves after this move
        const remainingLines = tempGrid.filter(l => !l.drawn);
        let safeMoveCount = 0;

        remainingLines.forEach(remainingLine => {
            const boxes = this.simulateLineAndCountBoxesFromGrid(remainingLine, tempGrid);
            if (boxes === 0) {
                safeMoveCount++;
            }
        });

        return safeMoveCount / remainingLines.length;
    }

    getSetupScore(line) {
        // Prefer moves that set up good positions for later
        const tempGrid = this.grid.map(l => ({ ...l }));
        const tempLine = tempGrid.find(l =>
            l.type === line.type && l.row === line.row && l.col === line.col
        );
        tempLine.drawn = true;

        let setupScore = 0;

        // Look for boxes that would be two lines away from completion
        for (let row = 0; row < this.boardHeight; row++) {
            for (let col = 0; col < this.boardWidth; col++) {
                const box = { row, col };
                const boxLines = this.getBoxLinesFromGrid(box, tempGrid);
                const drawnLines = boxLines.filter(l => l.drawn).length;

                if (drawnLines === 2) {
                    setupScore += 1; // Building toward future opportunities
                }
            }
        }

        return setupScore;
    }

    checkBoxesCompletedByLine(line, grid) {
        let count = 0;

        // Check all boxes that could be affected by this line
        for (let row = 0; row < this.boardHeight; row++) {
            for (let col = 0; col < this.boardWidth; col++) {
                const box = { row, col };
                const lines = this.getBoxLinesFromGrid(box, grid);
                if (lines.every(l => l.drawn)) {
                    count++;
                }
            }
        }

        return count;
    }

    getBoxLinesFromGrid(box, grid) {
        const lines = [];

        lines.push(grid.find(line =>
            line.type === 'horizontal' && line.row === box.row && line.col === box.col
        ));
        lines.push(grid.find(line =>
            line.type === 'horizontal' && line.row === box.row + 1 && line.col === box.col
        ));
        lines.push(grid.find(line =>
            line.type === 'vertical' && line.row === box.row && line.col === box.col
        ));
        lines.push(grid.find(line =>
            line.type === 'vertical' && line.row === box.row && line.col === box.col + 1
        ));

        return lines.filter(line => line !== undefined);
    }

    isGameOver() {
        return this.grid.every(line => line.drawn);
    }

    endGame() {
        this.gameEnded = true;

        // Update final scores with real names
        document.getElementById('finalPlayer1Name').innerHTML =
            `${this.player1Name}: <span style="color: #ff6b6b;">${this.player1Score}</span> boxes`;

        const player2Name = this.gameMode === 'computer' ? 'Computer' : this.player2Name;
        document.getElementById('finalPlayer2Name').innerHTML =
            `${player2Name}: <span style="color: #4ecdc4;">${this.player2Score}</span> boxes`;

        // Determine winner
        let winnerText;
        if (this.player1Score > this.player2Score) {
            winnerText = `🎉 ${this.player1Name} Wins! 🎉`;
        } else if (this.player2Score > this.player1Score) {
            winnerText = this.gameMode === 'computer' ? '🤖 Computer Wins! 🤖' : `🎉 ${this.player2Name} Wins! 🎉`;
        } else {
            winnerText = '🤝 It\'s a Tie! 🤝';
        }

        document.getElementById('winnerText').textContent = winnerText;

        setTimeout(() => {
            this.showScreen('leaderboard');
        }, 2000);
    }

    updateUI() {
        document.getElementById('player1Score').textContent = this.player1Score;
        document.getElementById('player2Score').textContent = this.player2Score;

        const player1Info = document.getElementById('player1Info');
        const player2Info = document.getElementById('player2Info');

        player1Info.classList.toggle('active', this.currentPlayer === 1);
        player2Info.classList.toggle('active', this.currentPlayer === 2);

        const currentPlayerText = this.currentPlayer === 1 ? `${this.player1Name}'s Turn` :
            (this.gameMode === 'computer' ? 'Computer\'s Turn' : `${this.player2Name}'s Turn`);
        document.getElementById('currentPlayer').textContent = currentPlayerText;
    }
}

// Initialize the game
const game = new DotsAndBoxes();