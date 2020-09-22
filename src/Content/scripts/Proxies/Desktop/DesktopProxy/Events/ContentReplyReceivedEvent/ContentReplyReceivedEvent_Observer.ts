import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { HindSiteEvent_Observer } from "../_HindSiteEvent/HindSiteEvent_Observer";
import { HindsiteEventHandler_Type } from "../_HindSiteEvent/HindsiteEventHandler_Type";
import { IHindSiteEvent_Observer } from "../_HindSiteEvent/IHindSiteEvent_Observer";
import { IDataContentReplyReceivedEvent_Payload } from "./IDataContentReplyReceivedEvent_Payload";
import { UiModulesManager } from "../../../../../../../PopUpUi/scripts/Managers/UiManager/UiModulesManager";

export class ContentReplyReceivedEvent_Observer extends HindSiteEvent_Observer<IDataContentReplyReceivedEvent_Payload> implements IHindSiteEvent_Observer<IDataContentReplyReceivedEvent_Payload> {
  private OwnerUiManager: UiModulesManager;

  constructor(logger: ILoggerAgent, ownerUiManager: UiModulesManager) {
    super(logger, ContentReplyReceivedEvent_Observer.name);
    this.OwnerUiManager = ownerUiManager;
  }

  UpdateAsync(payload: IDataContentReplyReceivedEvent_Payload): void {
    this.OwnerUiManager.OnContentReplyReceivedEventCallBack(payload);
  }
}