import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { HindsiteEventHandler_Type, HindSiteEvent_Observer } from "../_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../_HindSiteEvent/IHindSiteEvent_Observer";
import { IDataContentReplyReceivedEvent_Payload } from "./IDataContentReplyReceivedEvent_Payload";
import { UiManager } from "../../../../../../../PopUp/scripts/Managers/UiManager/UiManager";

export class ContentReplyReceivedEvent_Observer extends HindSiteEvent_Observer<IDataContentReplyReceivedEvent_Payload> implements IHindSiteEvent_Observer<IDataContentReplyReceivedEvent_Payload> {
  private OwnerUiManager: UiManager;

  constructor(logger: ILoggerAgent, ownerUiManager: UiManager) {
    super(logger, ContentReplyReceivedEvent_Observer.name);
    this.OwnerUiManager = ownerUiManager;
  }

  UpdateAsync(payload: IDataContentReplyReceivedEvent_Payload): void {
    this.OwnerUiManager.OnContentReplyReceivedEventCallBack(payload);
  }
}