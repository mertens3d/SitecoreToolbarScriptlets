import { ICommandData } from "../../ICommandParams";

export interface ISnapShotsAgent {

    SetNickName(commandData: ICommandData): Promise<void>;
}
