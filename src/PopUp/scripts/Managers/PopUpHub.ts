import { UiManager } from "./UiManager";
import { LoggerPopUp } from "../Classes/LoggerPopUp";
import { EventManager } from "./EventManager";
import { PopUpMessagesManager } from "./PopUpMessagesManager";
import { PopUpAtticManager } from "./PopUpAtticManager";
import { FeedbackManager } from "./FeedbackManager";
import { PopConst } from "../Classes/PopConst";
import { IPopUpConst } from "../../../Shared/scripts/Interfaces/IPopUpConst";
import { SettingsManager } from "./SettingsManager";
import { TabManager } from "./TabManager";
import { LocationManager } from "./LocationManager";
import { HelperHub } from "../../../Shared/scripts/Helpers/Helpers";
import { BrowserManager } from "./BrowserManager";
import { OneGenericSetting } from "../../../Shared/scripts/Classes/OneGenericSetting";
import { SettingKey } from "../../../Shared/scripts/Enums/SettingKey";
import { SharedConst } from "../../../Shared/scripts/SharedConst";
import { SettingsHelper } from "../../../Shared/scripts/Helpers/SettingsHelper";
//import { PopUpFactoryManager } from "./FactoryManager";

export class PopUpHub {
    [x: string]: any;
  Log: LoggerPopUp;

  EventMan: EventManager;
  FeedbackMan: FeedbackManager;
  PopMsgMan: PopUpMessagesManager;
  PopUpAtticMan: PopUpAtticManager;
  UiMan: UiManager;
  TabMan: TabManager;
  LocMan: LocationManager;
  //FactMan: PopUpFactoryManager;

  //PopUpConst: IPopUpConst;

  Helpers: HelperHub;
  BrowserMan: BrowserManager;
  SettingsMan: SettingsManager;

  constructor() {
    this.Log = new LoggerPopUp();
    this.SettingsMan = new SettingsManager(this);

    this.PopUpAtticMan = new PopUpAtticManager(this);
    this.PopMsgMan = new PopUpMessagesManager(this);
    this.UiMan = new UiManager(this);
    this.EventMan = new EventManager(this);
    this.Helpers = new HelperHub(this.Log);
    this.LocMan = new LocationManager(this);
    //this.PopUpConst = PopConst.Const;

    this.FeedbackMan = new FeedbackManager(this);
    this.TabMan = new TabManager(this);
    this.BrowserMan = new BrowserManager(this);

    this.init();
  }

  async init() {
    this.Log.FuncStart(PopUpHub.name, this.init.name);

    await this.PopUpAtticMan.Init(); //before PopMsgMan
    await this.SettingsMan.Init();//after attic (?)



    let setting: OneGenericSetting = await this.SettingsMan.GetByKey(SettingKey.LogToConsole);
    if (setting) {
      this.Log.Init(SettingsHelper.ValueAsBool(setting))
    } else {
      this.Log.Init(SharedConst.Const.Settings.Defaults.LogToConsole);
    }




    await this.TabMan.Init();
    

    this.Log.DebugIDataBrowserTab(this.TabMan.CurrentTabData);
    this.EventMan.Init();
    this.Log.DebugIDataBrowserTab(this.TabMan.CurrentTabData);
    this.Log.DebugIDataBrowserTab(this.TabMan.CurrentTabData);

    this.PopMsgMan.Init(); // before uiman.Init

    this.UiMan.Init();

    //this.PageMan.Init();

    this.Log.FuncEnd(PopUpHub.name, this.init.name);

    this.Log.Log('');
    this.Log.Log('');
  }
}