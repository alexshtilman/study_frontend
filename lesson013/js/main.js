var personsArray = [];
var personsArrayWithFilter = [];
var maxAge = 2021;
var trHeadElement = document.getElementById("thPersons");
var tBodyElement = document.getElementById("tbodyPersons");
var filterApplyed = false;
var sortMode = "unsorted";

var keys = ["id", "name", "birthDate"];
var tablePersons = new Table(keys, trHeadElement, tBodyElement);

var submitState = {
  idCheck: true,
  nameCheck: true,
  ageCheck: true
};

var ageSubmitState = {
  minValState: true,
  maxValState: true
};

var hiddenDivs = ["showPersons", "addPerson", "generatePersons", "filterByAge"];
var currentDiv = "";

document
  .getElementById("sortBySelect")
  .addEventListener("change", function(event) {
    sortMode = event.target.value;
    document.getElementById("sortModeSpan").textContent =
      sortMode === "unsorted" ? "" : "sorted by " + sortMode;
    switch (currentDiv) {
      case "showPersons": {
        sortPersonsWidthMode();
        showTable();
        break;
      }
      case "addPerson": {
        sortPersonsWidthMode();
        drawElements();
        break;
      }
      default:
        break;
    }
  });

document.getElementById("name").addEventListener("change", function(event) {
  event.target.value == ""
    ? (submitState.nameCheck = true)
    : (submitState.nameCheck = false);
  setButton();
});

