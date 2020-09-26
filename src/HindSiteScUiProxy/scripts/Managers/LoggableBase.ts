import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';

export abstract class LoggableBase {
  protected Logger: ILoggerAgent;

  constructor(logger: ILoggerAgent) {
    this.Logger = logger;
  }
}