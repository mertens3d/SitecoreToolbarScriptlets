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
  PageDataMan: PageDataManager;
  Utilities: Utilities;

  MiscMan: MiscManager;
    AtticMan: AtticManager;
    UiMan: UiManager;

  constructor() {
    this.debug = new Debug(window.opener);
    this.debug.FuncStart(Hub.name);
    this.Start();
    this.debug.FuncEnd(Hub.name);
  }
  Start() {
    this.debug.FuncStart(this.Start.name);

    console.log('marker A');
    this.PageDataMan = new PageDataManager( this);
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
    this.AtticMan = new AtticManager(this);
    this.UiMan = new UiManager(this);

    this.init();
    this.debug.FuncEnd(this.Start.name);
  }
  init() {
    this.debug.FuncStart(Hub.constructor.name + ' ' + this.init.name);
    this.Const = InjectConst.const;
    this.EventMan.Init();
    this.PageDataMan.Init();
    this.OneWindowMan.Init();
    this.UiMan.RefreshUi();

    this.debug.FuncEnd(Hub.constructor.name + ' ' + this.init.name);
  }
}