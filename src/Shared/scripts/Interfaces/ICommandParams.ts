import { CommandTypeFlag } from "../Enums/CommandType";
import { InternalCommandFlag } from "../Enums/InternalCommand";
import { GuidData } from "../Helpers/GuidData";
import { IToApiCallPayload } from "./IApiCallPayload";

export interface ICommandData {
  CommandType: CommandTypeFlag;
  ToAPIPayload: IToApiCallPayload,
  NewNickname: string;
  TargetSnapShotId: GuidData;
  InternalCommandFlag: InternalCommandFlag;
}