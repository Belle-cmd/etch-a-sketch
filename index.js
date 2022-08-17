const canvas = document.getElementById("canvas");
const slider = document.getElementById("slider");
const sliderOutput = document.getElementById("slider-text");
const rainbowBtnID = document.getElementById("randomize");
const warmBtnID = document.getElementById("warm");
const coldBtnID = document.getElementById("cold");
const bubblegumBtnID = document.getElementById("bubblegum");
const monochromeBtnID = document.getElementById("monochrome");
let isToggling = false;
let colourMode = "";  // signifies what colour a div's background should have
const warm = ["#ffedbf", "#ffcd74", "#ffca7b", "#ff7251", "#9b2948", "#cf6d23", "#f5bc11", "#cf2743"];
const cold = ["#eff6e0", "#aec3b0", "#598392", "#124559", "#aef2ee", "#9195B8", "#C8B7BE", "#6E8FCA"];
const bubblegum = ["#fbb9c5", "#e6c8fe", "#fcf7e3", "#c3edbf", "#b8dfe6", "#a14a76", "#ffa8a9", "#2c0915"];


/**
 * Creates a grid based on parameters. A border is added to each grid cell
 * @param {*} size NxN size of the grid
 * @param {*} border boolean indicating if border should be on or not
 */
function createGrid(size=16) {
    for (let i=0; i < size*size; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("border");
        newDiv.classList.add("cell-hover");
        canvas.appendChild(newDiv);
    }
    // specify grid-template parameters to arrange how the the grids look
    let side = 650/size;
    canvas.style.gridTemplate = `repeat(${size}, ${side}px) / repeat(${size},  ${side}px)`;
    colorCells();
}

function randomPalette() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


/**
 * Remove all the grid cells
 */
function removeGrid() {
    canvas.textContent = "";
}


// functions in charge of changing cell colours

/**
 * Changes isToggling to true to start toggle() to find the element that received the event
 * @param {*} e mouse event
 */ 
function enableToggle(e) {
    isToggling = true;
    if (e.target !== canvas) {
      toggle(e);
    }
}
/**
 * Turns off isToggling to indicate that 
 */
function disableToggle() {
    console.log('disableToggle');
    isToggling = false;
  }
  /**
   * Changes cell colour by finding the cell that triggered the event and styling it. This is the function
   * in charge of colouring all the other divs that the mouse touches.
   * @param {*} e mouse event used to find the cell that triggered the event
   * @returns 
   */
function toggle(e) {
    if (isToggling === false) {
      return;
    }
    // e.target is the cell that initiated the event
    if (colourMode==="rainbow") {
        e.target.style.backgroundColor = randomPalette();
    } else if (colourMode==="warm") {
        const index = Math.floor(Math.random() * warm.length);
        e.target.style.backgroundColor = warm[index];
    } else if (colourMode==="cold") {
        const index = Math.floor(Math.random() * cold.length);
        e.target.style.backgroundColor = cold[index];
    } else if (colourMode==="bubblegum") {
        const index = Math.floor(Math.random() * bubblegum.length);
        e.target.style.backgroundColor = bubblegum[index];
    } else if (colourMode==="monochrome") {
        
    }
}
  /**
   * Function that uses enableToggle(), toggle(), disableToggle() to colour div backgrounds
   */
function colorCells() {
    canvas.onmousedown = enableToggle;
    for (let i = 0; i < canvas.children.length; i++) {
        canvas.children[i].onmouseenter = toggle;  // change div's colour whenever mouse enter's its element borders
    }
      canvas.onmouseup = disableToggle;  // only disable divs' colouring when mouse is outside the canvas
}

rainbowBtnID.addEventListener("click", () => {colourMode = "rainbow"});
warmBtnID.addEventListener("click", () => {colourMode = "warm"});
coldBtnID.addEventListener("click", () => {colourMode = "cold"});
bubblegumBtnID.addEventListener("click", () => {colourMode = "bubblegum"});
monochromeBtnID.addEventListener("click", () => {colourMode = "monochrome"});


window.onload = (event) => {
    sliderOutput.textContent = `${slider.value} x ${slider.value}`;
    colourMode="rainbow";
    createGrid();
}


// every time the slider is toggled, its value is shown through p tag's text and a new grid is made
slider.oninput = function() {
    sliderOutput.textContent = `${this.value} x ${this.value}`;
    removeGrid();
    createGrid(this.value);
}