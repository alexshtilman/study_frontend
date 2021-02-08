var personsArray = [];
var maxAge = 2021;

var submitState = {
  idCheck: true,
  nameCheck: true,
  ageCheck: true
};
// Поиск элемента в массиве по id
getIndexFromPerson = personId => {
  let index = personsArray.findIndex(function(b) {
    return b.id === personId;
  });
  return index;
};
// Удаление элемента по айди из массив из из Dom
removeElement = elemId => {
  const index = getIndexFromPerson(elemId);
  if (index >= 0) {
    personsArray.splice(index, 1);
    document.getElementById(elemId).remove();
  }
  drawMaxAge();
};
//Отрисовка персона с минимальным возрастом
drawMaxAge = () => {
  let orderedListWithMaxAge = document.getElementById("orderedListWithMaxAge");
  removeChildren(orderedListWithMaxAge);
  personsArray.forEach(person => {
    if (maxAge === person.birthDate) {
      let oldestPersonItem = document.createElement("li");
      oldestPersonItem.textContent = JSON.stringify(person);
      orderedListWithMaxAge.append(oldestPersonItem);
    }
  });
};
// Проверка на минимум
function checkMinMax(value, minVal, maxVal) {
  return value > minVal && value < maxVal;
}
function removeChildren(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
}
// Установка запрета на отправку если есть ошибки
function setButton() {
  let submitButton = document.getElementById("submitButton");
  if (!submitState.idCheck && !submitState.ageCheck && !submitState.nameCheck)
    submitButton.disabled = false;
  else submitButton.disabled = true;
}
document.getElementById("name").addEventListener("change", function(event) {
  event.target.value == ""
    ? (submitState.nameCheck = true)
    : (submitState.nameCheck = false);
  setButton();
});

document.getElementById("idString").addEventListener("change", function(event) {
  if (!checkMinMax(parseInt(event.target.value), 100, 999)) {
    alert("Id value should be in the range [100-999]");
    submitState.idCheck = true;
  } else {
    if (getIndexFromPerson(parseInt(event.target.value)) != -1) {
      alert("id isn’t unique");
      submitState.idCheck = true;
    } else submitState.idCheck = false;
  }
  setButton();
});
document
  .getElementById("birthDate")
  .addEventListener("change", function(event) {
    if (!checkMinMax(parseInt(event.target.value), 1920, 2020)) {
      alert("Id value should be in the range [1920-2020]");
      submitState.ageCheck = true;
    } else {
      submitState.ageCheck = false;
    }
    setButton();
  });

drawElements = () => {
  let testAge = 2021;
  let orderedList = document.getElementById("orderedList");
  removeChildren(orderedList);
  personsArray.forEach(person => {
    let liItem = document.createElement("li");
    liItem.setAttribute("id", person.id);
    let textWrap = document.createElement("span");
    let spanWrap = document.createElement("span");
    textWrap.textContent = JSON.stringify(person);
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "remove";
    deleteButton.addEventListener("click", function() {
      removeElement(person.id);
    });
    spanWrap.append(deleteButton);
    liItem.append(textWrap);
    liItem.append(spanWrap);
    orderedList.append(liItem);
    if (person.birthDate < testAge) testAge = person.birthDate;
  });
  maxAge = testAge;
  if (personsArray.length == 1) maxAge = personsArray[0].birthDate;
  drawMaxAge();
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
  personsArray.push(currentPerson);
  drawElements();
  idString.value = name.value = birthDate.value = "";
  submitState.idCheck = submitState.ageCheck = submitState.nameCheck = true;
  setButton();
};
