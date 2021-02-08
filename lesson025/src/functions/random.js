function getRandomNumber(min, max) {
  return min + Math.round(Math.random() * (max - min));
}
function getRandomElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function getRandomName(randomGender) {
  const maleNameArray = ["Vasya", "Petya", "Kolya", "Sergey", "Yura", "Igor"];
  const femaleNameArray = ["Masha", "Dasha", "Lena", "Sveta", "Alina"];
  return getRandomElement(
    randomGender === "Male" ? maleNameArray : femaleNameArray
  );
}
function getRandomEmail(randomId, randomName) {
  const domainArray = [
    "@gmail.com",
    "@mail.ru",
    "@test.pro",
    "@tel-ran.co.il",
    "@gov.il",
    "@yahoo.com",
  ];
  return randomName.toLowerCase() + randomId + getRandomElement(domainArray);
}
function getRandomGender() {
  const genderArray = ["Male", "Female"];
  return getRandomElement(genderArray);
}
function getRandomTitle() {
  const wageArray = [
    "Developer",
    "Development Manager",
    "QA Tester",
    "QA Manager",
    "Sales Person",
    "Sales Manager",
  ];
  return getRandomElement(wageArray);
}
function getRandomId(min, max) {
  return min + Math.round(Math.random() * (max - min));
}
function generateRandomEmployee(minSalary, maxSalary) {
  const randomId = getRandomId(10000, 99999);
  const randomGender = getRandomGender();
  const randomName = getRandomName(randomGender);
  const randomEmailAddress = getRandomEmail(randomId, randomName);
  let stars = [0, 0, 0, 0, 0];
  let rate = parseInt(getRandomNumber(1, 5));
  for (let i = rate; i < 5; i++) stars[i] = 1;

  const randomEmployee = {
    id: parseInt(randomId),
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
