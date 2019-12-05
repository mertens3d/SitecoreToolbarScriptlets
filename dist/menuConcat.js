var constants = {
    taDebug : 'ta-debug',
}

// function WriteDebug(value){
//     console.log(value);
//     mywindow.document.write(value);
// }

// open a new window



function WriteHtml(targetWindow) {

    targetWindow.document.innerHtml = "";

    targetWindow.document.write(HtmlToInject);
    console.log(HtmlToInject);
    targetWindow.document.write("<script>");
    targetWindow.document.write(CodeToInject);
    // targetWindow.document.write(MenuText);
    targetWindow.document.write("WireMenuButtons()");
    //console.log(commandSetEdit);
    //mywindow.document.write(commandSetEdit);
    //mywindow.document.write("var parent=" + mywindow.opener);
    // var command = "function(){window.opener.location.href = 'https://www.google.com/';}";

    // mywindow.opener.document.write("parent.document.write(console.log('click'));}");
    targetWindow.document.write("</script>");
}


if (!window.mywindow || window.mywindow === "undefined" || window.mywindow.closed) {
    console.log('new window');
    console.log("Constants: " + constants.taDebug );
    window.mywindow = window.open("", "mywindow", "width=800, height=400");
    window.mywindow.document.innerHtml = '';
    WriteHtml(window.mywindow);
} else {
    console.log('existing window');
    window.mywindow.focus();
}

