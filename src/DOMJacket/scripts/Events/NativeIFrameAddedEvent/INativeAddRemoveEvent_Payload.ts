import { GenericElemJacket } from "../../Elements/GenericElemJacket";

export interface INativeAddRemoveEvent_Payload {
  RemovedIFrameId: string;
  AddedElementJacket: GenericElemJacket;
  OnBehalfOfFriendly: string;
}