import { LoggableBase } from '../../Shared/scripts/LoggableBase';
import { ILoggerAgent } from '../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IFactoryApi } from "../../Shared/scripts/Interfaces/Agents/IFactoryApi";
import { IHindSiteApi } from "../../Shared/scripts/Interfaces/Agents/IHindSiteApi.1";
import { Factory } from './Concretions/Factory';
import { IContentBrowserProxy } from '../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy';

export class ApiEntry extends LoggableBase implements IHindSiteApi {
  readonly Factory: IFactoryApi;
 private ContentBrowserProxy: IContentBrowserProxy;

  constructor(logger: ILoggerAgent, contentBrowserProxy: IContentBrowserProxy) {
    super(logger);

    this.ContentBrowserProxy = contentBrowserProxy;
    this.Factory = new Factory(this.Logger, this.ContentBrowserProxy);
  }
}