import { ILoggerAgentBase } from "./ILoggerBase";
import { IDataBrowserTab } from "../IDataBrowserWindow";
export interface ILoggerPopUpAgent extends ILoggerAgentBase {
  DebugIDataBrowserTab(tabData: IDataBrowserTab);

}
