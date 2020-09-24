import { ILoggerWriter } from "../../../Interfaces/Agents/ILoggerWriter";

export class LoggerStorageWriter implements ILoggerWriter {
  FriendlyName: string = LoggerStorageWriter.name;
  private CurrentStorageLogKey: string = '0';
  private LogToStoragePrefix: string = 'Hindsite.Log.';

  WriteText(text: string) {
  }

  SetLogToStorageKey(logToStorageIndex: string) {
    //console.log(this.SetLogToStorageKey.name + ' ' + currentStorageLogKey);
    this.CurrentStorageLogKey = this.LogToStoragePrefix + logToStorageIndex;
  }
  StorageLogCombined: string = "";

  async WriteLogToStorage(logMessage: any): Promise<void> {
    return new Promise(async (resolve) => {
      this.StorageLogCombined += "|||" + JSON.stringify(logMessage);

      if (this.CurrentStorageLogKey) {
        //if it doesn't exist yet, it will hopefully catch up once it does
        window.localStorage.setItem(this.CurrentStorageLogKey, this.StorageLogCombined);
      }
    });
  }
}