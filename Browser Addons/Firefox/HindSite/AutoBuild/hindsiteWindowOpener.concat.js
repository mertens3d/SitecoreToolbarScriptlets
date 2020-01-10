var constants = {
  taDebug: 'ta-debug'
};
var xyyz = xyyz || {};

xyyz.ChildWindow = {
  myWindow: null,

  WindowExists: function () {
    var toReturn = this.mywindow && this.mywindow !== 'undefined' && !this.mywindow.closed;

    return toReturn;
  },
  
  CreateWindow: function () {
    console.log('new window');
    window.mywindow = window.open('/hindsite/HtmlToInject.min.html', 'mywindow', 'width=900, height=900');
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
}
console.log('Menu Finished');

var xyyz = xyyz || {};

xyyz.ChildWindow = {
  myWindow: null,

  WindowExists: function () {
    var toReturn = this.mywindow && this.mywindow !== 'undefined' && !this.mywindow.closed;

    return toReturn;
  },

  WriteHtml: function (targetWindow) {
    targetWindow.document.innerHtml = '';

    console.log('s) WriteHtml');
    var fullMarkup = '<head>';
    fullMarkup += '<style>';
    console.log('Marker A');
    fullMarkup += StylesToInject;
    fullMarkup += '</style>';
    fullMarkup += '<body>';
    console.log('Marker B');
    fullMarkup += HtmlToInject;
    fullMarkup += '<script>';
    console.log('Marker C');
    fullMarkup += jsToInject;

    fullMarkup += '</script>';
    fullMarkup += '</body>';

    console.log('Marker D');
    

    targetWindow.document.write(fullMarkup);

    console.log('e) WriteHtml');
  },

  CreateWindow: function () {
    console.log('new window');
    console.log('Constants: ' + constants.taDebug);

    var newWindow = window.open('', 'mywindow', 'width=400, height=800');
    window.mywindow = newWindow;


    var documentId = new Date().getTime();

    this.WriteHtml(window.mywindow, documentId);

    //var foreSiteIdDivOrig = window.document.createElement('div');
    //foreSiteIdDivOrig.id = 'orig-win-id';
    //foreSiteIdDivOrig.innerText = documentId;
    //window.document.body.appendChild(foreSiteIdDivOrig);



    //var foreSiteIdDivChild = newWindow.document.createElement('div');
    //foreSiteIdDivChild.id = 'orig-win-id';
    //foreSiteIdDivChild.innerText = documentId;
    //newWindow.document.body.appendChild(foreSiteIdDivChild);


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
}
console.log('Menu Finished');