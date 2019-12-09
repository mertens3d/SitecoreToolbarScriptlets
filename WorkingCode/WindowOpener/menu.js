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
    console.log('marker a');
    fullMarkup += StylesToInject;
    console.log('marker b');
    fullMarkup += '</style>';
    fullMarkup += '<body>';
    fullMarkup += HtmlToInject;
    console.log('marker c');
    fullMarkup += '<script>';//console.log(\'before\')';
    console.log('marker d');
    fullMarkup += jsToInject;
    console.log('marker e');
    //fullMarkup += 'console.log(\'after\')
    console.log('marker f');
    fullMarkup +='</script>';
    fullMarkup += '</body>';

    
    targetWindow.document.innerHtml = '';

    //xyyz.WireMenuButtons(); // console.log(fullMarkup);
    targetWindow.document.write(fullMarkup);

    console.log('marker g');
    console.log(targetWindow);
    console.log(targetWindow.document);
    //console.log(targetWindow.xyyz);



    //targetWindow.document.xyyz.Hub.init();
    console.log('e) WriteHtml');
  },
  CreateWindow: function () {
    console.log('new window');
    console.log('Constants: ' + constants.taDebug);
    window.mywindow = window.open('', 'mywindow', 'width=900, height=700');
    window.mywindow.Parent = this;
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