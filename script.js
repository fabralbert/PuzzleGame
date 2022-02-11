'use strict';
let row = 4;
let col = 4;
let cells = row * col;
let randomNumbers = [];
let coordsTop = [];
let coordsLeft = [];






// получение рандомных чисел
function getRandomNumbers() {
  let arrayNums = [];
  for (let i = 1; i < cells; i++) {
    while (cells - 1 !== arrayNums.length) {
      let n = Math.ceil(Math.random() * (cells - 1))
      if (!arrayNums.includes(n)) {
        arrayNums.push(n);
      }
    }
  }
  if (isGood(arrayNums)) {
    const part1 = arrayNums.slice(0, 4);
    const part2 = arrayNums.slice(4, 8).reverse();
    const part3 = arrayNums.slice(8, 12);
    const part4 = arrayNums.slice(12).reverse();
    randomNumbers = [...part1, ...part2, ...part3, ...part4];
    return;
  }
  else {
    getRandomNumbers()
  }
}


const test2 = [4, 14, 1, 3, 13, 7, 5, 6, 8, 15, 2, 9, 10, 11, 12];
console.log(isGood(test2), 'тест1')

// проверка на "возможно ли пройти игру"
function isGood(a) {
  let n = 0
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (a[i] > a[j]) {
        n += 1
      }
    }
  }
  console.log(n, 'n');
  if (n % 2 != 0) {
    return true;
  }
  else {
    return false;
  }
}


getRandomNumbers();

// получение начальных координат

for (let i = 0; i < cells; i++) {

  const numberLeft = i % col;
  const numberTop = (i - numberLeft) / col;
  coordsTop.push(numberTop * 100);
  coordsLeft.push(numberLeft * 100);
}

// пустая ячейка
let emptryCell = {
  left: coordsLeft[coordsLeft.length - 1],
  top: coordsTop[coordsTop.length - 1],
}

// создание ячеек
let puzzle = document.querySelector('.puzzle');
for (let i = 0; i < cells - 1; i++) {
  puzzle.insertAdjacentHTML(
    'beforeend',
    `<div class="cell" id="cell-${randomNumbers[i]}">${randomNumbers[i]}</div>`
  )

  document.querySelector(`#cell-${randomNumbers[i]}`).style.top = `${coordsTop[i]}px`
  document.querySelector(`#cell-${randomNumbers[i]}`).style.left = `${coordsLeft[i]}px`
}


// проверка на выполненную игру
function gameCheck() {
  const rightNums = randomNumbers.sort((a, b) => a - b);

  const actualNums = [];
  for (let i = 1; i < cells; i++) {
    if ((parseFloat(document.querySelector(`#cell-${i}`).style.top) == coordsTop[i - 1]) && (parseFloat(document.querySelector(`#cell-${i}`).style.left) == coordsLeft[i - 1])) {
      actualNums.push(parseInt(document.querySelector(`#cell-${i}`).innerText));
    }
  }
  if (JSON.stringify(actualNums) === JSON.stringify(rightNums)) {
    document.querySelector('.endGame').innerText = 'Вы выйграли!'
  }
}


// движение пазла
puzzle.addEventListener('click', function (e) {
  if (e.target.classList.contains('cell')) {

    const cell = e.target;
    if ((Math.abs(parseFloat(cell.style.top) - emptryCell.top) + (Math.abs(parseFloat(cell.style.left) - emptryCell.left)) == 100)) {
      let saveNumberLeft = cell.style.left;
      let saveNumberTop = cell.style.top;

      cell.style.left = `${emptryCell.left}px`;
      cell.style.top = `${emptryCell.top}px`;

      emptryCell.left = parseFloat(saveNumberLeft);
      emptryCell.top = parseFloat(saveNumberTop);
    }
    gameCheck();
  }
})

