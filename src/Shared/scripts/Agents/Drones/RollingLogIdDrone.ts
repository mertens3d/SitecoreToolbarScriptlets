import { PopConst } from "../../../../PopUp/scripts/Classes/PopConst";

export class RollingLogIdDrone {
  async Init() {
    await this.GetLogId()
      .then((result) => this.CurrentStorageLogKey = result);
  }

   CurrentStorageLogKey: string = null;

  async GetLogId(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (!this.CurrentStorageLogKey) {
        console.log("building new prefix");

        await this.GetLastUsedLogId()
          .then((result: number) => {
            let nextKey = result + 1;
            if (nextKey > 10) {
              nextKey = 0;
            }
            this.CurrentStorageLogKey = PopConst.Const.Storage.StorageLogKeyPrefix + nextKey;
            console.log("Using " + this.CurrentStorageLogKey);
            let storageObj: browser.storage.StorageObject = {
              [PopConst.Const.Storage.StorageLastKeyKey]: nextKey
            }
            browser.storage.local.set(storageObj);
          })
          .catch((err) => { throw "WriteLogToStorage " + err });
      }
      resolve(this.CurrentStorageLogKey);
    })
  }

  private async GetLastUsedLogId(): Promise<number> {
    return new Promise(async (resolve) => {
      let toReturn: number = 0;
      console.log("getting last");

      await browser.storage.local.get()
        .then((storageResults: browser.storage.StorageObject) => {
          let storedValue: browser.storage.StorageValue = storageResults[PopConst.Const.Storage.StorageLastKeyKey];
          if (storedValue) {
            toReturn = parseInt(storedValue.toString());
          }
        })
        .then(() => resolve(toReturn))
        .catch((err) => { throw 'GetLastUsedLogId ' + err });
    });
  }
}