/* eslint-disable space-before-function-paren */
/* eslint-disable quotes */
/* eslint-disable semi */

import Game from "./components/Game";

window.addEventListener("DOMContentLoaded", () => {
  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector);
  //   if (element) element.innerText = text;
  // };

  // for (const dependency of ["chrome", "node", "electron"]) {
  //   replaceText(`${dependency}-version`, process.versions[dependency]);
  // }
  let game = new Game("babylonCanvas");

  game.createScene();

  game.doRender();
});
