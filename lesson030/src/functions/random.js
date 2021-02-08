import CONFIG from "../config.json";

function getRandomNumber(min, max) {
  return min + Math.round(Math.random() * (max - min));
}
function getRandomElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function getRandomName(randomGender) {
  return getRandomElement(
    randomGender === "Male" ? CONFIG.maleNameArray : CONFIG.femaleNameArray
  );
}
function getRandomEmail(randomId, randomName) {
  return (
    randomName.toLowerCase() + randomId + getRandomElement(CONFIG.domainArray)
  );
}
function getRandomGender() {
  const genderArray = ["Male", "Female"];
  return getRandomElement(genderArray);
}
function getRandomTitle() {
  return getRandomElement(CONFIG.titleOptions.slice(1));
}
function getRandomId(min, max) {
  return min + Math.round(Math.random() * (max - min));
}
function generateRandomEmployee(minSalary, maxSalary) {
  const randomId = getRandomId(
    10 ** (CONFIG.formValidationValues.id - 1),
    10 ** CONFIG.formValidationValues.id - 1
  );
  const randomGender = getRandomGender();
  const randomName = getRandomName(randomGender);
  const randomEmailAddress = getRandomEmail(randomId, randomName);
  let stars = [];
  let rate = parseInt(getRandomNumber(1, CONFIG.defaultMaxRate));
  for (let i = 0; i < rate; i++) stars[i] = 0;
  for (let i = rate; i < CONFIG.defaultMaxRate; i++) stars[i] = 1;

  const randomEmployee = {
    id: +randomId,
    name: randomName,
    emailAddress: randomEmailAddress,
    gender: randomGender,
    title: getRandomTitle(),
    salary: parseInt(getRandomNumber(+minSalary, +maxSalary)),
    rate,
    stars: stars.reverse(),
  };
  return randomEmployee;
}
export default generateRandomEmployee;
