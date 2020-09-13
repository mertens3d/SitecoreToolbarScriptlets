import { UiManager } from "../../../../../PopUp/scripts/Managers/UiManager/UiManager";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataContentReplyReceivedEvent_Payload } from "../../../../../Shared/scripts/Interfaces/Events/IDataContentReplyReceivedEvent_Payload";
import { GenericEvent_Observer } from "./Events/GenericEvent/GenericEvent_Subject";
import { IGeneric_Observer } from "./Events/GenericEvent/IGeneric_Observer";

export class ContentReplyReceivedEvent_Observer extends GenericEvent_Observer<IDataContentReplyReceivedEvent_Payload> implements IGeneric_Observer<IDataContentReplyReceivedEvent_Payload> {
  private OwnerUiManager: UiManager;

  constructor(logger: ILoggerAgent, owner: UiManager) {
    super(logger);
    this.Friendly = ContentReplyReceivedEvent_Observer.name;
    this.OwnerUiManager = owner;
  }

  UpdateAsync(payload: IDataContentReplyReceivedEvent_Payload):void {
    this.OwnerUiManager.ContentReplyReceivedEventCallBack(payload.StateOfSitecoreWindow, payload.StateOfStorageSnapShots);
  }
}