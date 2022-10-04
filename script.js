const colorPalette = document.querySelector('#color-palette');

function createColorPalette() {
  for (let index = 0; index <= 3; index += 1) {
    const color = document.createElement('div');
    color.className = 'color';
    colorPalette.appendChild(color);
  }
}

function generateRandomColors() {
  const colors = colorPalette.children;

  for (let index = 1; index < colors.length; index += 1) {
    const r = Math.floor(Math.random() * 255) + 1;
    const g = Math.floor(Math.random() * 255) + 1;
    const b = Math.floor(Math.random() * 255) + 1;

    colors[index].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
}

function initialRenderization() {
  const colors = colorPalette.children;

  for (let index = 1; index < colors.length; index += 1) {
    if (index === 1) colors[index].style.backgroundColor = 'red';
    else if (index === 2) colors[index].style.backgroundColor = 'green';
    else if (index === 3) colors[index].style.backgroundColor = 'blue';
  }
}

createColorPalette();
initialRenderization();
