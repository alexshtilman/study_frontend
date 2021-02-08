function getRandomNumber(min, max) {
  return min + Math.round(Math.random() * (max - min));
}
function getRandomElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}
