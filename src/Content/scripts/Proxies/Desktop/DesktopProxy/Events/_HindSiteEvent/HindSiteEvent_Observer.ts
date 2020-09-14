import { LoggableBase } from "../../../../../Managers/LoggableBase";
import { IHindSiteEvent_Observer } from "./IHindSiteEvent_Observer";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";

export class HindSiteEvent_Observer<T> extends LoggableBase implements IHindSiteEvent_Observer<T> {
  readonly Friendly: string;
  UpdateAsync(payload: T): void {
  }
  constructor(logger: ILoggerAgent, friendly: string) {
    super(logger);
    this.Friendly = friendly;
  }
}