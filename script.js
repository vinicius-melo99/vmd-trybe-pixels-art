const colorPalette = document.querySelector('#color-palette');
const pixelBoard = document.getElementById('pixel-board');

function setPrimaryColors() {
  const colors = colorPalette.children;
  for (let index = 1; index < colors.length - 1; index += 1) {
    if (index === 1) colors[index].style.backgroundColor = 'red';
    else if (index === 2) colors[index].style.backgroundColor = 'green';
    else if (index === 3) colors[index].style.backgroundColor = 'blue';
  }
}

function initialRenderization() {
  if (localStorage.getItem('colorPalette') === null) {
    setPrimaryColors();
    localStorage.setItem('colorPalette', JSON.stringify(['red', 'green', 'blue']));
  } else {
    const colors = colorPalette.children;
    const colorList = JSON.parse(localStorage.getItem('colorPalette'));
    for (let index = 1; index < colors.length - 1; index += 1) {
      colors[index].style.backgroundColor = colorList[index - 1];
    }
  }
}

function createColorPalette() {
  for (let index = 0; index <= 3; index += 1) {
    const color = document.createElement('div');
    color.className = 'color';
    colorPalette.appendChild(color);

    if (index === 0) {
      color.classList.add('selected');
      color.style.backgroundColor = 'black';
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

function generatePixelBoard() {
  for (let index = 0; index < 5; index += 1) {
    for (let index2 = 0; index2 < 5; index2 += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.style.backgroundColor = 'white';
      pixelBoard.appendChild(pixel);
    }
    const breakRow = document.createElement('br');
    pixelBoard.appendChild(breakRow);
  }
}

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

function paintPixel(event) {
  const clicked = event.target;
  const colorSelected = document.querySelector('.selected');

  if (clicked !== pixelBoard) {
    console.log(clicked);
    clicked.style.backgroundColor = colorSelected.style.backgroundColor;
  }
}

pixelBoard.addEventListener('click', paintPixel);

initialRenderization();
generatePixelBoard();
