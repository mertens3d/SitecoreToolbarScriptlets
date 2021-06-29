import { IControllerMessageReceivedEvent_Payload } from "../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IMessageContentToController_Payload } from "../Events/ContentReplyReceivedEvent/IMessageContentToController_Payload";
import { _CommonBase } from "../_CommonCoreBase";
import { DefaultControllerMessageReceivedEvent_Payload } from "./Defaults/DefaultControllerMessageReceivedEvent_Payload";
import { SnapShotValidatorB } from "./SnapShotValidatorB";

export class SnapShotValidator extends _CommonBase {
  TranslateAndValidatePayload(messageContentToController_Payload: IMessageContentToController_Payload): IControllerMessageReceivedEvent_Payload {
    this.Logger.FuncStart(this.TranslateAndValidatePayload.name);

    this.ErrorHand.ThrowIfNullOrUndefined(this.TranslateAndValidatePayload.name, [messageContentToController_Payload]);

    var controllerMessageReceivedEvent_Payload: IControllerMessageReceivedEvent_Payload = new DefaultControllerMessageReceivedEvent_Payload();

    let validatorB: SnapShotValidatorB = new SnapShotValidatorB(this.CommonCore);

    controllerMessageReceivedEvent_Payload.StateOfScUiProxy_Live = validatorB.ValidateStateOfScUiProxy(messageContentToController_Payload.StateOfScUiProxy_Live);

    controllerMessageReceivedEvent_Payload.StateOfStorageSnapShots = validatorB.ValidateStateOfStorageSnapShots(messageContentToController_Payload.StateOfStorageSnapShots);

    if (!messageContentToController_Payload.ErrorStack) {
      controllerMessageReceivedEvent_Payload.ErrorStack = controllerMessageReceivedEvent_Payload.ErrorStack;
    }

    this.Logger.FuncEnd(this.TranslateAndValidatePayload.name);
    return controllerMessageReceivedEvent_Payload;
  }
}