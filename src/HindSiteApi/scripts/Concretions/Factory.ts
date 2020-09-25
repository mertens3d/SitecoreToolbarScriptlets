import { IApiFactory } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame";
import { LoggableBase } from "../../../Shared/scripts/LoggableBase";
import { IDesktopProxy } from "../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy";
import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { DesktopProxy } from "../Proxies/DesktopProxy/DesktopProxy";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IContentBrowserProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";

export class Factory extends LoggableBase implements IApiFactory{
 private ContentBrowserProxy: IContentBrowserProxy;

  constructor(logger: ILoggerAgent, contentBrowserProxy: IContentBrowserProxy) {
    super(logger)
    this.ContentBrowserProxy = contentBrowserProxy;
  }

  NewDesktopProxy(associatedDoc: IDataOneDoc): IDesktopProxy {
    return new DesktopProxy(this.Logger, associatedDoc, this.ContentBrowserProxy);
  }
}