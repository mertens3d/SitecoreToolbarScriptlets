import { UiManager } from "../../../../../PopUp/scripts/Managers/UiManager/UiManager";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataContentReplyPayload } from "../../../../../Shared/scripts/Interfaces/Data/IContentState";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { IGeneric_Observer } from "./Events/GenericEvent/IGeneric_Observer";

export class CommandCompleted_Observer extends LoggableBase implements IGeneric_Observer<IDataContentReplyPayload> {
  private Owner: UiManager;

  constructor(logger: ILoggerAgent, owner: UiManager) {
    super(logger);
    this.Owner = owner;
  }

  Update(payload: IDataContentReplyPayload) {
    this.Owner.CallBackCommandComplete(payload.StateOfSitecoreWindow);
  }
}