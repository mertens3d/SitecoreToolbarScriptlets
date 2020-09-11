import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { ILoggerAgent } from "../Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../Interfaces/Agents/ISettingsAgent";
import { IDataOneDoc } from "../Interfaces/Data/IDataOneDoc";
import { IFactoryHelper } from "../Interfaces/IFactoryHelper";
import { Guid } from "./Guid";
import { FrameProxy } from "../Interfaces/Data/Proxies/FrameProxy";

export class FactoryHelper extends LoggableBase implements IFactoryHelper {
  SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent) {
    super(logger);
    this.SettingsAgent = settingsAgent;
  }


  DataOneContentDocFactoryFromIframe(dataOneIframe: FrameProxy): IDataOneDoc {
    var toReturn: IDataOneDoc = null;

    if (dataOneIframe) {
      toReturn =
      {
        ContentDoc: dataOneIframe.IframeElem.contentDocument,
        DocId: Guid.NewRandomGuid(),
        Nickname: dataOneIframe.Nickname + ' - content doc'
      }
    } else {
      this.Logger.ErrorAndThrow(this.DataOneContentDocFactoryFromIframe.name, 'no iframe provided');
    }
    return toReturn;
  }

  async DataOneIframeFactory(iframeElem: HTMLIFrameElement, nickname: string): Promise<FrameProxy> {
    this.Logger.FuncStart(this.DataOneIframeFactory.name);
    var toReturn: FrameProxy = null;

    if (iframeElem && nickname) {
      var toReturn: FrameProxy = new FrameProxy(this.Logger, iframeElem, nickname, this.SettingsAgent);
      await toReturn.WaitForReady();
    } else {
      this.Logger.ErrorAndThrow(this.DataOneIframeFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', iframeElem);
      this.Logger.LogAsJsonPretty('nickname', nickname);
    }

    this.Logger.FuncEnd(this.DataOneIframeFactory.name);
    return toReturn;
  }
}