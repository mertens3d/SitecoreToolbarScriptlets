import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { IOneGenericSettingForStorage } from "../../../Classes/IOneGenericSettingForStorage";
import { IRepositoryAgent } from "../../../Interfaces/Agents/IRepositoryAgent";
import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";

export class RepoAgent implements IRepositoryAgent {
  private Logger: ILoggerAgent; 

  constructor(loggerAgent: ILoggerAgent) {
    this.Logger = loggerAgent;
  }

  Init() {
    this.Logger.FuncStart(RepoAgent.name, this.Init.name);
    this.Logger.FuncEnd(RepoAgent.name, this.Init.name);
  }
  //async ReadStorageResults() {
  //  this.Logger.FuncStart(this.ReadStorageResults.name);
  //  try {
  //    await browser.storage.local.get()
  //      .then((storageResults: browser.storage.StorageObject) => {

         
  //      }
  //  } catch (e) {
  //    this.Logger.Error(this.ReadStorageResults.name, e.toString());
  //  }
  //  this.Logger.FuncEnd(this.ReadStorageResults.name);
  //}

  async ReadGenericSettings(): Promise<IOneGenericSettingForStorage[]> {
    this.Logger.FuncStart(this.ReadGenericSettings.name);
    this.Logger.MarkerD();
    let toReturn: IOneGenericSettingForStorage[] = [];
    this.Logger.MarkerB();

    try {
      await browser.storage.local.get()
        .then((storageResults: browser.storage.StorageObject) => {
          console.log(storageResults);
          var storageKeys: string[] = Object.keys(storageResults);
          this.Logger.MarkerA();

          for (let oneKey of storageKeys) {
            this.Logger.MarkerB();
            if (oneKey === PopConst.Const.Storage.KeyGenericSettings) {
              let storedValue: browser.storage.StorageValue = storageResults[oneKey];
              this.Logger.MarkerC();
              if (storedValue) {
                toReturn = <IOneGenericSettingForStorage[]>JSON.parse(storedValue.toString());
              }
            }
          }
        });
    } catch (e) {
      this.Logger.Error(this.ReadGenericSettings.name, e.toString());
    }

    this.Logger.FuncEnd(this.ReadGenericSettings.name);
    return toReturn;
  }

  WriteGenericSettings(settingsToWrite: IOneGenericSettingForStorage[]): void {
    this.Logger.FuncStart(this.WriteGenericSettings.name);
    this.Logger.LogAsJsonPretty('settings', settingsToWrite);

    let storageObj: browser.storage.StorageObject = {
      [PopConst.Const.Storage.KeyGenericSettings]: JSON.stringify(settingsToWrite)
    }
    browser.storage.local.set(storageObj);
    this.Logger.FuncEnd(this.WriteGenericSettings.name);
  }
}