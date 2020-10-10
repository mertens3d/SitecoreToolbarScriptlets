import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { CommandType } from "../../../Shared/scripts/Enums/CommandType";

export class CommandToExecuteData extends _FrontBase {
    commandToExecute: Function;
    CommandType: CommandType;
}
