var personsArray = [];
var maxAge = 2021;
var trHeadElement = document.getElementById("thPersons");
var tBodyElement = document.getElementById("tbodyPersons");

var trHeadElementMax = document.getElementById("thPersonsMax");
var tBodyElementMax = document.getElementById("tbodyPersonsMax");

var keys = ["id", "name", "birthDate"];
var tablePersons = new Table(keys, trHeadElement, tBodyElement);
var tablePersonsMax = new Table(keys, trHeadElementMax, tBodyElementMax);

var submitState = {
  idCheck: true,
  nameCheck: true,
  ageCheck: true
};

// Установка запрета на отправку если есть ошибки
function setButton() {
  let submitButton = document.getElementById("submitButton");
  if (!submitState.idCheck && !submitState.ageCheck && !submitState.nameCheck)
    submitButton.disabled = false;
  else submitButton.disabled = true;
}
function showHiddenDiv(divId) {
  let hiddenDivs = ["showPersons", "addPerson", "generatePersons"];
  hiddenDivs.forEach(item => {
    document.getElementById(item).classList.add("hidden");
    document.getElementById(item + "Button").disabled = false;
  });
  document.getElementById(divId).classList.remove("hidden");
  document.getElementById(divId + "Button").disabled = true;
}
drawMaxAge = () => {
  tablePersonsMax.clear();
  personsArray.forEach(person => {
    if (person.birthDate < maxAge) maxAge = person.birthDate;
  });
  personsArray.forEach(person => {
    if (maxAge === person.birthDate) {
      tablePersonsMax.addRow(person);
    }
  });
};
// Добавить в список
addPerson = () => {
  let idString = document.getElementById("idString");
  let name = document.getElementById("name");
  let birthDate = document.getElementById("birthDate");
  let currentPerson = {
    id: parseInt(idString.value),
    name: name.value,
    birthDate: parseInt(birthDate.value)
  };
  tablePersons.addRow(currentPerson);
  personsArray.push(currentPerson);
  idString.value = name.value = birthDate.value = "";
  submitState.idCheck = submitState.ageCheck = submitState.nameCheck = true;
  setButton();
  drawMaxAge();
  showHiddenDiv("showPersons");
};

function generatePersons() {
  let iterations = parseInt(document.getElementById("amountOfPersons").value);
  maxAge = 2021;
  let nameArray = [
    "Вася",
    "Петя",
    "Коля",
    "Маша",
    "Сергей",
    "Даша",
    "Лена",
    "Юра",
    "Игорь",
    "Света",
    "Саша"
  ];
  tablePersons.clear();
  personsArray = [];
  for (let i = 0; i < iterations; i++) {
    let idIndex = getRandomNumber(100, 999);
    while (getIndexFromPerson(personsArray, idIndex) != -1) {
      idIndex = getRandomNumber(100, 999);
    }
    let nameIndex = getRandomNumber(0, nameArray.length - 1);
    let birthDateIndex = getRandomNumber(1920, 2020);
    let currentPerson = {
      id: idIndex,
      name: nameArray[nameIndex],
      birthDate: birthDateIndex
    };
    tablePersons.addRow(currentPerson);
    personsArray.push(currentPerson);
  }
  document.getElementById("amountOfPersons").value = "";
  document.getElementById("generateButton").disabled = true;
  drawMaxAge();
  showHiddenDiv("showPersons");
}
