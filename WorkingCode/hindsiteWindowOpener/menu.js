var xyyz = xyyz || {};

xyyz.ChildWindow = {
  myWindow: null,

  WindowExists: function () {
    var toReturn = this.mywindow && this.mywindow !== 'undefined' && !this.mywindow.closed;

    return toReturn;
  },
  WriteHtml: function (targetWindow) {
    console.log('s) WriteHtml');
    var fullMarkup = '<head>';
    fullMarkup += '<style>';
    fullMarkup += StylesToInject;
    fullMarkup += '</style>';
    fullMarkup += '<body>';
    fullMarkup += HtmlToInject;
    fullMarkup += '<script>';
    fullMarkup += jsToInject;
    fullMarkup +='</script>';
    fullMarkup += '</body>';

    // the firefox addon does not like writing to document
    
    targetWindow.document.innerHtml = '';

    //xyyz.WireMenuButtons(); // console.log(fullMarkup);
    targetWindow.document.write(fullMarkup);


    console.log(targetWindow);
    console.log(targetWindow.document);



    //targetWindow.document.xyyz.Hub.init();
    console.log('e) WriteHtml');
  },
  CreateWindow: function () {
    console.log('new window');
    console.log('Constants: ' + constants.taDebug);

    //'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350')
    window.mywindow = window.open('', 'mywindow', 'width=900, height=900');// options don't workin ff, titlebar=no, toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=no');
    //window.mywindow.Parent = this;
    this.WriteHtml(window.mywindow);
   //window.mywindow.WireMenuButtons();
  },
  FocusWindow: function () {
    console.log('existing window');
    window.mywindow.focus();
  }
};

if (xyyz.ChildWindow.WindowExists()) {
  xyyz.ChildWindow.FocusWindow();
} else {
  xyyz.ChildWindow.CreateWindow();
  // window.mywindow.document.WireMenuButtons();
}
console.log('Menu Finished');
//window.mywindow.document.xyyz.Hub.init();
//console.log(jsToInject);