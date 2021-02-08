function resetClass(item) {
  item.classList.add("thumbnails_item");
  item.classList.remove("active");
}
function toggleImg(itemName) {
  var x = document.getElementsByName("thumbnails_item");
  x.forEach(resetClass);
  document
    .getElementById(itemName)
    .setAttribute("class", "thumbnails_item active");
  let detailed = document.getElementById("detailed");
  detailed.style.display = "none";

  document.getElementById(itemName + "_text").classList.add("blink_me");
  document.getElementById("target_text").innerHTML = document.getElementById(
    itemName + "_data"
  ).innerHTML;
  document.getElementById("target_img").src = document.getElementById(
    itemName + "_img"
  ).src;

  detailedMenuNav = document.getElementById("detailedMenuNav");
  detailedMenuNav.innerHTML = "";

  const buttonNext = document.createElement("button");
  buttonNext.classList.add("buttonStyle");
  buttonNext.textContent = ">";
  const buttonPrev = document.createElement("button");
  buttonPrev.classList.add("buttonStyle");
  buttonPrev.textContent = "<";

  try {
    let prevSib = document
      .getElementById(itemName + "_li")
      .previousSibling.id.split("_")[0];
    detailedMenuNav.append(buttonPrev);
    buttonPrev.addEventListener("click", function(event) {
      event.preventDefault();
      toggleImg(prevSib);
    });
  } catch {
    detailedMenuNav.append(buttonPrev);
    buttonPrev.setAttribute("class", "buttonStyleDisabled");
  }
  try {
    let nextSib = document
      .getElementById(itemName + "_li")
      .nextSibling.id.split("_")[0];

    detailedMenuNav.append(buttonNext);
    buttonNext.addEventListener("click", function(event) {
      event.preventDefault();
      toggleImg(nextSib);
    });
  } catch {
    detailedMenuNav.append(buttonNext);
    buttonNext.setAttribute("class", "buttonStyleDisabled");
  }
  setTimeout(function() {
    document.getElementById(itemName + "_text").classList.remove("blink_me");
  }, 2000);
  $("#detailed").show("slow");
}
function createMenuItem(item) {
  const liItem = document.createElement("li");
  liItem.setAttribute("id", item.name + "_li");

  const liItemDiv = document.createElement("div");
  liItemDiv.classList.add("thumbnails_item");
  liItemDiv.setAttribute("name", "thumbnails_item");
  liItemDiv.setAttribute("id", item.name);
  liItemDiv.addEventListener("click", function(event) {
    event.preventDefault();
    toggleImg(item.name);
  });

  const thumbTextDiv = document.createElement("div");
  thumbTextDiv.classList.add("thumb_text");
  thumbTextDiv.setAttribute("id", item.name + "_text");
  thumbTextDiv.innerText = item.name;

  const thumbImgDiv = document.createElement("div");
  thumbImgDiv.classList.add("thumb_img");

  const imgItem = document.createElement("img");
  imgItem.classList.add("thumbnails_image");
  imgItem.setAttribute("id", item.name + "_img");
  imgItem.setAttribute("src", "res/img/" + item.name + ".png");

  const hiddenItem = document.createElement("span");
  hiddenItem.classList.add("hiddenItem");
  hiddenItem.setAttribute("id", item.name + "_data");
  hiddenItem.innerHTML = item.description;

  document.getElementById("thumbnails_list").append(liItem);
  liItem.append(liItemDiv);
  liItemDiv.append(thumbTextDiv);
  liItemDiv.append(imgItem);
  liItemDiv.append(hiddenItem);
}
