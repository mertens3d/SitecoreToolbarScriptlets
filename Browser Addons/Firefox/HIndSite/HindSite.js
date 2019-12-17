function openMyPage() {
  document.body.style.border = '10px solid green';

  var buttonElem = document.createElement('button');
  buttonElem.innerHTML = 'cat';
  buttonElem.style.cssText = "color: blue; border: 1px solid black; position: absolute; top: 50px; left: 50px; z-index: 999";
  
  document.body.appendChild(buttonElem);

  document.onkeyup = function (e) {
    if (e.which == 77) {
      alert("M key was pressed");
    }
    //} else if (e.ctrlKey && e.which == 66) {
    //  alert("Ctrl + B shortcut combination was pressed");
    //} else if (e.ctrlKey && e.altKey && e.which == 89) {
    //  alert("Ctrl + Alt + Y shortcut combination was pressed");
    //} else if (e.ctrlKey && e.altKey && e.shiftKey && e.which == 85) {
    //  alert("Ctrl + Alt + Shift + U shortcut combination was pressed");
    //}
  };

}

console.log('here DD - this gets loaded with each page');
openMyPage();


browser.browserAction.onClicked.addListener(() => {
  openMyPage();
});