import { UiManager } from "../../../../../../../PopUp/scripts/Managers/UiManager/UiManager";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataContentReplyReceivedEvent_Payload } from "./IDataContentReplyReceivedEvent_Payload";
import { HindSiteEvent_Observer } from "../_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../_HindSiteEvent/IHindSiteEvent_Observer";

export class ContentReplyReceivedEvent_Observer extends HindSiteEvent_Observer<IDataContentReplyReceivedEvent_Payload> implements IHindSiteEvent_Observer<IDataContentReplyReceivedEvent_Payload> {
  private OwnerUiManager: UiManager;

  constructor(logger: ILoggerAgent, owner: UiManager) {
    super(logger, ContentReplyReceivedEvent_Observer.name);
    this.OwnerUiManager = owner;
  }

  UpdateAsync(payload: IDataContentReplyReceivedEvent_Payload): void {
    this.OwnerUiManager.ContentReplyReceivedEventCallBack(payload.StateOfSitecoreWindow, payload.StateOfStorageSnapShots);
  }
}