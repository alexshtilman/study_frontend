function toggleImg(itemName) {
  var x = document.getElementsByName("thumbnails_item");
  for (let i = 0; i < x.length; i++)
    x[i].setAttribute("class", "thumbnails_item");
  document
    .getElementById(itemName)
    .setAttribute("class", "thumbnails_item active");

  document.getElementById("target_text").innerHTML = document.getElementById(
    itemName + "_data"
  ).innerHTML;
  document.getElementById("target_img").src = document.getElementById(
    itemName + "_img"
  ).src;
}