document.getElementById("idString").addEventListener("change", function(event) {
  if (!checkMinMax(parseInt(event.target.value), 100, 999)) {
    alert("Id value should be in the range [100-999]");
    document.getElementById("idString").focus();
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
  .getElementById("amountOfPersons")
  .addEventListener("change", function(event) {
    let generateButton = document.getElementById("generateButton");
    if (!checkMinMax(parseInt(event.target.value), 0, 11)) {
      alert("Id value should be in the range [1-10]");
      document.getElementById("amountOfPersons").focus();
      generateButton.disabled = true;
    } else {
      generateButton.disabled = false;
    }
  });

document.getElementById("minYear").addEventListener("change", function(event) {
  if (!checkMinMax(parseInt(event.target.value), 1920, 2020)) {
    alert("min year should be in range [1920-2020]");
    document.getElementById("minYear").focus();
    ageSubmitState.minValState = true;
  } else {
    ageSubmitState.minValState = false;
  }
  setButtonAge();
});

document.getElementById("maxYear").addEventListener("change", function(event) {
  if (!checkMinMax(parseInt(event.target.value), 1920, 2020)) {
    alert("min year should be in range [1920-2020]");
    document.getElementById("maxYear").focus();
    ageSubmitState.maxValState = true;
  } else {
    ageSubmitState.maxValState = false;
  }
  setButtonAge();
});

document
  .getElementById("birthDate")
  .addEventListener("change", function(event) {
    if (!checkMinMax(parseInt(event.target.value), 1920, 2020)) {
      alert("Id value should be in the range [1920-2020]");
      document.getElementById("birthDate").focus();
      submitState.ageCheck = true;
    } else {
      submitState.ageCheck = false;
    }
    setButton();
  });
document.getElementById("submitButton").addEventListener("click", function() {
  addPerson();
});
document
  .getElementById("showPersonsButton")
  .addEventListener("click", function() {
    showHiddenDiv("showPersons");
    sortPersonsWidthMode();
    showTable();
  });
document
  .getElementById("addPersonButton")
  .addEventListener("click", function() {
    showHiddenDiv("addPerson");
    sortPersonsWidthMode();
    drawElements();
  });
document
  .getElementById("generatePersonsButton")
  .addEventListener("click", function() {
    showHiddenDiv("generatePersons");
  });
document
  .getElementById("filterByAgeButton")
  .addEventListener("click", function() {
    showHiddenDiv("filterByAge");
  });
document.getElementById("applyFilter").addEventListener("click", function() {
  showHiddenDiv("showPersons");
  filterByBirthYear();
});
document.getElementById("generateButton").addEventListener("click", function() {
  generatePersons();
});
document.getElementById("backButton").addEventListener("click", function() {
  filterApplyed = false;
  showHiddenDiv("showPersons");
  sortPersonsWidthMode();
  document.getElementById("filterDiv").classList.add("hidden");
  showTable();
});
// Проверка на минимум
function checkMinMax(value, minVal, maxVal) {
  return value > minVal && value < maxVal;
}
// Случайный номер в пределах от мин до макс
function getRandomNumber(min, max) {
  return min + Math.round(Math.random() * (max - min));
}
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
  drawElements();
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

// Установка запрета на отправку если есть ошибки в добавлении персона
function setButton() {
  let submitButton = document.getElementById("submitButton");
  if (!submitState.idCheck && !submitState.ageCheck && !submitState.nameCheck)
    submitButton.disabled = false;
  else submitButton.disabled = true;
}
// Запрет на отправку если есть ошибки в установке фильтра
function setButtonAge() {
  let submitButton = document.getElementById("applyFilter");
  let minYear = parseInt(document.getElementById("minYear").value);
  let maxYear = parseInt(document.getElementById("maxYear").value);
  if (!ageSubmitState.maxValState && !ageSubmitState.minValState) {
    if (minYear > maxYear && minYear != "" && maxYear != "") {
      alert(
        "min Year " + minYear + " should be lower than max year " + maxYear
      );
      submitButton.disabled = true;
    } else submitButton.disabled = false;
  } else submitButton.disabled = true;
}
// Переключение вью
function showHiddenDiv(divId) {
  hiddenDivs.forEach(item => {
    document.getElementById(item).classList.add("hidden");
    document.getElementById(item + "Button").classList.remove("selectedButton");
  });
  document.getElementById(divId).classList.remove("hidden");
  document.getElementById(divId + "Button").classList.add("selectedButton");
  currentDiv = divId;
}
// Удаление потомков внутри element
function removeChildren(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
}
// Фильтрация массива в заисимости от указанных готов
function filterByBirthYear() {
  const minValue = document.getElementById("minYear").value;
  const maxValue = document.getElementById("maxYear").value;
  filterApplyed = true;
  personsArrayWithFilter = personsArray.filter(function(person) {
    return checkMinMax(person.birthDate, minValue, maxValue);
  });
  showHiddenDiv("showPersons");
  sortPersonsWidthMode();
  document.getElementById("filterDiv").classList.remove("hidden");
  document.getElementById("filterText").textContent =
    "Birth Year from " + minValue + " to " + maxValue;
  showTable();
  document.getElementById("minYear").value = "";
  document.getElementById("maxYear").value = "";
  document.getElementById("applyFilter").disabled = true;
}
// отрисовка внутри адд персон
drawElements = () => {
  let testAge = 2021;
  let orderedList = document.getElementById("orderedList");
  removeChildren(orderedList);
  sortPersonsWidthMode();
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
  pushPersonToArray(currentPerson);
  idString.value = name.value = birthDate.value = "";
  submitState.idCheck = submitState.ageCheck = submitState.nameCheck = true;
  setButton();
  drawElements();
};
// Добавление персон в зависимотси от фильтра
function pushPersonToArray(person) {
  var index = -1;
  switch (sortMode) {
    case "id": {
      index = personsArray.findIndex(function(p) {
        return p.id >= person.id;
      });
      break;
    }
    case "birthDate": {
      index = personsArray.findIndex(function(p) {
        return p.birthDate >= person.birthDate;
      });
      break;
    }
    //unsorted + name
    default: {
      index = personsArray.findIndex(function(p) {
        return p.name >= person.name;
      });
      break;
    }
  }
  if (index == -1) {
    personsArray.push(person);
  } else {
    personsArray.splice(index, 0, person);
  }
}
// Сортировка массива
function sortPersonsWidthMode() {
  arrayToRender = filterApplyed ? personsArrayWithFilter : personsArray;
  arrayToRender.sort(function(p1, p2) {
    switch (sortMode) {
      case "id": {
        return p1.id - p2.id;
      }
      case "birthDate": {
        if (p1.birthDate === p2.birthDate) {
          return p1.id - p2.id;
        }
        return p1.birthDate - p2.birthDate;
      }
      default: {
        if (p1.name === p2.name) {
          return p1.id - p2.id;
        }
        return p1.name <= p2.name ? -1 : 1;
      }
    }
  });
}
// Генерация элементов массива
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
  personsArrayWithFilter = [];
  filterApplyed = false;
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
    pushPersonToArray(currentPerson);
  }
  document.getElementById("amountOfPersons").value = "";
  document.getElementById("generateButton").disabled = true;
  setButton();
  showTable();
  showHiddenDiv("showPersons");
}
// Отрисовка таблицы
function showTable() {
  arrayToRender = filterApplyed ? personsArrayWithFilter : personsArray;
  tablePersons.clear();
  arrayToRender.forEach(function(person) {
    tablePersons.addRow(person);
  });
}
