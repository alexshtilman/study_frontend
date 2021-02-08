// Генерация элементов массива
function generatePersons() {
  let iterations = parseInt(document.getElementById("amountOfPersons").value);
  maxAge = 2021;
  tablePersons.clear();
  personsArray = [];
  personsArrayWithFilter = [];
  filterApplied = false;
  document.getElementById("filterDiv").classList.add("hidden");
  for (let i = 0; i < iterations; i++) {
    let idIndex = getRandomNumber(100, 999);
    while (getIndexFromPerson(idIndex) != -1) {
      idIndex = getRandomNumber(100, 999);
    }
    let nameIndex = getRandomNumber(0, nameArray.length - 1);
    let birthDateIndex = getRandomNumber(1920, 2020);
    let currentPerson = {
      id: idIndex,
      name: nameArray[nameIndex],
      birthDate: birthDateIndex
    };
    personsArray.push(currentPerson);
  }
  document.getElementById("amountOfPersons").value = "";
  document.getElementById("generateButton").disabled = true;
  setButton();
  showPersons();
  showHiddenDiv("showPersons");
}
