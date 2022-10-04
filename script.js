const colorPalette = document.querySelector('#color-palette');

function createColorPalette() {
  for (let index = 0; index <= 3; index += 1) {
    const color = document.createElement('div');
    color.className = 'color';
    colorPalette.appendChild(color);
  }
  const button = document.createElement('button');
  button.innerText = 'Cores aleatórias';
  button.id = 'button-random-color';
  colorPalette.appendChild(button);

  return button;
}

const randomButton = createColorPalette();

function generateRandomColors() {
  const colors = colorPalette.children;

  for (let index = 1; index < colors.length - 1; index += 1) {
    const r = Math.floor(Math.random() * 255) + 1;
    const g = Math.floor(Math.random() * 255) + 1;
    const b = Math.floor(Math.random() * 255) + 1;

    colors[index].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
}

function initialRenderization() {
  const colors = colorPalette.children;

  for (let index = 1; index < colors.length - 1; index += 1) {
    if (index === 1) colors[index].style.backgroundColor = 'red';
    else if (index === 2) colors[index].style.backgroundColor = 'green';
    else if (index === 3) colors[index].style.backgroundColor = 'blue';
  }
}

randomButton.addEventListener('click', () => {
  generateRandomColors();
});

initialRenderization();
