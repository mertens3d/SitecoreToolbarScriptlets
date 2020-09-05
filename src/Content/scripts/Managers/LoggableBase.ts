import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerBase';

export class LoggableBase {
  protected Logger: ILoggerAgent;

  constructor(logger: ILoggerAgent) {
    this.Logger = logger;
  }
}