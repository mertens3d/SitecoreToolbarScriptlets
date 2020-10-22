import { GuidData } from "../Helpers/GuidData";
import { IApiCallPayload } from "./IApiCallPayload";

export interface ICommandParams {
  ApiPayload: IApiCallPayload,
  NewNickname: string;
  TargetSnapShotId: GuidData;
  
}