import { PopUpManagerBase } from "./PopUpManagerBase";
import { PopConst } from "../Classes/PopConst";
import { IOneGenericSettingForStorage } from "../../../Shared/scripts/Classes/IOneGenericSettingForStorage";

export class PopUpAtticManager extends PopUpManagerBase {
  Init() {
    this.AllAgents.Logger.FuncStart(PopUpAtticManager.name, this.Init.name);
    this.AllAgents.Logger.FuncEnd(PopUpAtticManager.name, this.Init.name);
  }

  async ReadGenericSettings(): Promise<IOneGenericSettingForStorage[]> {
    this.AllAgents.Logger.FuncStart(this.ReadGenericSettings.name);
        this.AllAgents.Logger.MarkerD();
    let toReturn: IOneGenericSettingForStorage[] = [];
        this.AllAgents.Logger.MarkerB();

    try {
      await browser.storage.local.get().then((storageResults: browser.storage.StorageObject) => {
        console.log(storageResults);
        var storageKeys: string[] = Object.keys(storageResults);
        this.AllAgents.Logger.MarkerA();

        for (let oneKey of storageKeys) {
        this.AllAgents.Logger.MarkerB();
          if (oneKey === PopConst.Const.Storage.KeyGenericSettings) {
            let storedValue: browser.storage.StorageValue = storageResults[oneKey];
        this.AllAgents.Logger.MarkerC();
            if (storedValue) {
              toReturn = <IOneGenericSettingForStorage[]>JSON.parse(storedValue.toString());
            }
          }
        }
      });
    } catch (e) {
      this.AllAgents.Logger.Error(this.ReadGenericSettings.name, e.toString());
    }

    this.AllAgents.Logger.FuncEnd(this.ReadGenericSettings.name);
    return toReturn;
  }

  WriteGenericSettings(settingsToWrite: IOneGenericSettingForStorage[]): void {
    this.AllAgents.Logger.FuncStart(this.WriteGenericSettings.name);
    this.AllAgents.Logger.LogAsJsonPretty('settings', settingsToWrite);

    let storageObj: browser.storage.StorageObject = {
      [PopConst.Const.Storage.KeyGenericSettings]: JSON.stringify(settingsToWrite)
    }
    browser.storage.local.set(storageObj);
    this.AllAgents.Logger.FuncEnd(this.WriteGenericSettings.name);
  }
}