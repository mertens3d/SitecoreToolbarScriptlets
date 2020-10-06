import { GuidData } from "../Helpers/GuidData";
import { ApiCommandPayload } from "../Classes/CommandHandlerDataForContent/ApiCommandPayload";

export interface ICommandParams {
  NewNickname: string;
  TargetSnapShotId: GuidData;
  ApiPayload: ApiCommandPayload
}