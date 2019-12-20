class Hub {
  AtticMan: AtticManager;
  Const: IConst;
  debug: Debug;
  EventMan: EventManager;
  FeedbackMan: FeedbackManager;
  GuidMan: GuidManager;
  LocationMan: LocationManager;
  MiscMan: MiscManager;
  OneCEMan: OneCEManager;
  OneDesktopMan: OneDesktopManager;
  OneTreeMan: OneTreeManager;
  OneWindowMan: OneWindowManager;
  PageDataMan: PageDataManager;
  PromiseGeneric: PromiseGeneric;
  SitecoreUiMan: SitecoreUiManager;
  UiMan: UiManager;
  Utilities: Utilities;

  constructor() {
    this.debug = new Debug(window.opener);
    this.debug.FuncStart(Hub.name);
    this.Start();
    this.debug.FuncEnd(Hub.name);
  }
  Start() {
    this.debug.FuncStart(this.Start.name);

    this.AtticMan = new AtticManager(this);
    this.EventMan = new EventManager(this);
    this.FeedbackMan = new FeedbackManager(this);
    this.GuidMan = new GuidManager(this);
    this.LocationMan = new LocationManager(this);
    this.MiscMan = new MiscManager(this);
    this.OneCEMan = new OneCEManager(this);
    this.OneDesktopMan = new OneDesktopManager(this);
    this.OneTreeMan = new OneTreeManager(this);
    this.OneWindowMan = new OneWindowManager(this);
    this.PageDataMan = new PageDataManager(this);
    this.PromiseGeneric = new PromiseGeneric(this);
    this.SitecoreUiMan = new SitecoreUiManager(this);
    this.UiMan = new UiManager(this);
    this.Utilities = new Utilities(this);

    this.init();
    this.debug.FuncEnd(this.Start.name);
  }
  init() {
    this.debug.FuncStart(Hub.constructor.name + ' ' + this.init.name);
    this.Const = InjectConst.const;

    this.AtticMan.Init();
    this.debug.Enabled = this.AtticMan.Settings().DebugSettings.ShowDebugData;

    this.EventMan.Init();
    this.PageDataMan.Init();
    this.OneWindowMan.Init();
    this.UiMan.RefreshUi();

    this.debug.FuncEnd(Hub.constructor.name + ' ' + this.init.name);
  }
}