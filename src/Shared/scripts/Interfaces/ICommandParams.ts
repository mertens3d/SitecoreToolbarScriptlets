import { GuidData } from "../Helpers/GuidData";
import { ApiCommandPayload } from "../Classes/CommandHandlerDataForContent/CommandHandlerDataForContent";

export interface ICommandParams {
  NewNickname: string;
  TargetSnapShotId: GuidData;
  ApiPayload: ApiCommandPayload
}