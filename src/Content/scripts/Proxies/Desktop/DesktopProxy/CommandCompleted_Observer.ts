import { UiManager } from "../../../../../PopUp/scripts/Managers/UiManager/UiManager";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataContentReplyReceivedEvent_Payload } from "../../../../../Shared/scripts/Interfaces/Events/IDataContentReplyReceivedEvent_Payload";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { IGeneric_Observer } from "./Events/GenericEvent/IGeneric_Observer";

export class ContentReplyReceivedEvent_Observer extends LoggableBase implements IGeneric_Observer<IDataContentReplyReceivedEvent_Payload> {
  private OwnerUiManager: UiManager;
  Friendly: string;

  constructor(logger: ILoggerAgent, owner: UiManager) {
    super(logger);
    this.Friendly = ContentReplyReceivedEvent_Observer.name;
    this.OwnerUiManager = owner;
  }

  Update(payload: IDataContentReplyReceivedEvent_Payload) {
    this.OwnerUiManager.ContentReplyReceivedEventCallBack(payload.StateOfSitecoreWindow, payload.StateOfStorageSnapShots);
  }
}