// Фильтрация массива в заисимости от указанного отрезка лет
function filterByBirthYear() {
  const minValue = document.getElementById("minYear").value;
  const maxValue = document.getElementById("maxYear").value;
  filterApplied = true;
  personsArrayWithFilter = personsArray.filter(function(person) {
    return checkMinMax(person.birthDate, minValue, maxValue);
  });
  showHiddenDiv("showPersons");
  sortPersonsWidthMode();
  document.getElementById("filterDiv").classList.remove("hidden");
  document.getElementById("filterText").textContent =
    "Birth Year from " + minValue + " to " + maxValue;
  showPersons();
  document.getElementById("minYear").value = "";
  document.getElementById("maxYear").value = "";
  document.getElementById("applyFilter").disabled = true;
}
