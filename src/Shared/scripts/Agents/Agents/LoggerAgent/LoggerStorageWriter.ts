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

        //let storageObj: browser.storage.StorageObject = {
        //  [this.RollingLogId.CurrentStorageLogKey]: this.StorageLogCombined
        //}
      }

      //browser.storage.local.set(storageObj);

      //try writing to a tab
      //chrome.tabs.create({ url: 'javascript:document.write("<h1>Hello, World!</h1>")' });

      //console.log('this.LogTabId: ' + this.LogTabId);
      //if (this.LogTabId > 0) {
      //  console.log('Executing script on log tab')
      //  browser.tabs.executeScript(this.LogTabId, { code: 'document.write("<h5>Log Message</h5>")' })
      //    .catch((err) => console.log(err));

      //  browser.tabs.executeScript(this.LogTabId, { code: 'console.log("<h5>Log Message</h5>")' })
      //    .catch((err) => console.log(err));
      //  //browser.tabs.sendMessage( this.LogTabId,  url: 'javascript:document.write("<h1>' + logMessage + '</h1>")' });
      //}
    });
  }
}