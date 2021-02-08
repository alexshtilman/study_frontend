document.getElementById("name").addEventListener("change", function(event) {
  event.target.value == ""
    ? (submitState.nameCheck = true)
    : (submitState.nameCheck = false);
  setButton();
});

document.getElementById("idString").addEventListener("change", function(event) {
  if (!checkMinMax(parseInt(event.target.value), 100, 999)) {
    alert("Id value should be in the range [100-999]");
    document.getElementById("idString").focus();
    submitState.idCheck = true;
  } else {
    if (getIndexFromPerson(personsArray, parseInt(event.target.value)) != -1) {
      alert("id isn’t unique");
      submitState.idCheck = true;
    } else submitState.idCheck = false;
  }
  setButton();
});

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

document
  .getElementById("birthDate")
  .addEventListener("change", function(event) {
    if (!checkMinMax(parseInt(event.target.value), 1920, 2020)) {
      alert("Id value should be in the range [1920-2020]");
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
document
  .getElementById("showPersonsButton")
  .addEventListener("click", function() {
    showHiddenDiv("showPersons");
  });
document
  .getElementById("addPersonButton")
  .addEventListener("click", function() {
    showHiddenDiv("addPerson");
  });
document
  .getElementById("generatePersonsButton")
  .addEventListener("click", function() {
    showHiddenDiv("generatePersons");
  });
document.getElementById("generateButton").addEventListener("click", function() {
  generatePersons();
});
