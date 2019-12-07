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
    fullMarkup += '<script>';
    fullMarkup += jsToInject;
    fullMarkup += '</script>';
    fullMarkup += '</body>';

    targetWindow.document.innerHtml = '';

    //xyyz.WireMenuButtons(); // console.log(fullMarkup);
    targetWindow.document.write(fullMarkup);
    console.log('e) WriteHtml');
  },
  CreateWindow: function () {
    console.log('new window');
    console.log('Constants: ' + constants.taDebug);
    window.mywindow = window.open('', 'mywindow', 'width=900, height=600');
    this.WriteHtml(window.mywindow);
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
  // window.mywindow.WireMenuButtons();
  // window.mywindow.document.WireMenuButtons();
}
console.log('Menu Finished');
console.log(jsToInject);