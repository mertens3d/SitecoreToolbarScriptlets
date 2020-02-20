import { LoggerBase } from "../../../Shared/scripts/Classes/LoggerBase";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
export class LoggerPopUp extends LoggerBase {
  DebugIDataBrowserTab(browserWindow: IDataBrowserTab) {
    if (this.IsNotNullOrUndefinedBool('IDataBrowserWindow', browserWindow)) {
      this.LogVal('WindowType', scWindowType[browserWindow.UrlParts.ScWindowType]);
      //this.DebugIDataOneDoc(browserWindow.DataDocSelf);
      //this.DebugWindow(browserWindow.Window);
    }
  }
}
