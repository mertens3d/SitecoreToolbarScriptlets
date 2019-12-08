var Hub = /** @class */ (function () {
    function Hub() {
        this.debug = new Debug();
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
        this.InjectConst = new InjectConst(this);
        console.log('marker E');
        this.LocationMan = new LocationManager(this);
        console.log('marker F');
        this.ManyTreesMan = new ManyTrees(this);
        console.log('marker G');
        this.OneTreeMan = new OneTree(this);
        console.log('marker H');
        this.WindowTreeSnapShotMan = new WindowTreeSnapShotManager(this);
        console.log('marker I');
        this.init();
        this.debug.FuncEnd(this.Start.name);
    };
    Hub.prototype.init = function () {
        this.debug.FuncStart(Hub.constructor.name + ' ' + this.init.name);
        this.EventMan.WireMenuButtons();
        this.debug.FuncEnd(Hub.constructor.name + ' ' + this.init.name);
    };
    return Hub;
}());
//# sourceMappingURL=Hub.js.map