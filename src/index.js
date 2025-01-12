import { Expression } from './expression';

document.addEventListener('DOMContentLoaded', setup);

function setup() {
  const diffButton = document.getElementById('diffButton');
  diffButton.onclick = handleDiff;
}

function handleDiff() {
  // Получаем выражение и переменную из полей ввода
  const expressionInput = document.getElementById('expression').value;
  const variableInput = document.getElementById('variable').value;

  // Если оба поля заполнены
  if (expressionInput && variableInput) {
    const expr = new Expression(expressionInput);
    const result = expr.diff(variableInput); // Дифференцируем
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `Result: ${result.toString()}`; // Отображаем результат
  } else {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = 'Please provide both expression and variable.'; // Если не все поля заполнены
  }
}
