import { PopUpManagerBase } from "./PopUpManagerBase";
import { PopConst } from "../Classes/PopConst";
import { IOneGenericSettingForStorage } from "../../../Shared/scripts/Classes/IOneGenericSettingForStorage";

export class PopUpAtticManager extends PopUpManagerBase {
  Init() {
    this.AllPopUpAgents.Logger.FuncStart(PopUpAtticManager.name, this.Init.name);
    this.AllPopUpAgents.Logger.FuncEnd(PopUpAtticManager.name, this.Init.name);
  }

  //private async __drawSettings(): Promise<string[]> {
  //  var toReturn: string[] = [];
  //  var settings = await this.CurrentSettings();
  //  toReturn.push('----- Settings - Accordian ------')
  //  for (var idx = 0; idx < settings.Accordian.length; idx++) {
  //    toReturn.push(settings.Accordian[idx].ElemId + ':' + settings.Accordian[idx].isCollapsed.toString());
  //  }

  //  return toReturn;
  //}

  async ReadGenericSettings(): Promise<IOneGenericSettingForStorage[]> {
    this.AllPopUpAgents.Logger.FuncStart(this.ReadGenericSettings.name);
    let toReturn: IOneGenericSettingForStorage[] = [];

    try {
      await browser.storage.local.get().then((storageResults: browser.storage.StorageObject) => {
        var storageKeys: string[] = Object.keys(storageResults);

        for (let oneKey of storageKeys) {
          if (oneKey === PopConst.Const.Storage.KeyGenericSettings) {
            let storedValue: browser.storage.StorageValue = storageResults[oneKey];
            if (storedValue) {
              toReturn = <IOneGenericSettingForStorage[]>JSON.parse(storedValue.toString());
            }
          }
        }
      });
    } catch (e) {
      this.AllPopUpAgents.Logger.Error(this.ReadGenericSettings.name, e.toString());
    }

    this.AllPopUpAgents.Logger.FuncEnd(this.ReadGenericSettings.name);
    return toReturn;
  }

  WriteGenericSettings(settingsToWrite: IOneGenericSettingForStorage[]): void {
    this.AllPopUpAgents.Logger.FuncStart(this.WriteGenericSettings.name);
    this.AllPopUpAgents.Logger.LogAsJsonPretty('settings', settingsToWrite);

    let storageObj: browser.storage.StorageObject = {
      [PopConst.Const.Storage.KeyGenericSettings]: JSON.stringify(settingsToWrite)
    }
    browser.storage.local.set(storageObj);
    this.AllPopUpAgents.Logger.FuncEnd(this.WriteGenericSettings.name);
  }

  //GetDefaultSettings(): IDataPopUpSettings {
  //  this.AllPopUpAgents.Logger.FuncStart(this.GetDefaultSettings.name);
  //  let defaultDebugSettings: IDataLogSettings = {
  //    KeepDialogOpen: this.Const().Storage.Defaults.bool.DefaultDebugKeepDialogOpen,
  //    ShowDebugData: this.Const().Storage.Defaults.bool.DefaultShowLogData,
  //  }

  //  let toReturn: IDataPopUpSettings = {
  //    LogSettings: defaultDebugSettings,
  //  };

  //  //this.DebugSettings(toReturn);

  //  this.AllPopUpAgents.Logger.FuncEnd(this.GetDefaultSettings.name);
  //  return toReturn;
  //}

  //ValidateSettings(popSettings: IDataPopUpSettings): IDataPopUpSettings {
  //  if (typeof popSettings === 'undefined' || !popSettings) {
  //    popSettings = this.DefaultSettings;
  //  }

  //  if (!popSettings.LogSettings) {
  //    popSettings.LogSettings = this.DefaultSettings.LogSettings;
  //  }

  //  if (!popSettings.LogSettings.KeepDialogOpen) {
  //    popSettings.LogSettings.KeepDialogOpen = this.DefaultSettings.LogSettings.KeepDialogOpen;
  //  }

  //  if (!popSettings.LogSettings.ShowDebugData) {
  //    popSettings.LogSettings.ShowDebugData = this.DefaultSettings.LogSettings.ShowDebugData;
  //  }

  //  if (!popSettings.ContentPrefs) {
  //    popSettings.ContentPrefs = this.DefaultSettings.ContentPrefs;
  //  }

  //  return popSettings;
  //}

  //async CurrentSettings(): Promise<IDataPopUpSettings> {
  //  this.AllPopUpAgents.Logger.FuncStart(this.CurrentSettings.name);

  //  var toReturn: IDataPopUpSettings;

  //  await browser.storage.local.get().then((storageResults) => {
  //    //this.debug().LogVal('storageResults', JSON.stringify(storageResults));
  //    var noteKeys = Object.keys(storageResults);

  //    for (let noteKey of noteKeys) {
  //      var curValue = storageResults[noteKey];
  //      //this.debug().LogVal('noteKey', noteKey);
  //      //this.debug().LogVal('curValue', JSON.stringify(curValue));

  //      if (noteKey === 'settings') {
  //        //this.debug().Log('storage match found');
  //        toReturn = JSON.parse(curValue.toString());
  //      }
  //    }
  //  });

  //  //this.debug().DebugIdataPopUpSettings(toReturn);

  //  toReturn = this.ValidateSettings(toReturn);

  //  this.AllPopUpAgents.Logger.NotNullCheck('toReturn', toReturn);

  //  this.AllPopUpAgents.Logger.FuncEnd(this.CurrentSettings.name);
  //  return toReturn;
  //}

  //async StoreSettings(currentSettings: IDataPopUpSettings) {
  //  this.AllPopUpAgents.Logger.FuncStart(this.StoreSettings.name);

  //  //browser.storage.sync.set({
  //  //  currentSettings: JSON.stringify( currentSettings)
  //  //})

  //  await browser.storage.local.set({ settings: JSON.stringify(currentSettings) });

  //  this.AllPopUpAgents.Logger.FuncEnd(this.StoreSettings.name);
  //}

  //async UpdateAccodianState(needleKey: string, isCollapsed: boolean) {
  //  this.AllPopUpAgents.Logger.FuncStart(this.UpdateAccodianState.name, needleKey + ' ' + isCollapsed);
  //  //var settings: IDataPopUpSettings = await this.CurrentSettings();

  //  var accordianPairs: IDataOneSettingPair[] = settings.Accordian;

  //  var found = null;
  //  for (var idx = 0; idx < accordianPairs.length; idx++) {
  //    var candidate = accordianPairs[idx];
  //    if (candidate.ElemId === needleKey) {
  //      found = true;
  //      candidate.isCollapsed = isCollapsed;
  //      break;
  //    }
  //  }

  //  if (!found) {
  //    var newSetting: IDataOneSettingPair = {
  //      ElemId: needleKey,
  //      isCollapsed: isCollapsed
  //    }

  //    accordianPairs.push(newSetting);
  //  }
  //  await this.StoreSettings(settings);
  //  this.AllPopUpAgents.Logger.FuncEnd(this.UpdateAccodianState.name);
  //}
}