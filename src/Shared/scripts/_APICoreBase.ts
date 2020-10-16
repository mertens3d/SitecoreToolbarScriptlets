import { ErrorHandlerAgent } from './Agents/ErrorHandler/ErrorHandlerAgent';
import { IAPICore } from './Interfaces/Agents/IAPICore';
import { _CommonBase } from './_CommonCoreBase';
import { IHindSiteScUiAPIRunTimeOptions } from './Interfaces/Agents/IContentApi/IHindSiteScUiAPIRunTimeOptions';
import { DocumentJacket } from '../../DOMJacket/Document/DocumentJacket';

export abstract class _APICoreBase extends _CommonBase {
  protected ApiCore: IAPICore;
  RunTimeOptions: IHindSiteScUiAPIRunTimeOptions;

  constructor(apiCore: IAPICore) {
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