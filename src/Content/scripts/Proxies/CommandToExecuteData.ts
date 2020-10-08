import { _HindeCoreBase } from "../../../Shared/scripts/_HindeCoreBase";
import { CommandType } from "../../../Shared/scripts/Enums/CommandType";

export class CommandToExecuteData extends _HindeCoreBase {
    commandToExecute: Function;
    CommandType: CommandType;
}
