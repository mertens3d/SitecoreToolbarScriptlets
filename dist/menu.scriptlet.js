javascript:(function(){var SetScMode = "function SetScMode(newValue){ var newValueB = '=' + newValue; window.opener.location.href = window.opener.location.href.replace('=normal', newValueB).replace('=preview', newValueB).replace('=edit', newValueB);}function AdminB(ownerDoc){ ownerDoc.querySelector('#UserName').setAttribute('value','admin'); ownerDoc.querySelector('#Password').setAttribute('value','b'); ownerDoc.querySelector('#LogInBtn').click();}function Desktop(ownerWindow){ console.log('owner: ' + ownerWindow); var pat = new RegExp('.*' + ownerWindow.location.hostname ); console.log('pat: ' + pat); var match = ownerWindow.location.href.match(pat); console.log('match: ' + match); ownerWindow.location.href = match + '/sitecore/shell/default.aspx'; setTimeout(function(){ RedButton(ownerWindow, 10); },1500);}function RedButton(ownerWindow, iteration){ console.log(); var found = ownerWindow.document.getElementById('StartButton'); console.log('Red Button: ' + found + ' ' + ownerWindow.location.href + ' ' + iteration); if(found){ found.click(); ownerWindow.document.querySelector('.scStartMenuLeftOption').click(); }else{ if(iteration > 0){ setTimeout(function(){ RedButton(ownerWindow, iteration--); }, 1500); } }}";var MenuText = "function WireMenuButtons() { document.querySelector('#btnEdit').onclick = function () { SetScMode('edit'); }; document.querySelector('#btnPrev').onclick = function () { SetScMode('preview'); }; document.querySelector('#btnNorm').onclick = function () { SetScMode('normal'); }; document.querySelector('#btnAdminB').onclick = function () { AdminB(window.opener.document); }; document.querySelector('#btnDesktop').onclick = function () { Desktop(window.opener); };}";// function WriteDebug(value){
//     console.log(value);
//     mywindow.document.write(value);
// }

// open a new window
var mywindow = window.open("", "mywindow", "width=800, height=400");

// write some text in the new window
// mywindow.document.write("<p>this is 'mywindow'</p>");     
mywindow.document.write("<button id='btnEdit' type='button'>sc_mode=edit</button>");     
mywindow.document.write("<button id='btnPrev' type='button'>sc_mode=prev</button>");     
mywindow.document.write("<button id='btnNorm' type='button'>sc_mode=normal</button>");     
mywindow.document.write("<button id='btnAdminB' type='button'>Admin B</button>");     
mywindow.document.write("<button id='btnDesktop' type='button'>Desktop</button>");     

// write some text in the window that created the new window            
//mywindow.opener.document.write("<p>this is the source window!</p>");  
mywindow.document.write("<script>");
mywindow.document.write(SetScMode);    
mywindow.document.write(MenuText);    
mywindow.document.write("WireMenuButtons()");    
//console.log(commandSetEdit);
//mywindow.document.write(commandSetEdit);
//mywindow.document.write("var parent=" + mywindow.opener);
// var command = "function(){window.opener.location.href = 'https://www.google.com/';}";

// mywindow.opener.document.write("parent.document.write(console.log('click'));}");
mywindow.document.write("</script>");}());