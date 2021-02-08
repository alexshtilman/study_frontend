function setStatus(array, status, data) {
  array.forEach(element => {
    if (!document.getElementById(element).value) {
      document.getElementById(element).setAttribute("class", status);
    }
  });
  if (status != "default") document.getElementById("Result").textContent = data;
}
submitButtonPromise = action => {
  let check = false;
  let inputs = [];
  let output = "";
  switch (action) {
    case "substring": {
      let substring = document.getElementById("substring").value;
      const firstIndex = document.getElementById("firstIndex").value;
      const length = document.getElementById("length").value;
      inputs = ["substring", "firstIndex", "length"];
      check = substring && firstIndex && length;
      if (check)
        output = substring.substring(
          firstIndex,
          parseInt(firstIndex) + parseInt(length)
        );
      break;
    }
    case "index": {
      const indexString = document.getElementById("indexString").value;
      const firstIndex = document.getElementById("firstIndex").value;
      inputs = ["indexString", "firstIndex"];
      if (indexString && firstIndex) {
        check = true;
        output =
          indexString.indexOf(firstIndex) == "-1"
            ? "Substring not found!"
            : indexString.indexOf(firstIndex);
      }
      break;
    }
    case "delete": {
      let deleteString = document.getElementById("deleteString").value;
      const deleteSubstring = document.getElementById("deleteSubstring").value;
      inputs = ["deleteString", "deleteSubstring"];
      check = deleteString && deleteSubstring;
      if (check) {
        while ((index = deleteString.indexOf(deleteSubstring)) != -1) {
          deleteString = deleteString.replace(deleteSubstring, "");
        }
        output = deleteString;
      }
      break;
    }
  }

  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      document.getElementById("loader").classList.remove("hidden");
      if (check) {
        resolve(output);
      } else reject("All fields required!");
    }, 500);
  })
    .then(data => {
      setTimeout(() => {
        document.getElementById("loader").classList.add("responsePositive");
        setStatus(inputs, "success", data);
      }, 1000);
    })
    .catch(err => {
      setTimeout(() => {
        document.getElementById("loader").classList.add("responseNegative");
        setStatus(inputs, "danger", err);
      }, 1000);
    })
    .finally(() => {
      setTimeout(() => {
        document
          .getElementById("loader")
          .setAttribute("class", "loader hidden pending");
        setStatus(inputs, "default", "Result");
      }, 4000);
    });
};
