import { ErrorHandlerAgent } from './Agents/ErrorHandler/ErrorHandlerAgent';
import { IHindeCore } from './Interfaces/Agents/IHindeCore';
import { _CommonBase } from './_CommonCoreBase';

export abstract class _FrontBase extends _CommonBase {
  protected HindeCore: IHindeCore;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore)
        ErrorHandlerAgent.ThrowIfNullOrUndefinedStatic(_CommonBase.name, [hindeCore]);
        ErrorHandlerAgent.ThrowIfNullOrUndefinedStatic(_CommonBase.name, [ hindeCore.ErrorHand, hindeCore.Logger, hindeCore.TaskMonitor]);

        this.Logger = hindeCore.Logger;
        this.HindeCore = hindeCore;
        this.ErrorHand = hindeCore.ErrorHand;
        this.TaskMonitor = hindeCore.TaskMonitor;
    }
}
