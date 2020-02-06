import { PopUpManagerBase } from "./PopUpManagerBase";
import { IDataDebugSettings } from "../../../Shared/scripts/Interfaces/IDataDebugSettings";
import { IDataOneSettingPair } from "../../../Shared/scripts/Interfaces/IdataOneSetting";
import { IDataPopUpSettings } from "../../../Shared/scripts/Interfaces/IDataPopUpSettings";
import { IDataContentPrefs } from "../../../Shared/scripts/Interfaces/IDataContentPrefs";


export class PopUpAtticManager extends PopUpManagerBase {
  DefaultSettings: IDataPopUpSettings;

  Init() {
    this.DefaultSettings = this.GetDefaultSettings();
  }

  private async __drawSettings(): Promise<string[]> {
    var toReturn: string[] = [];
    var settings = await this.CurrentSettings();
    toReturn.push('----- Settings - Accordian ------')
    for (var idx = 0; idx < settings.Accordian.length; idx++) {
      toReturn.push(settings.Accordian[idx].ElemId + ':' + settings.Accordian[idx].isCollapsed.toString());
    }

    return toReturn;
  }
  GetDefaultSettings(): IDataPopUpSettings {
    this.debug().FuncStart(this.GetDefaultSettings.name);
    let defaultDebugSettings: IDataDebugSettings = {
      KeepDialogOpen: this.PopConst().Storage.Defaults.bool.DefaultDebugKeepDialogOpen,
      ShowDebugData: this.PopConst().Storage.Defaults.bool. DefaultShowDebugData,
    }

    let defaultContentPrefs: IDataContentPrefs = {
      MaxAutoSaveCount: this.PopConst().Numbers.MaxAutoSaveCount,
      AutoSave: true
    }

    let toReturn: IDataPopUpSettings = {
      DebugSettings: defaultDebugSettings,
      Accordian: [],
      ContentPrefs: defaultContentPrefs,
    };

    this.DebugSettings(toReturn);

    this.debug().FuncEnd(this.GetDefaultSettings.name);
    return toReturn;
  }

  DebugSettings(toReturn: IDataPopUpSettings): void {
    this.debug().FuncStart(this.DebugSettings.name);

    this.debug().LogVal('Settings', JSON.stringify(toReturn));

    this.debug().FuncEnd(this.DebugSettings.name);
  }

  ValidateSettings(popSettings: IDataPopUpSettings): IDataPopUpSettings {
    if (typeof popSettings === 'undefined' || !popSettings) {
      popSettings = this.DefaultSettings;
    }

    if (!popSettings.DebugSettings) {
      popSettings.DebugSettings = this.DefaultSettings.DebugSettings;
    }

    if (!popSettings.DebugSettings.KeepDialogOpen) {
      popSettings.DebugSettings.KeepDialogOpen = this.DefaultSettings.DebugSettings.KeepDialogOpen;
    }

    if (!popSettings.DebugSettings.ShowDebugData) {
      popSettings.DebugSettings.ShowDebugData = this.DefaultSettings.DebugSettings.ShowDebugData;
    }

    if (!popSettings.Accordian) {
      popSettings.Accordian = [];
    }

    if (!popSettings.ContentPrefs) {
      popSettings.ContentPrefs = this.DefaultSettings.ContentPrefs;
    }

    return popSettings;
  }

  async CurrentSettings(): Promise<IDataPopUpSettings> {
    this.debug().FuncStart(this.CurrentSettings.name);

    var toReturn: IDataPopUpSettings;

    await browser.storage.local.get().then((storageResults) => {
      //this.debug().LogVal('storageResults', JSON.stringify(storageResults));
      var noteKeys = Object.keys(storageResults);

      for (let noteKey of noteKeys) {
        var curValue = storageResults[noteKey];
        //this.debug().LogVal('noteKey', noteKey);
        //this.debug().LogVal('curValue', JSON.stringify(curValue));

        if (noteKey === 'settings') {
          //this.debug().Log('storage match found');
          toReturn = JSON.parse(curValue.toString());
        }
      }
    });

    this.debug().LogVal('toReturn', JSON.stringify(toReturn));

    toReturn = this.ValidateSettings(toReturn);

    this.debug().NotNullCheck('toReturn', toReturn);

    this.debug().FuncEnd(this.CurrentSettings.name);
    return toReturn;
  }

  async StoreSettings(currentSettings: IDataPopUpSettings) {
    this.debug().FuncStart(this.StoreSettings.name);

    //browser.storage.sync.set({
    //  currentSettings: JSON.stringify( currentSettings)
    //})

    await browser.storage.local.set({ settings: JSON.stringify(currentSettings) });

    this.debug().FuncEnd(this.StoreSettings.name);
  }

  async UpdateAccodianState(needleKey: string, isCollapsed: boolean) {
    this.debug().FuncStart(this.UpdateAccodianState.name, needleKey + ' ' + isCollapsed);
    var settings: IDataPopUpSettings = await this.CurrentSettings();

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
    await this.StoreSettings(settings);
    this.debug().FuncEnd(this.UpdateAccodianState.name);
  }
}