import { PopUpManagerBase } from "./PopUpManagerBase";
import { IDataSettings } from "../Interfaces/IDataSettings";
import { IDataMenuWindowPrefs } from "../Interfaces/IDataMenuWindowPrefs";
import { IDataOneWindowStorage } from "../../../JsShared/Interfaces/IDataOneWindowStorage";
import { IDataDebugSettings } from "../../../JsShared/Interfaces/IDataDebugSettings";
import { IDataOneSettingPair } from "../../../jsContent/Interfaces/IdataOneSetting";

export class PopUpAtticManager extends PopUpManagerBase {

  Init() {
    var prefs: IDataMenuWindowPrefs = this.CurrentSettings().MenuPrefs;

    if (prefs.MenuX && prefs.MenuY) {
      var currentX = window.screenLeft;
      var currentY = window.screenTop;
      var deltaX = Math.abs(prefs.MenuX - currentX);
      var deltaY = Math.abs(prefs.MenuY - currentY);

      window.moveTo(Math.abs(prefs.MenuX), Math.abs(prefs.MenuY));
    }
    if (prefs.MenuWidth && prefs.MenuHeight) {
      if (prefs.MenuHeight < this.PopConst().Numbers.MinMenuHeight) {
        prefs.MenuHeight = this.PopConst().Numbers.MinMenuHeight;
      }

      if (prefs.MenuWidth < this.PopConst().Numbers.MinMenuWidth) {
        prefs.MenuWidth = this.PopConst().Numbers.MinMenuWidth;
      }
      window.resizeTo(Math.abs(prefs.MenuWidth), Math.abs(prefs.MenuHeight));
    }
  }


  UpdateMenuCoords(menuData: IDataMenuWindowPrefs) {
    var settings: IDataSettings = this.CurrentSettings();
    settings.MenuPrefs = menuData;
    this.StoreSettings(settings);
  }
  
  private __drawSettings(): string[] {
    var toReturn: string[] = [];
    var settings = this.CurrentSettings();
    toReturn.push('----- Settings - Accordian ------')
    for (var idx = 0; idx < settings.Accordian.length; idx++) {
      toReturn.push(settings.Accordian[idx].ElemId + ':' + settings.Accordian[idx].isCollapsed.toString());
    }

    return toReturn;
  }
  GetDefaultSettings(): IDataSettings {
    let defaultDebugSettings: IDataDebugSettings = {
      KeepDialogOpen: this.PopConst().Storage.DefaultDebugKeepDialogOpen,
      ShowDebugData: this.PopConst().Storage.DefaultShowDebugData,
    }

    let defaultMenuPrefs: IDataMenuWindowPrefs = {
      MenuHeight: null,
      MenuWidth: null,
      MenuX: null,
      MenuY: null
    }

    let toReturn: IDataSettings = {
      DebugSettings: defaultDebugSettings,
      Accordian: [],
      MenuPrefs: defaultMenuPrefs
    };

    return toReturn;
  }
  CurrentSettings(): IDataSettings {
    //this.debug().FuncStart(this.CurrentSettings.name);
    var defaultSettings = this.GetDefaultSettings();
    var toReturn: IDataSettings;

    var settingsRaw = window.localStorage.getItem(this.PopConst().Storage.WindowRoot + this.PopConst().Storage.SettingsSuffix);
    //this.debug().LogVal('settingsRaw', settingsRaw);

    if (settingsRaw) {
      toReturn = <IDataSettings>JSON.parse(settingsRaw);
    }

    if (!toReturn) {
      toReturn = defaultSettings;
    }
    this.debug().NotNullCheck('toReturn', toReturn);

    if (!toReturn.DebugSettings) {
      toReturn.DebugSettings = defaultSettings.DebugSettings;
    }

    if (!toReturn.DebugSettings.KeepDialogOpen) {
      toReturn.DebugSettings.KeepDialogOpen = defaultSettings.DebugSettings.KeepDialogOpen;
    }

    if (!toReturn.DebugSettings.ShowDebugData) {
      toReturn.DebugSettings.ShowDebugData = defaultSettings.DebugSettings.ShowDebugData;
    }

    if (!toReturn.Accordian) {
      toReturn.Accordian = [];
    }

    if (!toReturn.MenuPrefs) {
      toReturn.MenuPrefs = defaultSettings.MenuPrefs;
    }

    //this.DebugSettings(toReturn);

    //this.debug().FuncEnd(this.CurrentSettings.name);
    return toReturn;
  }

  StoreSettings(currentSettings: IDataSettings) {
    //this.debug().FuncStart(this.StoreSettings.name);
    window.localStorage.setItem(this.PopConst().Storage.WindowRoot + this.PopConst().Storage.SettingsSuffix, JSON.stringify(currentSettings));
    //this.debug().FuncEnd(this.StoreSettings.name);
  }

  UpdateAccodianState(needleKey: string, isCollapsed: boolean) {
    this.debug().FuncStart(this.UpdateAccodianState.name, needleKey + ' ' + isCollapsed);
    var settings: IDataSettings = this.CurrentSettings();

    var accordianPairs: IDataOneSettingPair[] = settings.Accordian;

    var found = null;
    for (var idx = 0; idx < accordianPairs.length; idx++) {
      var candidate = accordianPairs[idx];
      if (candidate.ElemId === needleKey) {
        found = true;
        candidate.isCollapsed = isCollapsed;
        break;
      }
    }

    if (!found) {
      var newSetting: IDataOneSettingPair = {
        ElemId: needleKey,
        isCollapsed: isCollapsed
      }

      accordianPairs.push(newSetting);
    }
    this.StoreSettings(settings);
    this.debug().FuncStart(this.UpdateAccodianState.name);
  }
}