import { IHindeCore, ILoggerAgent, IErrorHandlerAgent } from './Interfaces/Agents/ILoggerAgent';

export abstract class _HindeCoreBase {
  protected Logger: ILoggerAgent;
  protected HindeCore: IHindeCore;
  protected ErrorHand: IErrorHandlerAgent;

  constructor(hindeCore: IHindeCore) {
    this.Logger = hindeCore.Logger;
    this.HindeCore = hindeCore;
    this.ErrorHand = hindeCore.ErrorHand;
  }
}