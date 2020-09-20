import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { IEventHandlerData } from "../../../../Shared/scripts/Interfaces/IEventHandlerData";

export interface ISingleClickEvent_Payload {

 HandlerData: IEventHandlerData
}


export interface ISelectSnapUiMutationEvent_Payload {

  SelectSnapshotId: GuidData

}
