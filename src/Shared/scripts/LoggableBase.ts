import { ILoggerAgent } from './Interfaces/Agents/ILoggerAgent';

export abstract class LoggableBase {
  protected Logger: ILoggerAgent;

  constructor(logger: ILoggerAgent) {
    this.Logger = logger;
  }
}