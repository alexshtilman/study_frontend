function getRandomNumber(min, max) {
  return min + Math.round(Math.random() * (max - min));
}
function getRandomElement(array) {
  return array[getRandomNumber(0, array.length - 1)];
}
function getRandomName(randomGender) {
  const maleNameArray = ["Vasya", "Petya", "Kolya", "Sergey", "Yura", "Igor"];
  const femaleNameArray = ["Masha", "Dasha", "Lena", "Sveta", "Sasha"];
  return getRandomElement(
    randomGender === "male" ? maleNameArray : femaleNameArray
  );
}
function getRandomEmail(randomId, randomName) {
  const domainArray = [
    "@gmail.com",
    "@mail.ru",
    "@test.pro",
    "@tel-ran.co.il",
    "@gov.il",
    "@yahoo.com"
  ];
  return randomName.toLowerCase() + randomId + getRandomElement(domainArray);
}
function getRandomGender() {
  const genderArray = ["male", "female"];
  return getRandomElement(genderArray);
}
function getRandomTitle() {
  const wageArray = ["WageEmployee", "Manager", "SalesPerson", "SalesManager"];
  return getRandomElement(wageArray);
}
function generateRandomEmployee(
  minSalary,
  maxSalary,
  minIdLength,
  maxIdLength,
  employees
) {
  let randomId = "";
  while (true) {
    randomId = getRandomNumber(+minIdLength, +maxIdLength);
    if (!employees[randomId]) break;
  }
  let randomGender = getRandomGender();
  let randomName = getRandomName(randomGender);
  let randomEmailAddress = getRandomEmail(randomId, randomName);
  let randomEmployee = {
    id: randomId,
    name: randomName,
    emailAddress: randomEmailAddress,
    gender: randomGender,
    title: getRandomTitle(),
    salary: getRandomNumber(+minSalary, +maxSalary)
  };
  return randomEmployee;
}
