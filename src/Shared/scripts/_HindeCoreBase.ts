import { IHindeCore } from './Interfaces/Agents/IHindeCore';
import { _CommonBase } from './_CommonCoreBase';

export abstract class _FrontBase extends _CommonBase {
  protected HindeCore: IHindeCore;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore)
    //hindeCore.ErrorHand.ThrowIfNullOrUndefinedStatic(_CommonBase.name, [hindeCore]);
    //hindeCore.ErrorHand.ThrowIfNullOrUndefinedStatic(_CommonBase.name, [  hindeCore.Logger, hindeCore.TaskMonitor]);

        this.Logger = hindeCore.Logger;
        this.HindeCore = hindeCore;
        this.ErrorHand = hindeCore.ErrorHand;
        this.TaskMonitor = hindeCore.TaskMonitor;
    }
}
