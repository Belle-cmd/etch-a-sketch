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
const clearID = document.getElementById("clear");
const eyedropID = document.getElementById("eyedrop");
const eraserID = document.getElementById("eraser");
const colourPickerID = document.getElementById("colourPicker");


/**
 * Creates a grid based on parameters. A border is added to each grid cell
 * @param {*} size NxN size of the grid
 * @param {*} border boolean indicating if border should be on or not
 */
function createGrid(size=16) {
    for (let i=0; i < size*size; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("border");
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


/**
 * This function takes rgb in type string, and uses regular expressions to retrieve the rgb values.
 * @param {*} string rgb format but in type string
 * @returns array containing the rgb values of type number
 */
function rgbSlicer(string) {
    const regex = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;  // regex parsing rgb() string
    const match = regex.exec(string);
    const r = Number(match[1]);  // retrieve individual rgb values
    const g = Number(match[2]);
    const b = Number(match[3]);
    return [r, g, b];
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
        const rgb = window.getComputedStyle(e.target, null).getPropertyValue("background-color");
        const rgbArray = rgbSlicer(rgb);
        const oldR = rgbArray[0];
        const oldG = rgbArray[1];
        const oldB = rgbArray[2];
        
        if ((oldR <= 120 && oldR>0) && (oldG<=120 && oldG>0) && (oldB<= 120 && oldB>0)) {
            // if the rgb values are already grey, subtract to darken it
            const r = oldR - 12;
            const g = oldG - 12;
            const b = oldB - 12;
            e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        } else if ((oldR == 0) && (oldG == 0) && (oldB == 0)) {
            return;  // the div is already black, exit the function
        } else {
            // if the rgb value is not grey, make it so
            e.target.style.backgroundColor = "rgb(120, 120, 120)";
        }
    } else if (colourMode==="eraser") {
        const rgb = window.getComputedStyle(e.target, null).getPropertyValue("background-color");
        const rgbArray = rgbSlicer(rgb);
        rgbArray.forEach(element => {
            if (element !== 255) {
                return;  // end the function without doing anything
            }
        });
        // since the code passed the loop, the div has a coloured background
        e.target.style.backgroundColor = "rgb(255, 255, 255)";
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
clearID.addEventListener("click", () => {
    removeGrid();
    createGrid(slider.value);
})
eraserID.addEventListener("click", () => {colourMode = "eraser"});


window.onload = (event) => {
    sliderOutput.textContent = `${slider.value} x ${slider.value}`;
    colourMode="rainbow";
    createGrid(slider.value);
}


// every time the slider is toggled, its value is shown through p tag's text and a new grid is made
slider.oninput = function() {
    sliderOutput.textContent = `${this.value} x ${this.value}`;
    removeGrid();
    createGrid(this.value);
}