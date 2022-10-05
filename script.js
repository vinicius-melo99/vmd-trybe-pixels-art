const body = document.querySelector('#body');
const colorPalette = document.getElementById('color-palette');
let pixelBoard = document.getElementById('pixel-board');
const clearBoardButton = document.getElementById('clear-board');
const insertValue = document.getElementById('board-size');
const buttonGenerateBoard = document.getElementById('generate-board');

function setPrimaryColors() {
  const colors = colorPalette.children;
  for (let index = 1; index < colors.length - 1; index += 1) {
    if (index === 1) colors[index].style.backgroundColor = 'red';
    else if (index === 2) colors[index].style.backgroundColor = 'green';
    else if (index === 3) colors[index].style.backgroundColor = 'blue';
  }
}

function createColorPalette() {
  for (let index = 0; index <= 3; index += 1) {
    const color = document.createElement('div');
    color.className = 'color';
    colorPalette.appendChild(color);

    if (index === 0) {
      color.classList.add('selected');
      color.style.backgroundColor = 'rgb(0, 0, 0)';
    }
  }
  const button = document.createElement('button');
  button.innerText = 'Cores aleatórias';
  button.id = 'button-random-color';
  colorPalette.appendChild(button);

  return button;
}

const randomButton = createColorPalette();

function addColorsToLocalStorage() {
  const colors = colorPalette.children;
  const oldColors = JSON.parse(localStorage.getItem('colorPalette'));

  for (let index = 1; index < colors.length - 1; index += 1) {
    oldColors[index - 1] = colors[index].style.backgroundColor;
  }
  localStorage.setItem('colorPalette', JSON.stringify(oldColors));
}

function generateRandomColors() {
  const colors = colorPalette.children;
  for (let index = 1; index < colors.length - 1; index += 1) {
    const r = Math.floor(Math.random() * 255) + 1;
    const g = Math.floor(Math.random() * 255) + 1;
    const b = Math.floor(Math.random() * 255) + 1;

    colors[index].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
  addColorsToLocalStorage();
}

randomButton.addEventListener('click', generateRandomColors);

function insertNewBoard() {
  let valueXY = 0;

  if (insertValue.value > 0) {
    if (insertValue.value < 5) {
      insertValue.value = 5;
      valueXY = insertValue.value;
      localStorage.setItem('boardSize', JSON.stringify(valueXY));
      removeOldBoard(valueXY, valueXY);
    } else if (insertValue.value > 50) {
      insertValue.value = 50;
      valueXY = insertValue.value;
      localStorage.setItem('boardSize', JSON.stringify(valueXY));
      removeOldBoard(valueXY, valueXY);
    } else {
      valueXY = insertValue.value;
      localStorage.setItem('boardSize', JSON.stringify(valueXY));
      removeOldBoard(valueXY, valueXY);
    }
  } else {
    alert('Board Inválido!');
  }
}
buttonGenerateBoard.addEventListener('click', insertNewBoard);

function removeOldBoard(x, y) {
  localStorage.removeItem('pixelBoard');
  localStorage.setItem('pixelBoard', JSON.stringify([]));
  pixelBoard.removeEventListener('click', paintPixel);
  pixelBoard.remove();

  const newPixelBoard = document.createElement('section');
  newPixelBoard.id = 'pixel-board';
  body.appendChild(newPixelBoard);
  pixelBoard = document.getElementById('pixel-board');

  generatePixelBoard(x, y);
  pixelBoard.addEventListener('click', paintPixel);
}

function generatePixelBoard(x, y) {
  let id = 0;
  for (let index = 0; index < y; index += 1) {
    for (let index2 = 0; index2 < x; index2 += 1) {
      const pixel = document.createElement('div');
      pixel.id = id;
      pixel.className = 'pixel';
      pixel.style.backgroundColor = 'rgb(255, 255, 255)';
      pixelBoard.appendChild(pixel);
      id += 1;
    }
    const breakRow = document.createElement('br');
    pixelBoard.appendChild(breakRow);
  }
  return document.getElementsByClassName('pixel');
}

let pixels = null;

function selectColor(event) {
  const clicked = event.target;
  const colors = colorPalette.children;

  if (clicked !== colorPalette && clicked !== randomButton) {
    for (let index = 0; index < colors.length - 1; index += 1) {
      colors[index].classList.remove('selected');
    }
    clicked.classList.add('selected');
  }
}

colorPalette.addEventListener('click', selectColor);

function addPixelsToLocalStorage() {
  if (localStorage.getItem('pixelBoard') === null) {
    localStorage.setItem('pixelBoard', JSON.stringify([]));
  }
  const positionsAndColors = [];
  for (let index = 0; index < pixels.length; index += 1) {
    positionsAndColors.push([pixels[index].id, pixels[index].style.backgroundColor]);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(positionsAndColors));
}

function paintPixel(event) {
  const clicked = event.target;
  const colorSelected = document.querySelector('.selected');

  if (clicked !== pixelBoard) {
    clicked.style.backgroundColor = colorSelected.style.backgroundColor;
  }
  addPixelsToLocalStorage();
}

pixelBoard.addEventListener('click', paintPixel);

function clearBoard() {
  const getPixels = pixelBoard.children;

  for (let index = 0; index < getPixels.length; index += 1) {
    getPixels[index].style.backgroundColor = 'rgb(255, 255, 255)';
  }
  addPixelsToLocalStorage();
}

clearBoardButton.addEventListener('click', clearBoard);

function applyColorsToGrid() {
  const pixelList = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let index2 = 0; index2 < pixelList.length; index2 += 1) {
    for (let index3 = 0; index3 < pixelList[index2].length; index3 += 1) {
      pixels[index2].style.backgroundColor = pixelList[index2][index3 + 1];
    }
  }
}

function initialRenderization() {
  if (localStorage.getItem('colorPalette') === null) {
    localStorage.setItem('colorPalette', JSON.stringify(['red', 'green', 'blue']));
    localStorage.setItem('pixelBoard', JSON.stringify([]));
    localStorage.setItem('boardSize', JSON.stringify(5));
    setPrimaryColors();
    pixels = generatePixelBoard(JSON.parse(localStorage.getItem('boardSize')), JSON.parse(localStorage.getItem('boardSize')));
  } else {
    pixels = generatePixelBoard(JSON.parse(localStorage.getItem('boardSize')), JSON.parse(localStorage.getItem('boardSize')));
    const colors = colorPalette.children;
    const colorList = JSON.parse(localStorage.getItem('colorPalette'));
    for (let index = 1; index < colors.length - 1; index += 1) {
      colors[index].style.backgroundColor = colorList[index - 1];
    }
    applyColorsToGrid();
  }
}

initialRenderization();
