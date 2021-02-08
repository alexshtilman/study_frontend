// Проверка на минимум
function checkMinMax(value, minVal, maxVal) {
  return value > minVal && value < maxVal;
}
function getRandomNumber(min, max) {
  return min + Math.round(Math.random() * (max - min));
}
// Поиск элемента в массиве по id
getIndexFromPerson = (personsArray, personId) => {
  let index = personsArray.findIndex(function(b) {
    return b.id === personId;
  });
  return index;
};
