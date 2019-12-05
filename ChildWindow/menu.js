var xyyz = xyyz || {};

xyyz.ChildWindow = {
    myWindow: null,

    WindowExists: function () {

        var toReturn = this.mywindow && this.mywindow !== "undefined" && !this.mywindow.closed;

        return toReturn;
    },
    WriteHtml: function (targetWindow) {

        var fullMarkup = "<head>";
        fullMarkup += "<style>";
        fullMarkup += StyleInject;
        fullMarkup += "</style>";
        fullMarkup += "<body>";
        fullMarkup += HtmlToInject;
        fullMarkup += "<script>";
        fullMarkup += CodeToInject;
        fullMarkup += "</script>";
        fullMarkup += "</body>";

        targetWindow.document.innerHtml = "";

        console.log(fullMarkup);
        targetWindow.document.write(fullMarkup);
    },
    CreateWindow: function () {
        console.log('new window');
        console.log("Constants: " + constants.taDebug);
        window.mywindow = window.open("", "mywindow", "width=800, height=400");
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
}