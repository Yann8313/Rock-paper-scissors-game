const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('resetBtn');
const InputPlayer = document.getElementById('input');
const computerTemplate = document.getElementById('renderChoiceComputer');
const playerTemplate = document.getElementById('renderChoicePlayer');
const resultsGame = document.getElementById('game__inputPlayer');
const resultTemplate = document.getElementById('results');
const ROCK_IMG =
  'https://tse3.mm.bing.net/th?id=OIP.oPtkA144yro22LfWBsq0HQHaHi&pid=Api';
const PAPER_IMG =
  'https://tse4.mm.bing.net/th?id=OIP.o4SK46MwwJInumHyCpbZmgHaHa&pid=Api';
const SCISSORS_IMG =
  'https://tse1.mm.bing.net/th?id=OIP.m35GfSw49okBYFDyTOe3_AHaHa&pid=Api';

let renderAllChoices = document.getElementById('renderAllChoices');

let choiceTemplate;
let choice;
let result;



const game = () => { 
  let value = InputPlayer.value.toUpperCase().trim();
  let randomValue = Math.random().toFixed(2) * 100;
  const ROCK = randomValue <= 30;
  const PAPER = randomValue > 30 && randomValue <= 70;
  const SCISSORS = randomValue > 70;

  const renderImg = () => {
    let renderChoice = document.createElement('div');
    renderChoice.className = 'imgChoice';
    const choiceBody = document.importNode(choiceTemplate.content, true);
    choiceBody.querySelector('img').src = choice;
    renderChoice.append(choiceBody);
    renderAllChoices.appendChild(renderChoice);
  };

  const showResults = (value) => {
    if (
      (value === 'ROCK' && ROCK) ||
      (value === 'PAPER' && PAPER) ||
      (value === 'SCISSORS' && SCISSORS)
    ) {
      result = 'EQUALITY !';
    } else if (
      (value === 'ROCK' && SCISSORS) ||
      (value === 'PAPER' && ROCK) ||
      (value === 'SCISSORS' && PAPER)
    ) {
      result = ' YOU WON ! ';
    } else {
      result = 'YOU LOSE :(';
    }
    const renderResults = document.createElement('div');
    renderResults.className = 'result';
    const resultsBody = document.importNode(resultTemplate.content, true);
    resultsBody.querySelector('h1').textContent = result;
    renderResults.append(resultsBody);
    resultsGame.appendChild(renderResults);
  };

  const computerChoice = () => {
    console.log(randomValue);
    if (ROCK) {
      choice = ROCK_IMG;
    } else if (PAPER) {
      choice = PAPER_IMG;
    } else if (SCISSORS) {
      choice = SCISSORS_IMG;
    }
    choiceTemplate = computerTemplate;
    renderImg();
  };

  const playerChoice = () => {
    console.log(value);
    switch (value) {
      case 'ROCK':
        choice = ROCK_IMG;
        break;
      case 'PAPER':
        choice = PAPER_IMG;
        break;
      case 'SCISSORS':
        choice = SCISSORS_IMG;
        break;
      default:
        alert('Wrong value');
        return;
    }
    choiceTemplate = playerTemplate;
    renderImg();
  };

  playerChoice();
  computerChoice();
  showResults(value);
  startBtn.style.display = 'none';
  resetBtn.style.display = 'block';
}

(function keyValidation(btn) {
  InputPlayer.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      btn.click();
      startBtn.removeEventListener('click', game);
    }
  });
})(startBtn);

const clearElement = () => {
  InputPlayer.value = '';
  renderAllChoices.querySelectorAll('.imgChoice').forEach((img) => {
    img.remove();
  });
  resultsGame.querySelector('.result').remove();
  resetBtn.style.display = 'none';
  startBtn.style.display = 'block';
  startBtn.addEventListener('click', game);
};




resetBtn.addEventListener('click', clearElement);
startBtn.addEventListener('click', game);