let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");

// Create a message container for winner/draw message
let msgContainer = document.createElement("div");
let msg = document.createElement("h2");
msgContainer.appendChild(msg);

// Insert it before the reset button within the same parent
reset.parentNode.insertBefore(msgContainer, reset);

let turnO = true; // Player O starts

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
  msg.innerText = "";
};

const showWinner = (winner) => {
  msg.innerText = `🎉 Winner is ${winner}!`;
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return;
    }
  }

  // Check for draw
  let isDraw = Array.from(boxes).every(box => box.innerText !== "");
  if (isDraw) {
    msg.innerText = "It's a Draw!";
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    turnO = !turnO;
    checkWinner();
  });
});

reset.addEventListener("click", () => {
  turnO = true;
  enableBoxes();
});
