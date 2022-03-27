const GRID_SIZE = 4;

const grid = document.querySelector(".puzzle");

let counter = 1;
for (let i = 0; i < GRID_SIZE; i++) {
  for (let j = 0; j < GRID_SIZE; j++) {
    const gridItem = document.createElement("button");
    const content = document.createElement("div");
    gridItem.className = counter === 16 ? "square empty" : "square";
    content.className = "content";
    gridItem.dataset.cell = `${i}-${j}`;

    const number = document.createElement("div");
    number.className = "number";
    number.textContent = counter;
    counter++;
    content.appendChild(number);
    gridItem.appendChild(content);

    const top = i % 4;
    const left = j % 4;
    gridItem.style.left = (left / 4) * 100 + "%";
    gridItem.style.top = (top / 4) * 100 + "%";

    grid.appendChild(gridItem);

    gridItem.addEventListener("click", handleClick);
  }
}

function handleClick(e, isScrambling = false) {
  if (!isScrambling) {
    gtag("event", "click", {
      event_category: "Puzzle",
      event_label: "Piece Moved",
    });
  }
  const { currentTarget } = e;
  const emptyCell = document.querySelector(".empty");
  const [row, column] = currentTarget.dataset.cell.split("-");
  const [emptyRow, emptyColumn] = emptyCell.dataset.cell.split("-");

  if (isValidMove(currentTarget)) {
    let currentPosition = [currentTarget.style.top, currentTarget.style.left];
    let emptyPosition = [emptyCell.style.top, emptyCell.style.left];

    currentTarget.style.top = emptyPosition[0];
    currentTarget.style.left = emptyPosition[1];
    currentTarget.dataset.cell = `${emptyRow}-${emptyColumn}`;

    emptyCell.style.top = currentPosition[0];
    emptyCell.style.left = currentPosition[1];
    emptyCell.dataset.cell = `${row}-${column}`;

    if (isWin() && !isScrambling) {
      gtag("event", "click", {
        event_category: "Puzzle",
        event_label: "Win",
      });
      document.querySelector(".puzzle").classList.add("complete");
    }
  }
}

function isValidMove(square) {
  const emptyCell = document.querySelector(".empty");
  const [row, column] = square.dataset.cell.split("-");
  const [emptyRow, emptyColumn] = emptyCell.dataset.cell.split("-");
  return (row === emptyRow && Math.abs(emptyColumn - column) === 1) || (column === emptyColumn && Math.abs(emptyRow - row) === 1);
}

function isWin() {
  let squares = document.getElementsByClassName("square");
  const squaresOrder = [...squares].sort((a, b) => (a.dataset.cell > b.dataset.cell ? 1 : -1));
  let match = squaresOrder.every((el, i) => el.dataset.cell == squares[i].dataset.cell);
  return match;
}

function scramble() {
  const VALID_MOVES = {
    "0-0": ["1-0", "0-1"],
    "0-1": ["1-1", "0-0", "0-2"],
    "0-2": ["1-2", "0-1", "0-3"],
    "0-3": ["1-3", "0-2"],
    "1-0": ["0-0", "2-0", "1-1"],
    "1-1": ["0-1", "2-1", "1-0", "1-2"],
    "1-2": ["0-2", "2-2", "1-1", "1-3"],
    "1-3": ["0-3", "2-3", "1-2"],
    "2-0": ["1-0", "3-0", "2-1"],
    "2-1": ["1-1", "3-1", "2-0", "2-2"],
    "2-2": ["1-2", "3-2", "2-1", "2-3"],
    "2-3": ["1-3", "3-3", "2-2"],
    "3-0": ["2-0", "3-1"],
    "3-1": ["2-1", "3-0", "3-2"],
    "3-2": ["2-2", "3-1", "3-3"],
    "3-3": ["2-3", "3-2"],
  };

  let previous = null;
  for (let i = 0; i < 30; i++) {
    const emptySquare = document.querySelector(".empty").dataset.cell;
    const randomSquare = VALID_MOVES[emptySquare][Math.floor(Math.random() * VALID_MOVES[emptySquare].length)];
    if (randomSquare == previous) continue;
    handleClick(
      {
        currentTarget: document.querySelector(`[data-cell='${randomSquare}']`),
      },
      true
    );
    previous = emptySquare;
  }
}

document.getElementById("shuffle").onclick = () => {
  gtag("event", "click", {
    event_category: "Puzzle",
    event_label: "Scramble",
  });
  if (grid.classList.contains("complete")) {
    grid.classList.remove("complete");
    setTimeout(() => {
      scramble();
    }, 300);
  } else {
    scramble();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const shuffle = document.getElementById("shuffle");
  const observer = new window.IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        observer.unobserve(shuffle);
        setTimeout(() => {
          scramble();
          setTimeout(() => {
            scramble();
          }, 500);
        }, 500);
        return;
      }
    },
    {
      root: null, // set offset 0.1 means trigger if atleast 10% of element in viewport
    }
  );

  observer.observe(shuffle);
});
