import { ICommandParams } from "../../ICommandParams";

export interface ISnapShotsAgent {

    SetNickName(commandData: ICommandParams): Promise<void>;
}
