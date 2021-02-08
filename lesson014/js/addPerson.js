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
