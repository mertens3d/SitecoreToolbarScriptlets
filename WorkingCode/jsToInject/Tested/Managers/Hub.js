var Hub = /** @class */ (function () {
    function Hub() {
        this.debug = new Debug(window.opener);
        this.debug.FuncStart(Hub.name);
        this.Start();
        this.debug.FuncEnd(Hub.name);
    }
    Hub.prototype.Start = function () {
        this.debug.FuncStart(this.Start.name);
        console.log('marker A');
        this.PageData = new PageData(window, this);
        console.log('marker B');
        this.EventMan = new EventManager(this);
        console.log('marker C');
        this.Utilities = new Utilities(this);
        console.log('marker D');
        //this.InjectConst = new InjectConst(this);
        console.log('marker E');
        this.LocationMan = new LocationManager(this);
        console.log('marker F');
        this.OneDesktopMan = new OneDesktopManager(this);
        console.log('marker G');
        this.OneTreeMan = new OneTreeManager(this);
        console.log('marker H');
        this.OneWindowMan = new OneWindowManager(this);
        console.log('marker I');
        this.OneCEMan = new OneCEManager(this);
        console.log('marker J');
        this.FeedbackMan = new FeedbackManager(this);
        this.GuidMan = new GuidManager(this);
        this.MiscMan = new MiscManager(this);
        this.init();
        this.debug.FuncEnd(this.Start.name);
    };
    Hub.prototype.init = function () {
        this.debug.FuncStart(Hub.constructor.name + ' ' + this.init.name);
        this.EventMan.WireMenuButtons();
        this.MiscMan.FillConst();
        this.debug.FuncEnd(Hub.constructor.name + ' ' + this.init.name);
    };
    return Hub;
}());
//# sourceMappingURL=Hub.js.map