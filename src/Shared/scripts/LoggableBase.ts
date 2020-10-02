import { IHindeCore, ILoggerAgent } from './Interfaces/Agents/ILoggerAgent';

export abstract class _HindeCoreBase {
  protected Logger: ILoggerAgent;
  protected HindeCore: IHindeCore;

  constructor(hindeCore: IHindeCore) {
    this.Logger = hindeCore.Logger;
    this.HindeCore = hindeCore;
  }
}