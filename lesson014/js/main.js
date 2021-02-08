var personsArray = [];
var personsArrayWithFilter = [];
var personsArrayStatistics = [];

var maxAge = 2021;
var trHeadElement = document.getElementById("thPersons");
var tBodyElement = document.getElementById("tbodyPersons");

var thPersonsStatistics = document.getElementById("thPersonsStatistics");
var tbodyPersonsStatistics = document.getElementById("tbodyPersonsStatistics");
var yearValidationText = " should be in range [1920-2020]";
var filterApplied = false;
var sortMode = "unsorted";
var nameArray = [
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
var keys = ["id", "name", "birthDate"];
var statKeys = ["name", "count"];

var tablePersons = new Table(keys, trHeadElement, tBodyElement);
var statisticsPerson = new Table(
  statKeys,
  thPersonsStatistics,
  tbodyPersonsStatistics
);

// used for addPerson inputs check
var submitState = {
  idCheck: true,
  nameCheck: true,
  ageCheck: true
};
// use for age filter check
var ageSubmitState = {
  minValState: true,
  maxValState: true
};
// list of buttons
var hiddenDivs = [
  "showPersons",
  "addPerson",
  "generatePersons",
  "filterByAge",
  "nameStatistics"
];
var currentDiv = "";
/**
 * handle select on change redraw
 */
document
  .getElementById("sortBySelect")
  .addEventListener("change", function(event) {
    sortMode = event.target.value;
    document.getElementById("sortModeSpan").textContent =
      sortMode === "unsorted" ? "" : "sorted by " + sortMode;
    switch (currentDiv) {
      case "showPersons": {
        sortPersonsWidthMode();
        showPersons();
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
//////////////////////////////////////////
/*              events                  */
//////////////////////////////////////////

// checks if name is filled
document.getElementById("name").addEventListener("change", function(event) {
  event.target.value == ""
    ? (submitState.nameCheck = true)
    : (submitState.nameCheck = false);
  setButton();
});
// checks correct input of id
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
//
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
  if (!validateYear(event.target.value)) {
    alert("min year " + yearValidationText);
    document.getElementById("minYear").focus();
    ageSubmitState.minValState = true;
  } else {
    ageSubmitState.minValState = false;
  }
  setButtonAge();
});

document.getElementById("maxYear").addEventListener("change", function(event) {
  if (!validateYear(event.target.value)) {
    alert("max year " + yearValidationText);
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
    if (!validateYear(event.target.value)) {
      alert(" birth date" + yearValidationText);
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
// draw persons button
document
  .getElementById("showPersonsButton")
  .addEventListener("click", function() {
    showHiddenDiv("showPersons");
    isSortNeeded();
    showPersons();
  });
// draw add persons button
document
  .getElementById("addPersonButton")
  .addEventListener("click", function() {
    showHiddenDiv("addPerson");
    isSortNeeded();
    drawElements();
  });
// calculate statistics
document
  .getElementById("nameStatisticsButton")
  .addEventListener("click", function() {
    showHiddenDiv("nameStatistics");
    calculateStatistics();
  });
document
  .getElementById("generatePersonsButton")
  .addEventListener("click", function() {
    document.getElementById("errorMessage").textContent = "";
    showHiddenDiv("generatePersons");
  });
document
  .getElementById("filterByAgeButton")
  .addEventListener("click", function() {
    document.getElementById("errorMessage").textContent = "";
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
  filterApplied = false;
  showHiddenDiv("showPersons");
  sortPersonsWidthMode();
  document.getElementById("filterDiv").classList.add("hidden");
  showPersons();
});
//////////////////////////////////////////
/*              functions               */
//////////////////////////////////////////
function isSortNeeded() {
  document.getElementById("errorMessage").classList.remove("blink_me");
  document.getElementById("sortBySelect").value === sortMode
    ? (document.getElementById("errorMessage").textContent =
        " no need to sort ")
    : sortPersonsWidthMode();
}
function validateYear(year) {
  return checkMinMax(parseInt(year), 1920, 2020);
}
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
  removeChildren(orderedListWithMaxAge);
  personsArray.forEach(person => {
    if (maxAge === person.birthDate) addLiToOl(person, "orderedListWithMaxAge");
  });
};

// Добавить лист айтем в указанный ол
function addLiToOl(item, basicElement) {
  let newLi = document.createElement("li");
  newLi.textContent = JSON.stringify(item);
  document.getElementById(basicElement).append(newLi);
}
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

// отрисовка внутри адд персон
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
  arrayToRender = filterApplied ? personsArrayWithFilter : personsArray;
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
  document.getElementById("errorMessage").textContent =
    " sort " + sortMode + " applied!";
  document.getElementById("errorMessage").classList.add("blink_me");
}
// Отрисовка таблицы
function showPersons() {
  arrayToRender = filterApplied ? personsArrayWithFilter : personsArray;
  tablePersons.clear();
  arrayToRender.forEach(function(person) {
    tablePersons.addRow(person);
  });
}
