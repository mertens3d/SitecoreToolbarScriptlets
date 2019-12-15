function test(){
  console.log('teest');
  window.open('https://google.com');

}
console.log('here');
browser.browserAction.onClicked.addListener(() => console.log('here B'));
browser.browserAction.onClicked.addListener(openMyPage);
  //window.open('https://google.com');