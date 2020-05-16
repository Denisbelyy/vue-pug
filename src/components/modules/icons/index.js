import axios from "axios";
import IconsSprite from "@/assets/icons.svg";

async function addIcons() {
  const icons = await axios.get(IconsSprite);
  const div = document.createElement("div");
  div.innerHTML = icons.data;
  div.setAttribute("style", "display: none!important");
  document.body.insertBefore(div, document.body.childNodes[0]);
}

try {
  addIcons();
} catch (e) {
  // console.log(e);
}
