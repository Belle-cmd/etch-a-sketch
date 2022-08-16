const defaultSize = 16;

let currentSize = defaultSize;

const canvas = document.getElementById("canvas");


/**
 * Creates a grid based on parameters. A border is added to each grid cell
 * @param {*} size NxN size of the grid
 * @param {*} border boolean indicating if border should be on or not
 */
function createGrid(size=16, border) {
    for (let i=0; i < size*size; i++) {
        const newDiv = document.createElement("div");
        if (border) {
           newDiv.classList.add("border");
        }
        canvas.appendChild(newDiv);
    }

    // specify grid-template parameters to arrange how the the grids look
    canvas.style.gridTemplate = `repeat(${size}, 20px) / repeat(${size}, 20px)`;
}

createGrid(currentSize, true);