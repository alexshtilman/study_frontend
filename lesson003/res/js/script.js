function toggleImg(itemName){
    document.getElementById("target_text").innerHTML=document.getElementById(itemName+"_data").innerHTML;
    document.getElementById("target_img").src=document.getElementById(itemName+"_img").src;
}