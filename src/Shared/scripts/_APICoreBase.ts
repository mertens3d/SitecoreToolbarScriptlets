import { ErrorHandlerAgent } from './Agents/Agents/LoggerAgent/ErrorHandlerAgent';
import { IAPICore } from './Interfaces/Agents/IAPICore';
import { _CommonBase } from './_CommonCoreBase';

export abstract class _APICoreBase  extends _CommonBase{
  protected ApiCore: IAPICore;
    RunTimeOptions: import("C:/projects/SitecoreToolbarScriptlets/src/Shared/scripts/Interfaces/Agents/IContentApi/IContentApi").IHindSiteScUiAPIRunTimeOptions;

  constructor(apiCore: IAPICore)
  {
    super(apiCore);
    ErrorHandlerAgent.ThrowIfNullOrUndefinedStatic(_CommonBase.name, [apiCore]);
    ErrorHandlerAgent.ThrowIfNullOrUndefinedStatic(_CommonBase.name, [apiCore.ErrorHand, apiCore.Logger, apiCore.TaskMonitor]);

    this.Logger = apiCore.Logger;
    this.ApiCore = apiCore;
    this.ErrorHand = apiCore.ErrorHand;
    this.TaskMonitor = apiCore.TaskMonitor;
    this.RunTimeOptions = apiCore.RunTimeOptions;
  }
}