// function WriteDebug(value){
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
mywindow.document.write("</script>");