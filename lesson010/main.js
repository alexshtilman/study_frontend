function resetInput(array) {
  array.forEach(element => {
    document.getElementById(element).value = "";
  });
}
var Persons = [];
var maxAge = 0;
var maxId;
var oldestPerson = "";
var today = new Date();
getMaxAge = () => {
  let oldestPersonElem = document.createElement("ol");
  oldestPersonElem.setAttribute("class", "orderedList");

  Persons.forEach(person => {
    if (maxAge == calculate_age(person.birthDate)) {
      let oldestPersonItem = document.createElement("li");
      oldestPersonItem.textContent =
        JSON.stringify(person) + ',{"age":"' + maxAge + '"}';
      oldestPersonElem.append(oldestPersonItem);
    }
  });
  let listO = document.getElementById("orderedListWithMaxAge");
  while (listO.firstChild) listO.removeChild(listO.firstChild);

  document.getElementById("orderedListWithMaxAge").append(oldestPersonElem);
};
calculate_age = dob => {
  let myDate = new Date(dob);
  let diff_ms = Date.now() - myDate.getTime();
  let age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
};
addPerson = () => {
  let inputs = ["idString", "name", "birthDate"];

  let currentPerson = {
    id: "",
    name: "",
    birthDate: "",
    setPerson(id, name, birthDate) {
      this.id = id;
      this.name = name;
      this.birthDate = birthDate;
    },
    getPerson() {
      return JSON.stringify(this);
    }
  };

  let idString = document.getElementById("idString").value;
  let name = document.getElementById("name").value;
  let birthDate = document.getElementById("birthDate").value;
  let orderedList = document.getElementById("orderedList");

  if (idString && name && birthDate) {
    currentPerson.setPerson(idString, name, birthDate);
    Persons.push(currentPerson);

    Persons.forEach(person => {
      let age = calculate_age(person.birthDate);
      if (age > maxAge) {
        maxAge = age;
      }
    });
    let liItem = document.createElement("div");
    liItem.textContent = currentPerson.getPerson();
    orderedList.append(liItem);
    resetInput(inputs);
  } else {
    document.getElementById("errorMessage").textContent =
      "All fields required!";
  }
};
