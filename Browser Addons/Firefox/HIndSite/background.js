function openMyPage() {
  console.log('kitty');
  document.body.style.border = "5px solid red";
  window.document.body.innerHTML = '<h1>cat</h1>';

}


//function test(){
//  console.log('teest');
//  window.open('https://google.com');

//}
////console.log('here');
////browser.browserAction.onClicked.addListener(() => console.log('here B'));
////browser.browserAction.onClicked.addListener(openMyPage);
////  //window.open('https://google.com');


browser.browserAction.onClicked.addListener(openMyPage);