// Считаем количество имён
function getNameCounts(names) {
  var result = {};
  names.forEach(function(name) {
    if (result[name]) {
      result[name]++;
    } else {
      result[name] = 1;
    }
  });
  return result;
}

function calculateStatistics() {
  let personsNames = personsArray.map(function(person) {
    return person.name;
  });
  let nameCount = getNameCounts(personsNames);

  var personNamesObject = Object.keys(nameCount);
  personsArrayStatistics = [];

  personsArrayStatistics = personNamesObject.map(function(currentPersonName) {
    return { name: currentPersonName, count: nameCount[currentPersonName] };
  });
  personsArrayStatistics.sort(function(p1, p2) {
    return p1.name <= p2.name ? -1 : 1;
  });

  statisticsPerson.clear();
  removeChildren(document.getElementById("statisticsListMax"));

  let maxStatisticsCount = personsArrayStatistics.reduce(function(
    maxCount,
    currentCount
  ) {
    return currentCount.count > maxCount ? currentCount.count : maxCount;
  },
  0);

  personsArrayStatistics.forEach(function(person) {
    statisticsPerson.addRow(person);
    if (person.count == maxStatisticsCount)
      addLiToOl(person, "statisticsListMax");
  });
  document.getElementById("errorMessage").textContent = " ";
}
