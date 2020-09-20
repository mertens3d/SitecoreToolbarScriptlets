import { ScWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ICommandHandlerDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForPopUp";
import { BrowserTabAgent } from "../Managers/BrowserTabAgent";

export class HandlersInternal {
  private TabMan: BrowserTabAgent;
  private Logger: ILoggerAgent;

  constructor(logger: ILoggerAgent, tabMan: BrowserTabAgent) {
    this.Logger = logger;
    this.TabMan = tabMan;
  }

  __cleardebugTextWithConfirm(evt: any) {
    this.Logger.HandlerClearDebugText(this.Logger, true);
  }

  GenericSettingChanged() {
  }

  CloseWindow(evt: any) {
    window.close();
  }

  async GoCeInternal(evt: any) {
    this.TabMan.ChangeLocationSwitchBoard(ScWindowType.ContentEditor);
    //this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqOpenCE, this.PopHub));
  }

  GoDesktopInternal(evt: any) {
    this.TabMan.ChangeLocationSwitchBoard(ScWindowType.Desktop);
    //this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqGoDesktop, this.PopHub))
  }

  async SetScModeInternal(data: ICommandHandlerDataForPopUp): Promise<void> {
    try {
      // this needs to get moved to being handled in the content commands

      //  if (data.Command.EventData.ParameterData && data.Command.EventData.ParameterData.length > 0) {
      //    let newMode: scMode = data.Command.EventData.ParameterData[0];

      //    await this.TabMan.SetScMode(newMode)
      //  } else {
      //    throw ('SetScModeInternal no parameters')
      //  }
    } catch (err) {
      throw (err);
    }
  }
}