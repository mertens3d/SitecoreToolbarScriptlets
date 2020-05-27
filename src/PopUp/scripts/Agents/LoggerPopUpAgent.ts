import { LoggerAgentBase } from "../../../Shared/scripts/Agents/LoggerAgentBase";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { ILoggerPopUpAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerPopupAgent";
export class LoggerPopUpAgent extends LoggerAgentBase implements ILoggerPopUpAgent {

    DebugIDataBrowserTab(browserWindow: IDataBrowserTab) {
        if (this.IsNotNullOrUndefinedBool('IDataBrowserWindow', browserWindow)) {
            this.LogVal('WindowType', scWindowType[browserWindow.UrlParts.ScWindowType]);
            //this.DebugIDataOneDoc(browserWindow.DataDocSelf);
            //this.DebugWindow(browserWindow.Window);
        }
    }
}
