class Hub {
  debug: Debug;
  EventMan: EventManager;
  FeedbackMan: FeedbackManager;
  GuidMan: GuidManager;
  Const:  IConst;
  LocationMan: LocationManager;
  OneCEMan: OneCEManager;
  OneDesktopMan: OneDesktopManager;
  OneTreeMan: OneTreeManager;
  OneWindowMan: OneWindowManager;
  PageData: PageData;
  Utilities: Utilities;

  MiscMan: MiscManager;

  constructor() {
    this.debug = new Debug(window.opener);
    this.debug.FuncStartName(Hub.name);
    this.Start();
    this.debug.FuncEndName(Hub.name);
  }
  Start() {
    this.debug.FuncStartName(this.Start.name);

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
    this.debug.FuncEndName(this.Start.name);
  }
  init() {
    this.debug.FuncStartName(Hub.constructor.name + ' ' + this.init.name);
    this.Const = InjectConst.const;
    this.EventMan.WireMenuButtons();
    this.OneWindowMan.CreateNewWindowSnapShot();
    this.OneWindowMan.PopulateStateSel();

    this.debug.FuncEndName(Hub.constructor.name + ' ' + this.init.name);
  }
}