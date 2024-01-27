const container = document.querySelector(".container");
const createGridBtn = document.querySelector("button.create-grid");
const clearGridBtn = document.querySelector("button.clear-grid");
const colorValue = document.querySelector('input[type="color"]#paint-color');
const paintBtn = document.querySelector("button.paint-grid");
const eraseBtn = document.querySelector("button.erase-grid");
const widthRange = document.getElementById("width-range");
const heightRange = document.getElementById("height-range");
const widthValue = document.querySelector(".width-value");
const heightValue = document.querySelector(".height-value");

widthRange.addEventListener("change", (e) => {
  widthValue.value = widthRange.value;
});
heightRange.addEventListener("change", (e) => {
  heightValue.value = heightRange.value;
});
widthValue.addEventListener("change", (e) => {
  widthRange.value = widthValue.value;
});
heightValue.addEventListener("change", (e) => {
  heightRange.value = heightValue.value;
});

createGridBtn.addEventListener("click", (e) => {
  // Clear the existing grid before creating a new one
  Grid.setColor("white");
  Grid.removeGrid(container);
  let numCols = parseInt(widthRange.value, 10),
    numRows = parseInt(heightRange.value, 10);
  if (!isNaN(numRows) && !isNaN(numCols)) {
    Grid.createGrid(container, numRows, numCols);
  }
});

clearGridBtn.addEventListener("click", (e) => {
  Grid.setColor("white");
  Grid.removeGrid(container);
  Grid.createGrid(container, widthRange.value, heightRange.value);
});

paintBtn.addEventListener("click", (e) => {
  Grid.setColor(colorValue.value);
});

eraseBtn.addEventListener("click", (e) => {
  Grid.setColor("white");
});

class Grid {
  static createGrid(container, numRows, numCols) {
    container.style.setProperty("--grid-rows", numRows);
    container.style.setProperty("--grid-cols", numCols);
    // container.style.gridTemplateRows = `repeat(${numRows}, auto)`;
    // container.style.gridTemplateColumns = `repeat(${numCols}, auto)`;

    for (let i = 0; i < numRows * numCols; i++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-item");
      cell.addEventListener("mouseover", Grid.paintCell);
      container.appendChild(cell);
    }
    console.log("created");
  }

  static removeGrid(container) {
    const gridItems = container.querySelectorAll(".grid-item");
    gridItems.forEach((item) => {
      item.remove();
    });
    console.log("removed");
  }

  static paintCell(e) {
    const cell = e.target;
    cell.style.backgroundColor = Grid.color;
    console.log("painted");
  }

  static setColor(color) {
    Grid.color = color;
  }
}

Grid.color = "white";
