const gameBoard = document.getElementById("gameBoard");

const boardSize = 20; // 20x20 grid
let snake = [{ x: 10, y: 10 }]; // Starting position of the snake
let food = { x: 5, y: 5 }; // Initial food position
let direction = { x: 1, y: 0 }; // Initial direction (moving right)
let gameInterval;
let speed = 300; // Starting speed in milliseconds

// Initialize the board
function initializeBoard() {
  gameBoard.innerHTML = ""; // Clear the board
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameBoard.appendChild(cell);
  }
}

// Update the board state
function updateBoard() {
  const cells = document.querySelectorAll(".cell");

  // Clear previous snake and food
  cells.forEach(cell => cell.className = "cell");

  // Render the snake
  snake.forEach(segment => {
    const index = segment.y * boardSize + segment.x;
    cells[index].classList.add("snake");
  });

  // Render the food
  const foodIndex = food.y * boardSize + food.x;
  cells[foodIndex].classList.add("food");
}

// Increase the game speed
function increaseSpeed() {
  if (speed > 100) speed -= 20; // Decrease interval time to increase speed
  clearInterval(gameInterval);  // Clear existing interval
  gameInterval = setInterval(moveSnake, speed); // Start a new interval with updated speed
}

// Move the snake
function moveSnake() {
  const head = { ...snake[0] }; // Copy the head
  head.x += direction.x;
  head.y += direction.y;

  // Check collisions
  if (
    head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || 
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval); // Stop the game
    alert("Game Over!");
    return;
  }

  // Add new head to the snake
  snake.unshift(head);

  // Check for food
  if (head.x === food.x && head.y === food.y) {
    generateFood();
    increaseSpeed(); // Speed up the game when the snake eats food
  } else {
    snake.pop(); // Remove the tail
  }

  updateBoard();
}

// Generate new food location
function generateFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  food = newFood;
}

// Handle keypresses
function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

// Start the game
function startGame() {
  initializeBoard();
  updateBoard();
  generateFood();
  gameInterval = setInterval(moveSnake, speed); // Set initial speed
}

window.addEventListener("keydown", handleKeyPress);
startGame();
