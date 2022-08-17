const canvas = document.getElementById("canvas");
const slider = document.getElementById("slider");
const sliderOutput = document.getElementById("slider-text");
const rainbowBtnID = document.getElementById("randomize");
const warmBtnID = document.getElementById("warm");
const coldBtnID = document.getElementById("cold");
const bubblegumBtnID = document.getElementById("bubblegum");
const monochromeBtnID = document.getElementById("monochrome");



/**
 * Creates a grid based on parameters. A border is added to each grid cell
 * @param {*} size NxN size of the grid
 * @param {*} border boolean indicating if border should be on or not
 */
function createGrid(size=16) {
    for (let i=0; i < size*size; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("cell-hover");
        newDiv.classList.add("cell-active");
        newDiv.classList.add("border");
        canvas.appendChild(newDiv);
    }

    // specify grid-template parameters to arrange how the the grids look
    let side = 650/size;
    canvas.style.gridTemplate = `repeat(${size}, ${side}px) / repeat(${size},  ${side}px)`;
}

/**
 * Remove all the grid cells
 */
function removeGrid() {
    canvas.textContent = "";
}




window.onload = (event) => {
    sliderOutput.textContent = `${slider.value} x ${slider.value}`;  // set slider's text to the slider' default value at start
    createGrid(this.value, true);
}


// every time the slider is toggled, its value is shown through p tag's text and a new grid is made
slider.oninput = function() {
    sliderOutput.textContent = `${this.value} x ${this.value}`;
    removeGrid();
    createGrid(this.value, true);
}